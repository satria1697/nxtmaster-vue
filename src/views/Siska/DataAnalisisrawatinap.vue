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
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="btn btn-default btn-md" v-on:click="getData(filter)">
            <i class="fas fa-sync"></i>
            Perbaharui Data
          </div>
          <div class="btn btn-default btn-md" v-on:click="changeModal(null)">
            <i class="fas fa-plus-circle"></i>
            Tambah
          </div>
        </div>
        <div v-if="isLoading" class="offset-5 col-md-1">
          <div class="spinner-border"></div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <data-table
            :columns="columns"
            :data="dataAll"
            :classes="classes"
            @loading="isLoading = true"
            @finished-loading="isLoading = false"
            @on-table-props-changed="reloadTable"
          >
          </data-table>
        </div>
      </div>
    </div>
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
          handler: this.changeFormulirModal,
          component: actionbutton,
          width: 3
        },
        {
          label: " ",
          name: "Edit",
          orderable: false,
          event: "click",
          handler: this.changeModal,
          component: edit,
          width: 3
        },
        {
          label: " ",
          name: "Delete",
          oderable: false,
          event: "click",
          handler: this.deleteData,
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
    this.isLoading = true;
    this.init();
    this.isLoading = false;
  },
  methods: {
    init() {
      const params = {
        page: 1,
        find: "",
        length: 10,
        column: "id",
        dir: "ASC"
      };
      this.getData(params);
      this.getDataFormulir();
      this.getDataTenagaMedis();
      this.getDataStatus();
      this.getDataRanap();
    },
    getData(params) {
      this.isLoading = true;
      this.filter.page = params.page;
      this.filter.find = params.find;
      this.filter.length = params.length;
      this.filter.column = params.column;
      this.filter.dir = params.dir;
      Api.analisisrawatinap
        .filter(params)
        .then(res => {
          this.dataAll = res.data;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    getDataFormulir(params) {
      Api.formulir
        .filter(params)
        .then(resp => {
          this.dataFormulir = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // getDataDokter(params) {
    //
    //   Api.dokter
    //     .filter(params)
    //     .then(resp => {
    //       this.dataDokter = resp.data.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // getDataPerawat(params) {
    //
    //   Api.perawat
    //     .filter(params)
    //     .then(resp => {
    //       this.dataPerawat = resp.data.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
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
    },
    getDataStatus(params) {
      Api.status
        .filter(params)
        .then(resp => {
          this.dataStatus = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataRanap(params) {
      Api.rawatinap
        .filter(params)
        .then(resp => {
          this.dataRanap = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
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
        this.init();
        // this.getData(this.filter);
        this.isModal = false;
      }
    },
    deleteData(id) {
      Api.analisisrawatinap
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
    changeFormulirModal(id) {
      if (this.isFormulirModal === false) {
        this.editFormulirId = id;
        this.isFormulirModal = true;
      } else {
        // this.init();
        // this.getData(this.filter);
        this.isFormulirModal = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
