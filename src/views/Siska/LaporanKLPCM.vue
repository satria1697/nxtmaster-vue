<template>
  <div class="detail">
    <div class="container">
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
      <!-- <div class="row">
        <h1 class="display-4">
          Persentase Pengisian Berkas = {{ persentase }}%
        </h1>
      </div> -->
      <div class="row">
        <div class="col">
          <button
            class="btn btn-default"
            v-on:click="getData()"
            v-if="dataSend.terhadap !== null"
          >
            <i class="fas fa-eye"></i> Preview
          </button>
        </div>
      </div>
      <!--      <div class="row">-->
      <!--        <div class="col">-->
      <!--          {{ dataz }}-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="row">
        <pdf-viewer
          class="col"
          v-if="pdf64"
          :src="pdf64"
          :title="title"
        ></pdf-viewer>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../../api";
// import Form from "../../components/Siska/Status/FormStatus";
import edit from "../../components/Table/ActionEdit";
import actiondelete from "../../components/Table/ActionDelete";
import PdfViewer from "../../components/PdfViewer.vue";
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
    PdfViewer
    // Form
  },
  data() {
    let self = this;
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
          handler: self.changeModal,
          component: edit,
          width: 5
        },
        {
          label: "Delete",
          name: "Delete",
          oderable: false,
          event: "click",
          handler: self.deleteData,
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
      dataz: null
    };
  },
  created() {
    let self = this;
    self.init();
    self.setTglawal();
  },
  methods: {
    init() {
      let self = this;
      self.getDataTenagaMedis();
    },
    getData() {
      let self = this;
      const params = {
        tglawal: self.dataSend.tglawal,
        tglakhir: self.dataSend.tglakhir,
        pengambilanData: self.dataSend.pengambilanData,
        dokter_id: self.dataSend.dokter_id,
        perawat_id: self.dataSend.perawat_id,
        namadokter: self.dataDokter[self.dataSend.dokter_id],
        namaperawat: self.dataPerawat[self.dataSend.perawat_id],
        terhadap: self.dataSend.terhadap,
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
          self.dataz = res.data;
          self.pdf64 = res.data.data;
          self.title = res.data.filename;
          self.dataSend = initialDataSend();
        })
        .catch(err => {
          console.log(err);
        });
    },
    reloadTable(tableProps) {
      let self = this;
      self.getData(tableProps);
    },
    edit(data) {
      self.changeModal(data.id);
    },
    changeModal(id) {
      let self = this;
      if (self.isModal === false) {
        self.editId = id;
        self.isModal = true;
      } else {
        self.getData(self.filter);
        self.isModal = false;
      }
    },
    deleteData(id) {
      let self = this;
      Api.status
        .delete(id)
        .then(resp => {
          if (resp.status === 204) {
            self.getData(self.filter);
          }
        })
        .catch(() => {
          window.alert("Tidak dapat menghapus Data");
        });
    },
    addMonths() {
      let self = this;
      self.dataSend.tglakhir = moment(self.dataSend.tglawal).add(2, 'months').format("YYYY-MM");
    },
    setTglawal() {
      let self = this;
      self.dataSend.tglawal = moment().subtract(3, 'months').format("YYYY-MM");
      self.addMonths();
    },
    getDataTenagaMedis(params) {
      let self = this;
      Api.tenagamedis
        .filter(params)
        .then(res => {
          self.dataDokter = res.data.data.filter(function(data) {
            return data.jenis_id === 1;
          });
          self.dataPerawat = res.data.data.filter(function(data) {
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
