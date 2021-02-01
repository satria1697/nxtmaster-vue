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
import Form from "../../components/Admin/User/FormDataUser";
import edit from "../../components/Table/ActionEdit";
import actiondelete from "../../components/Table/ActionDelete";
import avatar from "../../components/Table/Avatar";
import api from "../../api/const";
import dataTable from "../../mixins/datatableMixin";
export default {
  components: {
    Form
  },
  mixins: [dataTable],
  data() {
    return {
      url: {
        get: api.user.userGet,
        delete: api.user.userDelete
      },
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
          name: "structure.label",
          orderable: true
        },
        {
          label: "Tingkat",
          name: "rank.description",
          orderable: true
        },
        {
          label: "",
          name: "Edit",
          orderable: false,
          event: "click",
          handler: this.changeModal,
          component: edit,
          width: 1
        },
        {
          label: "",
          name: "Delete",
          oderable: false,
          event: "click",
          handler: this.deleteData,
          component: actiondelete,
          width: 1
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
