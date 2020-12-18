<template>
  <transition class="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-centered container-md">
          <div class="modal-content">
            <div class="modal-header bg-default">
              <span class="font-weight-bold">{{ title }}</span>
              <i
                class="fas fa-window-close pull-right pointer-event"
                @click="closeModal()"
              ></i>
            </div>
            <div class="modal-body">
              <data-table
                :classes="classes"
                :columns="columns"
                :data="dataAll"
                :per-page="['5']"
                @on-table-props-changed="reloadTable"
                class="outertable"
              >
              </data-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Api from "../../../api";
import button from "../../../components/Table/ActionButton";

export default {
  props: {
    title: {
      type: String
    },
    appIdProps: {
      type: Number
    }
  },
  data() {
    return {
      dataAll: {},
      classes: {
        table: {
          "table-sm": true
        },
        "t-head": {
          "span-theme": true
        }
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
          label: "Aksi",
          name: "Pilih",
          orderable: false,
          event: "click",
          handler: this.select,
          component: button
        }
      ],
      filter: {
        page: null,
        find: "",
        length: null,
        orderColumn: "",
        orderBy: "",
        applicationid: this.appIdProps
      }
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
        length: 5,
        orderColumn: "id",
        orderBy: "ASC",
        applicationid: this.appIdProps
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
      console.log(params);
      params["applicationid"] = this.appIdProps;
      Api.modul
        .filterApp(params)
        .then(res => {
          this.dataAll = res.data;
        })
        .catch(err => {
          console.log(err);
          this.notFound = true;
        });
    },
    reloadTable(tableProps) {
      this.getData(tableProps);
    },
    select(id) {
      this.$emit("id-selected", id);
      this.$emit("modal-closed");
    },
    closeModal() {
      // this.$emit("get-data");
      this.$emit("modal-closed");
    }
  }
};
</script>

<style lang="scss" scoped></style>
