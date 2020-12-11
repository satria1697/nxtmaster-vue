<template>
  <div class="detail">
    <Form
      v-if="isModal"
      :editId="editId"
      title="Form Pengisian Analisis"
      @modal-closed="changeModal"
      :dataFormulir="dataFormulir"
      :dataDokter="dataDokter"
      :dataPerawat="dataPerawat"
      :dataRanap="dataRanap"
    ></Form>
    <form-formulir
      v-if="isFormulirModal"
      :dataFormulir="editFormulirId"
      :editId="editId"
      title="Form Formulir"
      @modal-closed="changeFormulirModal"
      :dataStatus="dataStatus"
    ></form-formulir>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="btn btn-default btn-md" v-on:click="getData(filter)">
            <i class="fas fa-sync"></i>
            Perbaharui Data
          </div>
          <div class="btn btn-default btn-md" v-on:click="changeModal(null)">
            <i class="fas fa-plus-circle"></i>
            Tambah
          </div>
        </div>
      </div>
    </div>
    <data-table
      :columns="columns"
      :data="dataAll"
      :classes="classes"
      @on-table-props-changed="reloadTable"
      class="outertable"
    >
    </data-table>
  </div>
</template>

<script>
import Api from "../../api";
import Form from "../../components/Siska/Analisisrawatinap/FormAnalisisrawatinap";
import FormFormulir from "../../components/Siska/Analisisrawatinap/FormFormulir";
import edit from "../../components/Table/ActionEdit";
import actiondelete from "../../components/Table/ActionDelete";
import actionbutton from "../../components/Table/ActionButton";
import EditColorSpan from "../../components/Table/EditColorSpan";
// import store from "../../store";

export default {
  components: {
    Form,
    FormFormulir
  },
  data() {
    let self = this;
    return {
      dataAll: {},
      filter: {
        page: null,
        find: "",
        length: null,
        Column: "",
        dir: ""
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
          label: "Nomer Rekam Medis",
          name: "ranap.norm",
          orderable: true
        },
        {
          label: "Tanggal Keluar",
          name: "tglinput",
          orderable: true
        },
        {
          label: "Jatuh Tempo",
          name: "jatuhtempo",
          orderable: true
        },
        {
          label: "Tanggal Lengkap",
          name: "tgllengkap",
          orderable: true
        },
        {
          label: "Status",
          name: "statuskelengkapan.description",
          component: EditColorSpan,
          orderable: true
        },
        {
          label: "Checklist",
          name: "Pilih",
          orderable: false,
          event: "click",
          handler: self.changeFormulirModal,
          component: actionbutton,
          width: 3
        },
        {
          label: " ",
          name: "Edit",
          orderable: false,
          event: "click",
          handler: self.changeModal,
          component: edit,
          width: 3
        },
        {
          label: " ",
          name: "Delete",
          oderable: false,
          event: "click",
          handler: self.deleteData,
          component: actiondelete,
          width: 3
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
      dataFormulir: [],
      dataDokter: [],
      dataPerawat: [],
      dataStatus: [],
      dataRanap: [],
      isFormulirModal: false,
      editFormulirId: null
    };
  },
  mounted() {
    let self = this;
    self.isLoading = true;
    self.init();
    self.isLoading = false;
  },
  methods: {
    init() {
      let self = this;
      const params = {
        page: 1,
        find: "",
        length: 10,
        column: "id",
        dir: "ASC"
      };
      self.getData(params);
      self.getDataFormulir();
      self.getDataTenagaMedis();
      self.getDataStatus();
      self.getDataRanap();
    },
    getData(params) {
      let self = this;
      self.isLoading = true;
      self.filter.page = params.page;
      self.filter.find = params.find;
      self.filter.length = params.length;
      self.filter.column = params.column;
      self.filter.dir = params.dir;
      Api.analisisrawatinap
        .filter(params)
        .then(res => {
          self.dataAll = res.data;
          self.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          self.isLoading = false;
        });
    },
    getDataFormulir(params) {
      let self = this;
      Api.formulir
        .filter(params)
        .then(resp => {
          self.dataFormulir = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // getDataDokter(params) {
    //   let self = this;
    //   Api.dokter
    //     .filter(params)
    //     .then(resp => {
    //       self.dataDokter = resp.data.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // getDataPerawat(params) {
    //   let self = this;
    //   Api.perawat
    //     .filter(params)
    //     .then(resp => {
    //       self.dataPerawat = resp.data.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
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
    },
    getDataStatus(params) {
      let self = this;
      Api.status
        .filter(params)
        .then(resp => {
          self.dataStatus = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataRanap(params) {
      let self = this;
      Api.rawatinap
        .filter(params)
        .then(resp => {
          self.dataRanap = resp.data.data;
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
        self.init();
        // self.getData(self.filter);
        self.isModal = false;
      }
    },
    deleteData(id) {
      let self = this;
      Api.analisisrawatinap
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
    changeFormulirModal(id) {
      let self = this;
      if (self.isFormulirModal === false) {
        self.editFormulirId = id;
        self.isFormulirModal = true;
      } else {
        // self.init();
        // self.getData(self.filter);
        self.isFormulirModal = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
