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
        <div
          v-if="dataSend.pengambilanData !== null"
          class="form form-group col-4"
        >
          <label for="formAkses" class="top">Pengambilan Data</label>
          <select
            class="form-control bottom custom-select"
            id="formAkses"
            v-model="dataSend.kelengkapan"
          >
            <option
              :value="data.id"
              v-for="data in dataKelengkapan"
              :key="data.id"
              >{{ data.id }} - {{ data.description }}</option
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
      <chart-laporan-kelengkapan
        v-if="dataChart !== null"
        :bulan="bulanChart"
        :data="dataChart"
        ref="chart"
      ></chart-laporan-kelengkapan>
      <div class="row" id="printableArea">
        <div class="col" v-if="printed" v-show="printed">
          <h3>Laporan Hasil Rekapitulasi Perbandingan {{ dataPDF.text }}</h3>
          <p>
            Persentase kelengkapan berkas dari {{ dataPDF.tglawal }} sampai
            dengan {{ dataPDF.tglakhir }}, digambarkan pada tabel berikut:
          </p>
          <table class="table table-sm table-striped">
            <thead>
              <tr>
                <th>Bulan</th>
                <th>Persentase Dokter</th>
                <th>Persentase Perawat</th>
                <th>Jumlah RM Dokter</th>
                <th>Jumlah RM Perawat</th>
                <th>Jumlah Data</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bulan, index) in dataPDF.bulan" :key="index">
                <td>{{ bulan }}</td>
                <td v-for="indexs in 5" :key="indexs">
                  {{ dataPDF.datatabel[index][indexs - 1]
                  }}<span v-if="indexs <= 2">%</span>
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
import ChartLaporanKelengkapan from "../../components/Siska/Laporan Kelengkapan/ChartLaporanKelengkapan";
import moment from "moment";
// import store from "../../store";

function initialDataSend() {
  return {
    tglawal: "",
    tglakhir: "",
    kelengkapan: null
  };
}

export default {
  components: {
    "chart-laporan-kelengkapan": ChartLaporanKelengkapan
    // Form
  },
  data: function() {
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
      dataKelengkapan: [
        {
          id: 1,
          description: "Lengkap"
        },
        {
          id: 2,
          description: "Tidak Lengkap"
        }
      ],
      persentase: 0,
      pdf64: "",
      title: "",
      dataz: null,
      dataChart: null,
      bulanChart: null,
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
      //
      // this.getDataTenagaMedis();
    },
    getData() {
      const params = {
        tglawal: this.dataSend.tglawal,
        tglakhir: this.dataSend.tglakhir,
        kelengkapan: this.dataSend.kelengkapan,
        page: 1,
        find: "",
        length: 10000,
        column: "id",
        dir: "ASC"
      };
      Api.laporan
        .laporan(params)
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
          this.dataPDF = res.data.data;
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

<style lang="scss" scoped>
@media print {
  @page {
    size: landscape;
  }
}
</style>
