<template>
  <div>
    <Form
      v-if="isModal"
      :editId="editId"
      title="Form Pengisian Data Akses"
      @modal-closed="changeModal"
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
import Form from "../../components/Admin/Akses/FormAkses";
import edit from "../../components/Table/ActionEdit";
import actiondelete from "../../components/Table/ActionDelete";
// import avatar from "../../components/Table/Avatar";
// import store from "../../../store";

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
          label: "Active",
          name: "active",
          orderable: false
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
      isLoading: false
    };
  },
  mounted() {
    this.init();
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
    },
    getData(params) {
      this.isLoading = true;
      this.filter.page = params.page;
      this.filter.find = params.find;
      this.filter.length = params.length;
      this.filter.orderColumn = params.orderColumn;
      this.filter.orderBy = params.orderBy;
      Api.akses
        .filter(params)
        .then(res => {
          // console.log(res);
          // console.log(Object.entries(this.dataAll))
          this.dataAll = res.data;
          this.isLoading = false;
          // console.log(Object.entries(this.dataAll))
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
    // openTab(name, label) {
    //   let exists = false;
    //   let tabState = store.state.tabState;
    //   let isZero = tabState.length === 0;
    //   if (!isZero) {
    //     exists = tabState.some(tab => tab.name === name);
    //   }
    //   if (!exists) {
    //     if (tabState.length > 4) {
    //       console.log("tidak bisa menambah lebih dari 5");
    //       store.commit("closeTab", 5);
    //     } else {
    //       store.commit("openTab", { name, label });
    //     }
    //   }
    // },
    deleteData(id) {
      Api.akses
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
