<template>
  <div class="detail">
    <Form
      v-if="isModal"
      :editId="editId"
      title="Form Pengisian Data Rawat Inap"
      @modal-closed="changeModal"
      :dataPasien="dataPasien"
      :dataKelasrawatinap="dataKelasrawatinap"
      :dataBangsal="dataBangsal"
      :dataKamarrawatinap="dataKamarrawatinap"
      :dataDokter="dataDokter"
      :dataPerawat="dataPerawat"
      :dataDokterAnestesi="dataDokterAnestesi"
    ></Form>
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
import Form from "../../components/Hospital/Rawatinap/FormRawatinap";
import edit from "../../components/Table/ActionEdit";
import actiondelete from "../../components/Table/ActionDelete";
// import store from "../../store";

export default {
  components: {
    Form
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
          label: "Nomer Rekam Medis",
          name: "pasien.norm",
          orderable: true
        },
        {
          label: "Kelas",
          name: "kelas.description",
          orderable: true
        },
        {
          label: "Bangsal",
          name: "bangsal.description",
          orderable: true
        },
        {
          label: "Dokter",
          name: "dokter.namadokter",
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
      dataPasien: [],
      dataKelasrawatinap: [],
      dataBangsal: [],
      dataKamarrawatinap: [],
      dataDokter: [],
      dataPerawat: [],
      dataDokterAnestesi: []
    };
  },
  created() {
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
      this.getDataPasien();
      this.getDataKelasrawatinap();
      this.getDataBangsal();
      this.getDataKamarrawatinap();
      this.getDataTenagaMedis();
    },
    getData(params) {
      this.isLoading = true;
      this.filter.page = params.page;
      this.filter.find = params.find;
      this.filter.length = params.length;
      this.filter.orderColumn = params.orderColumn;
      this.filter.orderBy = params.orderBy;
      Api.rawatinap
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
      Api.rawatinap
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
    getDataPasien(params) {
      Api.pasien
        .filter(params)
        .then(res => {
          this.dataPasien = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataKelasrawatinap(params) {
      Api.kelasrawatinap
        .filter(params)
        .then(res => {
          this.dataKelasrawatinap = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataBangsal(params) {
      Api.bangsal
        .filter(params)
        .then(res => {
          this.dataBangsal = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataKamarrawatinap(params) {
      Api.kamarrawatinap
        .filter(params)
        .then(res => {
          this.dataKamarrawatinap = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
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
          this.dataDokterAnestesi = this.dataDokter.filter(function(data) {
            return data.spesialisasi_id === 4;
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
.modal {
  &-dialog {
    max-width: 800px;
  }
}
</style>
