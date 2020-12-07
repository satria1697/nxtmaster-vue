<template>
  <div class="detail">
    <Form
      v-if="isModal"
      :editId="editId"
      title="Form Pengisian Data Formulir"
      @modal-closed="changeModal"
      :dataFormulir="dataFormulir"
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
import Form from "../../components/Siska/FormulirData/FormFormulirData";
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
        column: "",
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
          label: "label",
          name: "description",
          orderable: true
        },
        {
          label: "idformulir",
          name: "formulir.description",
          orderable: true
        },
        {
          label: "Tingkatan",
          name: "keyid",
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
      dataFormulir: []
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
        column: "formulirid",
        dir: "ASC"
      };
      self.getData(params);
      self.getDataFormulir();
    },
    getData(params) {
      let self = this;
      self.isLoading = true;
      self.filter.page = params.page;
      self.filter.find = params.find;
      self.filter.length = params.length;
      self.filter.column = params.column;
      self.filter.dir = params.dir;
      Api.formulirdata
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
      Api.formulirdata
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
    }
  }
};
</script>

<style lang="scss" scoped></style>
