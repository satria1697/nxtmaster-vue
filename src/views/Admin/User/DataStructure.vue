<template>
  <div class="detail">
    <Form
      v-if="isModal"
      :editIdProps="editId"
      titleProps="Form Pengisian Data Pengguna"
      @modal-closed="changeModal"
    ></Form>
    <div class="container">
      <div class="row">
        <div class="col">
          <!-- <div class="btn btn-default btn-md" v-on:click="getData(filter)">
            <i class="fas fa-sync"></i>
            Perbaharui Data
          </div> -->
          <div class="btn btn-default btn-md" v-on:click="changeModal(null)">
            <i class="fas fa-plus-circle"></i>
            Tambah
          </div>
        </div>
      </div>
    </div>
    <!-- <data-table
      :columns="columns"
      :data="dataAll"
      :classes="classes"
      @on-table-props-changed="reloadTable"
      class="outertable"
    > -->
    <h1 class="display-3">Struktur Organisasi</h1>
    <vue2-org-tree :data="dataStructure" />
  </div>
</template>

<script>
import Api from "../../../api";
import Form from "../../../components/Admin/Structure/FormStructure";
import edit from "../../../components/Table/ActionEdit";
import actiondelete from "../../../components/Table/ActionDelete";
// import avatar from "../../components/Table/Avatar";
import store from "../../../store";

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
          label: "Description",
          name: "description",
          orderable: true
        },
        {
          label: "Level",
          name: "structurelevel.description",
          orderable: true
        },
        {
          label: "Signability",
          name: "signability",
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
      dataStructure: {}
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
        // length: 10,
        orderColumn: "id",
        orderBy: "ASC"
      };
      self.getData(params);
    },
    getData(params) {
      let self = this;
      self.isLoading = true;
      // self.filter.page = params.page;
      // self.filter.find = params.find;
      // self.filter.length = params.length;
      // self.filter.orderColumn = params.orderColumn;
      // self.filter.orderBy = params.orderBy;
      Api.structure
        .filter(params)
        .then(res => {
          // self.dataAll = res.data;
          self.dataStructure = res.data.data;
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
    openTab(name, label) {
      let exists = false;
      let tabState = store.state.tabState;
      let isZero = tabState.length === 0;
      if (!isZero) {
        exists = tabState.some(tab => tab.name === name);
      }
      if (!exists) {
        if (tabState.length > 4) {
          console.log("tidak bisa menambah lebih dari 5");
          store.commit("closeTab", 5);
        } else {
          store.commit("openTab", { name, label });
        }
      }
    },
    deleteData(id) {
      let self = this;
      Api.structure
        .delete(id)
        .then(resp => {
          if (resp.status === 204) {
            self.getData(self.filter);
          }
        })
        .catch(() => {
          window.alert("Tidak dapat menghapus Data");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import url(https://unpkg.com/vue2-org-tree@1.3.4/dist/style.css);
</style>
