<template>
  <div class="detail">
    <Form
      v-if="isModal"
      :editId="editId"
      :data-app="dataApp"
      title="Form Pengisian Data Pengguna"
      @modal-closed="changeModal"
    ></Form>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="btn btn-default btn-md" v-on:click="getData(filter)">
            <i class="fas fa-sync"></i>
            Perbaharui Data
          </div>
          <div
            class="btn btn-default btn-md"
            v-on:click="changeModal(0)"
            v-if="!isLoading"
          >
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
import Form from "../../components/Admin/Modul/FormModul";
import edit from "../../components/Table/ActionEdit";
import actiondelete from "../../components/Table/ActionDelete";
import api from "../../api/const";
import dataTable from "../../mixins/datatableMixin";
import axios from "axios";

export default {
  components: {
    Form
  },
  mixins: [dataTable],
  data() {
    return {
      url: {
        get: api.modul.Get,
        delete: api.modul.Delete
      },
      columns: [
        {
          label: "ID",
          name: "id",
          orderable: true,
          width: 5
        },
        {
          label: "Nama",
          name: "name",
          orderable: true
        },
        {
          label: "Description",
          name: "description",
          orderable: true
        },
        {
          label: "Application",
          name: "application.description",
          orderable: true
        },
        {
          label: "Path",
          name: "path",
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
      dataApp: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData(this.tableProps);
      this.getDataApp();
    },
    getDataApp() {
      axios
        .get(api.application.Get)
        .then(resp => {
          this.dataApp = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
