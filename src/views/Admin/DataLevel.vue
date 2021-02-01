<template>
  <div class="detail">
    <Form
      v-if="isModal"
      :editId="editId"
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
import Form from "../../components/Admin/Level/FormLevel";
import edit from "../../components/Table/ActionEdit";
import actiondelete from "../../components/Table/ActionDelete";
import dataTable from "../../mixins/datatableMixin";
import api from "../../api/const";

export default {
  components: {
    Form
  },
  mixins: [dataTable],
  data() {
    return {
      url: {
        get: api.level.Get,
        delete: api.level.Delete
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
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData(this.tableProps);
    }
  }
};
</script>

<style lang="scss" scoped></style>
