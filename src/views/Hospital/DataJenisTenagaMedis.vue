<template>
  <div class="detail">
    <Form
      v-if="isModal"
      :editId="editId"
      title="Form Pengisian Data Pasien"
      @modal-closed="changeModal"
    ></Form>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="btn btn-default btn-md" v-on:click="getData(filter)">
            <i class="fas fa-sync"></i>
            Perbaharui Data
          </div>
          <div class="btn btn-default btn-md" v-on:click="changeModal(0)">
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
import Form from "../../components/Hospital/JenisTenagaMedis/FormJenisTenagaMedis";
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
          label: "Jenis Tenaga Medis",
          name: "description",
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
      dataAgama: [],
      dataPendidikan: [],
      dataPekerjaan: []
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
      this.getDataAgama();
      this.getDataPekerjaan();
      this.getDataPendidikan();
    },
    getData(params) {
      this.isLoading = true;
      this.filter.page = params.page;
      this.filter.find = params.find;
      this.filter.length = params.length;
      this.filter.orderColumn = params.orderColumn;
      this.filter.orderBy = params.orderBy;
      Api.jenistenagamedis
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
      Api.jenistenagamedis
        .delete(id)
        .then(resp => {
          if (resp.status === 204) {
            this.getData(this.filter);
          }
        })
        .catch(() => {
          window.alert("Tidak dapat menghapus Data");
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
