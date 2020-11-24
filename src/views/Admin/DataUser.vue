<template>
  <div class="detail">
    <Form
      v-if="isModal"
      :editIdProps="editId"
      :dataAkses="dataAkses"
      titleProps="Form Pengisian Data Pengguna"
      @modal-closed="changeModal"
    ></Form>
    <div class="container">
      <div class="row">
        <div class="col">
          <h3>
            Tabel Data pengguna
          </h3>
        </div>
        <div class="col-2">
          <i
            v-on:click="changeModal(null)"
            class="fas fa-plus-circle fa-2x pointer icon-top"
          ></i>
          <i
            v-on:click="getData(filter)"
            class="fas fa-sync fa-2x pointer icon-top"
          ></i>
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
import Form from "../../components/Admin/FormDataUser";
import edit from "../../components/Table/ActionEdit";
import actiondelete from "../../components/Table/ActionDelete";
import avatar from "../../components/Table/Avatar";
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
          label: "",
          name: "avatar",
          orderable: false,
          component: avatar,
          width: 3
        },
        {
          label: "Username",
          name: "username",
          orderable: true
        },
        {
          label: "Full Name",
          name: "fullname",
          orderable: true
        },
        {
          label: "Level",
          name: "level.description",
          orderable: true
        },
        {
          label: "Pangkat",
          name: "structure.description",
          orderable: true
        },
        {
          label: "Tingkat",
          name: "rank.description",
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
      dataAkses: []
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
      self.getAksesData();
    },
    getAksesData(params) {
      let self = this;
      Api.akses
        .filter(params)
        .then(resp => {
          self.dataAkses = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData(params) {
      let self = this;
      self.isLoading = true;
      self.filter.page = params.page;
      self.filter.find = params.find;
      self.filter.length = params.length;
      self.filter.column = params.column;
      self.filter.dir = params.dir;
      Api.user
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
      Api.user
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

<style lang="scss" scoped></style>
