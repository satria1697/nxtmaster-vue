<template>
  <div class="detail">
    <Form
      v-if="isModal"
      :editId="editId"
      title="Form Pengisian Data Formulir"
      @modal-closed="changeModal"
      :dataFormulir="dataFormulir"
    ></Form>
    <div class="container-fluid">
      <div v-if="isLoading" class="offset-5 col-md-1">
        <div class="spinner-border"></div>
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
import Form from "../../components/Siska/FormulirData/FormFormulirData";
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
      dataFormulir: []
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
        column: "formulirid",
        dir: "ASC"
      };
      this.getData(params);
      this.getDataFormulir();
    },
    getData(params) {
      this.isLoading = true;
      this.filter.page = params.page;
      this.filter.find = params.find;
      this.filter.length = params.length;
      if (params.column === "formulir.description") {
        params.column = "formulirid";
      }
      this.filter.column = params.column;
      this.filter.dir = params.dir;
      Api.formulirdata
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
      Api.formulirdata
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
    getDataFormulir(params) {
      Api.formulir
        .filter(params)
        .then(resp => {
          this.dataFormulir = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
