<template>
  <transition class="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-theme">
              <span class="font-weight-bold">{{ title }}</span>
              <i
                class="fas fa-window-close pull-right pointer"
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
    let self = this;
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
          handler: self.select,
          component: button
        }
      ],
      filter: {
        page: null,
        find: "",
        length: null,
        orderColumn: "",
        orderBy: "",
        applicationid: self.appIdProps
      }
    };
  },
  mounted() {
    let self = this;
    self.init();
  },
  methods: {
    init() {
      let self = this;
      const params = {
        page: 1,
        find: "",
        length: 5,
        orderColumn: "id",
        orderBy: "ASC",
        applicationid: self.appIdProps
      };
      self.getData(params);
    },
    getData(params) {
      let self = this;
      self.isLoading = true;
      self.filter.page = params.page;
      self.filter.find = params.find;
      self.filter.length = params.length;
      self.filter.orderColumn = params.orderColumn;
      self.filter.orderBy = params.orderBy;
      console.log(params);
      params["applicationid"] = self.appIdProps;
      Api.modul
        .filterApp(params)
        .then(res => {
          self.dataAll = res.data;
        })
        .catch(err => {
          console.log(err);
          self.notFound = true;
        });
    },
    reloadTable(tableProps) {
      let self = this;
      self.getData(tableProps);
    },
    select(id) {
      let self = this;
      self.$emit("id-selected", id);
      self.$emit("modal-closed");
    },
    closeModal() {
      let self = this;
      // self.$emit("get-data");
      self.$emit("modal-closed");
    }
  }
};
</script>

<style lang="scss" scoped></style>
