import axios from "axios";

export default {
  data() {
    return {
      url: {
        get: null,
        delete: null
      },
      dataAll: null,
      tableProps: {
        search: "",
        length: 10,
        column: "id",
        dir: "asc",
        page: 1,
        filters: {}
      },
      isLoading: false,
      isModal: false,
      editId: null,
      classes: {
        table: {
          "table-sm": true
        },
        "t-head": {
          "span-theme": true
        }
      }
    };
  },
  methods: {
    getData(params) {
      if (params !== undefined) {
        this.tableProps.search = params.search;
        this.tableProps.length = params.length;
        this.tableProps.column = params.column;
        this.tableProps.dir = params.dir;
        this.tableProps.page = params.page;
        this.tableProps.filters = params.filters;
      }
      axios
        .get(this.url.get, { params: params })
        .then(res => {
          this.dataAll = res.data;
        })
        .catch(err => {
          console.log(err);
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
      axios
        .delete(this.url.delete.replace("{id}", id))
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
