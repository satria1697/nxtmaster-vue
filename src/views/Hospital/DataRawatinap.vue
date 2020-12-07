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
    ></Form>
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
import Form from "../../components/Hospital/Rawatinap/FormRawatinap";
import edit from "../../components/Table/ActionEdit";
import actiondelete from "../../components/Table/ActionDelete";
// import store from "../../store";

export default {
  components: {
    Form
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
      dataPasien: [],
      dataKelasrawatinap: [],
      dataBangsal: [],
      dataKamarrawatinap: [],
      dataDokter: []
    };
  },
  created() {
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
      self.getDataPasien();
      self.getDataKelasrawatinap();
      self.getDataBangsal();
      self.getDataKamarrawatinap();
      self.getDataDokter();
    },
    getData(params) {
      let self = this;
      self.isLoading = true;
      self.filter.page = params.page;
      self.filter.find = params.find;
      self.filter.length = params.length;
      self.filter.orderColumn = params.orderColumn;
      self.filter.orderBy = params.orderBy;
      Api.rawatinap
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
      Api.rawatinap
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
    getDataPasien(params) {
      let self = this;
      Api.pasien
        .filter(params)
        .then(res => {
          self.dataPasien = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataKelasrawatinap(params) {
      let self = this;
      Api.kelasrawatinap
        .filter(params)
        .then(res => {
          self.dataKelasrawatinap = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataBangsal(params) {
      let self = this;
      Api.bangsal
        .filter(params)
        .then(res => {
          self.dataBangsal = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataKamarrawatinap(params) {
      let self = this;
      Api.kamarrawatinap
        .filter(params)
        .then(res => {
          self.dataKamarrawatinap = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataDokter(params) {
      let self = this;
      Api.tenagamedis
        .filter(params)
        .then(res => {
          self.dataDokter = res.data.data.filter(function(data) {
            return data.jenis_id === 1;
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
