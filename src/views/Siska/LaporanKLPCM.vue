<template>
  <div class="detail">
    <div class="container-fluid">
      <div class="row">
        <div class="form form-group col-3">
          <label for="formtgll" class="top">Bulan Awal</label>
          <input
            type="month"
            id="formtgll"
            class="bottom form-control"
            v-model="dataSend.tglawal"
            v-on:change="addMonths()"
          />
        </div>
        <div class="form form-group col-3">
          <label for="formtgll" class="top">Bulan Akhir</label>
          <input
            type="month"
            id="formtgll"
            class="bottom form-control"
            v-model="dataSend.tglakhir"
          />
        </div>
      </div>
      <div class="row">
        <div class="form form-group col-4">
          <label for="formAkses" class="top">Filter Data</label>
          <select
            class="form-control bottom custom-select"
            id="formAkses"
            v-model="dataSend.pengambilanData"
          >
            <option
              :value="data.id"
              v-for="data in pengambilanData"
              :key="data.id"
              >{{ data.id }} - {{ data.description }}</option
            >
          </select>
        </div>
        <div
          v-if="dataSend.pengambilanData !== null"
          class="form form-group col-4"
        >
          <label for="formAkses" class="top">Terhadap</label>
          <select
            class="form-control bottom custom-select"
            id="formAkses"
            v-model="dataSend.terhadap"
          >
            <option :value="data.id" v-for="data in terhadapData" :key="data.id"
              >{{ data.id }} - {{ data.description }}</option
            >
          </select>
        </div>
        <div
          v-if="dataSend.pengambilanData === 3 && dataSend.terhadap !== null"
          class="form form-group col-4"
        >
          <label for="formAkses" class="top">Nama Dokter</label>
          <select
            class="form-control bottom custom-select"
            id="formAkses"
            v-model="dataSend.dokter_id"
          >
            <option :value="data.id" v-for="data in dataDokter" :key="data.id"
              >{{ data.id }} - {{ data.nama }}</option
            >
          </select>
        </div>
        <div
          v-if="dataSend.pengambilanData === 4 && dataSend.terhadap !== null"
          class="form form-group col-4"
        >
          <label for="formnamaperawat" class="top">Nama Perawat</label>
          <select
            class="form-control bottom custom-select"
            id="formnamaperawat"
            v-model="dataSend.perawat_id"
          >
            <option :value="data.id" v-for="data in dataPerawat" :key="data.id"
              >{{ data.id }} - {{ data.nama }}</option
            >
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <button class="btn btn-default" v-on:click="getData()">
            <i class="fas fa-eye"></i> Preview
          </button>
        </div>
        <div class="col-2 offset-8">
          <button
            class="btn btn-default right"
            v-on:click="printPDF('printableArea')"
            v-if="dataChart !== null"
          >
            <i class="fas fa-file-pdf"></i> Print / Save As PDF
          </button>
        </div>
      </div>
      <chart-laporan-klpcm
        v-if="dataChart !== null"
        :bulan="bulanChart"
        :data="dataChart"
        :whodata="whodata"
        ref="chart"
      ></chart-laporan-klpcm>
      <div class="row" id="printableArea">
        <div class="col" v-if="printed" v-show="printed">
          <h3>
            Laporan Hasil Rekapitulasi Perbandingan {{ dataPDF.who }} terhadap
            {{ dataPDF.terhadap }}
          </h3>
          <p>
            Persentase kelengkapan berkas dari {{ dataPDF.tglawal }} sampai
            dengan {{ dataPDF.tglakhir }}, digambarkan pada tabel berikut:
          </p>
          <table class="table table-sm table-striped">
            <thead>
              <tr>
                <th rowspan="2" style="vertical-align: middle">
                  {{ dataPDF.who }}
                </th>
                <th colspan="3" style="text-align: center">Bulan</th>
              </tr>
              <tr>
                <th v-for="(bulan, index) in dataPDF.bulan" :key="index">
                  {{ bulan }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in dataPDF.whodata" :key="index">
                <td>{{ data.nama }}</td>
                <td v-for="indexs in dataPDF.bulan.length" :key="indexs">
                  {{ dataPDF.data[index - 1][indexs - 1] }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../../api";
// import Form from "../../components/Siska/Status/FormStatus";
import edit from "../../components/Table/ActionEdit";
import actiondelete from "../../components/Table/ActionDelete";
import ChartLaporanKLPCM from "../../components/Siska/LaporanKLPCM/ChartLaporanKLPCM";
// import store from "../../store";
import moment from "moment";

function initialDataSend() {
  return {
    tglawal: "",
    tglakhir: "",
    pengambilanData: null,
    dokter_id: null,
    // namadokter: "",
    perawat_id: null,
    // namaperawat: ""
    terhadap: null
  };
}

export default {
  components: {
    "chart-laporan-klpcm": ChartLaporanKLPCM
    // Form
  },
  data() {
    return {
      dataAll: {},
      filter: {
        page: null,
        find: "",
        length: null,
        orderColumn: "",
        orderBy: ""
      },
      isLoading: false,
      columns: [
        {
          label: "ID",
          name: "id",
          orderable: true,
          width: 5
        },
        {
          label: "Status",
          name: "description",
          orderable: true
        },
        {
          label: "Color",
          name: "warna",
          orderable: true
        },
        {
          label: "Nilai",
          name: "nilai",
          orderable: true
        },
        {
          label: "Edit",
          name: "Edit",
          orderable: false,
          event: "click",
          handler: this.changeModal,
          component: edit,
          width: 5
        },
        {
          label: "Delete",
          name: "Delete",
          oderable: false,
          event: "click",
          handler: this.deleteData,
          component: actiondelete,
          width: 5
        }
      ],
      classes: {
        table: {
          "table-sm": true
        },
        "t-head": {
          "span-theme": true
        }
      },
      isModal: false,
      editId: null,
      dataSend: initialDataSend(),
      pengambilanData: [
        {
          id: 0,
          description: "Semua Dokter"
        },
        {
          id: 1,
          description: "Semua perawat"
        },
        {
          id: 3,
          description: "Dokter"
        },
        {
          id: 4,
          description: "Perawat"
        }
      ],
      terhadapData: [
        {
          id: 1,
          description: "Seluruh Data Rawat Inap"
        },
        {
          id: 2,
          description: "dokter"
        },
        {
          id: 3,
          description: "perawat"
        }
      ],
      dataPerawat: [],
      dataDokter: [],
      persentase: 0,
      pdf64: "",
      title: "",
      dataz: null,
      dataChart: null,
      bulanChart: null,
      whodata: null,
      dataPDF: null,
      printed: false
    };
  },
  created() {
    this.init();
    this.setTglawal();
  },
  methods: {
    init() {
      this.getDataTenagaMedis();
    },
    getData() {
      const params = {
        tglawal: this.dataSend.tglawal,
        tglakhir: this.dataSend.tglakhir,
        pengambilanData: this.dataSend.pengambilanData,
        dokter_id: this.dataSend.dokter_id,
        perawat_id: this.dataSend.perawat_id,
        namadokter: this.dataDokter[this.dataSend.dokter_id],
        namaperawat: this.dataPerawat[this.dataSend.perawat_id],
        terhadap: this.dataSend.terhadap,
        page: 1,
        find: "",
        length: 10000,
        column: "id",
        dir: "ASC"
      };

      // console.log(Api.laporan.filter(params, "blob"));
      Api.laporan
        .filter(params)
        .then(res => {
          // this.dataChart = res.data.data.data;
          let arr = res.data.data.data;
          let m = arr.length;
          let n = arr[0].length;
          let f = [];
          let t = [];
          for (let j = 0; j < n; j++) {
            t = [];
            for (let i = 0; i < m; i++) {
              t.push(arr[i][j]);
            }
            f.push(t);
          }
          this.dataChart = f;
          this.bulanChart = res.data.data.bulan;
          this.whodata = res.data.data.whodata;
          this.dataPDF = res.data.data;
          console.log(this.dataPDF.data[1][0]);
          this.dataSend = initialDataSend();
        })
        .catch(err => {
          console.log(err);
        });
    },
    printPDF(whereprint) {
      this.printed = true;
      setTimeout(function() {
        //giving it 200 milliseconds time to load

        const prtHtml = document.getElementById(whereprint).innerHTML;
        let canvasEle = document.getElementById("bar-chart");

        let stylesHtml = "";
        for (const node of [
          ...document.querySelectorAll('link[rel="stylesheet"], style')
        ]) {
          stylesHtml += node.outerHTML;
        }

        // Open the print window
        const WinPrint = window.open(
          "",
          "",
          "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
        );

        WinPrint.document.write(`<!DOCTYPE html>
      <html>
        <head>
          ${stylesHtml}
        </head>
        <body>
          ${prtHtml}
          <br><img src=${canvasEle.toDataURL()}>
        </body>
      </html>`);

        setTimeout(function() {
          WinPrint.document.title = this.dataPDF.filename;
          WinPrint.document.close();
          WinPrint.focus();
          WinPrint.print();
          WinPrint.close();
        }, 100);
        this.printed = false;
      }, 100);
    },
    reloadTable(tableProps) {
      this.getData(tableProps);
    },
    edit(data) {
      this.changeModal(data.id);
    },
    changeModal(id) {
      if (this.isModal === false) {
        this.editId = id;
        this.isModal = true;
      } else {
        this.getData(this.filter);
        this.isModal = false;
      }
    },
    deleteData(id) {
      Api.status
        .delete(id)
        .then(resp => {
          if (resp.status === 204) {
            this.getData(this.filter);
          }
        })
        .catch(() => {
          window.alert("Tidak dapat menghapus Data");
        });
    },
    addMonths() {
      this.dataSend.tglakhir = moment(this.dataSend.tglawal)
        .add(2, "months")
        .format("YYYY-MM");
    },
    setTglawal() {
      this.dataSend.tglawal = moment()
        .subtract(3, "months")
        .format("YYYY-MM");
      this.addMonths();
    },
    getDataTenagaMedis(params) {
      Api.tenagamedis
        .filter(params)
        .then(res => {
          this.dataDokter = res.data.data.filter(function(data) {
            return data.jenis_id === 1;
          });
          this.dataPerawat = res.data.data.filter(function(data) {
            return data.jenis_id === 2;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
