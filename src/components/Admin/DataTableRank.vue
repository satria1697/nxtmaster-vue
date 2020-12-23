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
import Api from "../../api";
import button from "../../components/Table/ActionButton";

export default {
  props: {
    title: {
      type: String
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
          orderable: true
        },
        {
          label: "Description",
          name: "description",
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
        orderBy: ""
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
      Api.rank
        .filter(params)
        .then(res => {
          // console.log(res.data.data);
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
