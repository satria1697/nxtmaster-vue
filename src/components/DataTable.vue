<template>
  <div class="Loading" v-if="isLoading">
    <span>Data is Loading</span>
  </div>
  <div v-else-if="dataAll" class="container">
    <Form v-if="isModal()" v-on:refreshData="init()" />
    <div class="row">
      <div class="col">
        <h3>Tabel {{ this.$route.name }}</h3>
      </div>
      <div class="col-2">
        <i
          v-on:click="openModal()"
          class="fas fa-plus-circle fa-2x pointer icon-top"
        ></i>
        <i
          v-on:click="updateData()"
          class="fas fa-sync fa-2x pointer icon-top"
        ></i>
      </div>
    </div>
    <div class="row">
      <div class="col-1">
        <select id="form-perpage" v-model="filter.perPage" class="form-control">
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
      </div>
      <div class="col-2">
        <span>records per page</span>
      </div>
      <div class="col-4">
        <input
          type="text"
          v-model="filter.find"
          class="form-control"
          placeholder="Search Here"
        />
      </div>
    </div>
    <div class="outertable">
      <table class="table table-sm table-striped table-borderless">
        <thead>
          <tr>
            <!-- <th v-on:click="changeOrder('id')">
              <span>ID</span>
              <i
                class="fas fa-chevron-down"
                v-if="orderBy === 'DESC' && orderColumn === 'id'"
              ></i>
              <i
                class="fas fa-chevron-up"
                v-if="orderBy === 'ASC' && orderColumn === 'id'"
              ></i>
            </th>
            <th v-on:click="changeOrder('fullname')">
              <span>Fullname</span>
              <i
                class="fas fa-chevron-down"
                v-if="orderBy === 'DESC' && orderColumn === 'fullname'"
              ></i>
              <i
                class="fas fa-chevron-up"
                v-if="orderBy === 'ASC' && orderColumn === 'fullname'"
              ></i>
            </th> -->
            <th
              v-on:click="changeOrder(column)"
              v-for="(column, index) in columns"
              :key="index"
            >
              <span>{{ column }}</span>
              <i
                class="fas fa-chevron-down"
                v-if="
                  filter.orderBy === 'DESC' && filter.orderColumn === column
                "
              ></i>
              <i
                class="fas fa-chevron-up"
                v-if="filter.orderBy === 'ASC' && filter.orderColumn === column"
              ></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in dataAll" :key="data.id">
            <td>{{ data.id }}</td>
            <td>{{ data.fullname }}</td>
            <td class="buttonClass">
              <div v-on:click="openModalEdit(data.id)" class="pointer">
                <i class="far fa-edit fa-xs"></i>
              </div>
              <div v-on:click="deletePerson(data.id)" class="pointer">
                <i class="far fa-trash-alt fa-xs"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="grid">
      <div>
        <span
          >Showing {{ response.from }} to {{ response.to }} of
          {{ response.total }} entries</span
        >
        <br />
        <span>
          Page {{ response.current_page }} from {{ response.last_page }}</span
        >
      </div>
      <div class="route grid-item_right">
        <span v-on:click="prevPage()" class="btn btn-secondary">prev</span>
        <div
          v-if="currentState > 1"
          v-on:click="page = 1"
          class="btn btn-secondary"
        >
          1
        </div>
        <div
          v-if="currentState > 3 && currentState + 1 < lastState"
          v-on:click="currentState - 1"
          class="btn btn-secondary"
        >
          {{ currentState - 1 }}
        </div>
        <div
          v-if="last === false"
          v-on:click="page = currentState"
          class="btn btn-secondary"
        >
          {{ currentState }}
        </div>
        <!-- <span v-if="last === true && page > 4">...</span> -->
        <div
          v-on:click="page = nextState"
          v-if="nextState > 0"
          class="btn btn-secondary"
        >
          {{ nextState }}
        </div>
        <div
          v-on:click="page = doubleState"
          v-if="doubleState > 1"
          class="btn btn-secondary"
        >
          {{ doubleState }}
        </div>
        <!-- <span v-if="last === false">...</span> -->
        <div
          v-on:click="page = lastState"
          v-if="lastState !== 1"
          class="btn btn-secondary"
        >
          {{ lastState }}
        </div>
        <span v-on:click="nextPage()" class="btn btn-secondary">next</span>
      </div>
    </div>
    <div class="buttonDownload form-group">
      <button
        v-on:click="downloadAsXls()"
        class="btn btn-info form-control-row"
      >
        Download as XLSX
      </button>
      <button
        v-on:click="downloadAsCsv()"
        class="btn btn-info form-control-row"
      >
        Download as CSV
      </button>
      <button v-on:click="viewAsPdf()" class="btn btn-info form-control-row">
        View as PDF
      </button>
      <div class="pdf-main" v-if="pdfLink !== '' && isLoading === false">
        <pdf :src="pdfLink"></pdf>
      </div>
    </div>
  </div>
  <div class="notFound" v-else-if="notFound">
    <span>Tabel {{ this.$route.name }} tidak ditemukan</span>
  </div>
</template>

<script>
import Api from "../api";
import axios from "axios";
import Form from "../components/Admin/FormDataUser.vue";
import pdf from "../components/PdfViewer";
import store from "../store";
// import { mapMutations } from "vuex";
export default {
  components: {
    Form,
    pdf
  },
  props: {
    column: {
      type: Array,
      required: true
    },
    dataProps: {
      type: Array,
      required: true
    },
    responseProps: {
      required: true
    },
    filterProps: {
      required: true
    }
  },
  data() {
    let self = this;
    return {
      dataAll: self.dataProps,
      response: self.responseProps,
      page: 1,
      searchQuery: "",
      perPage: 10,
      currentState: 0,
      nextState: 0,
      doubleState: 0,
      lastState: 0,
      last: false,
      filter: {
        page: self.filterProps.page,
        perPage: self.filterProps.perPage,
        find: self.filterProps.find,
        orderColumn: self.filterProps.orderColumn,
        orderBy: self.filterProps.orderBy
      },
      isLoading: false,
      pdfLink: "",
      notFound: false,
      columns: self.column
    };
  },
  created() {
    let self = this;
    store.watch(
      state => {
        return state.isModal;
      },
      () => {
        self.isModal();
      }
    );
  },
  mounted() {
    let self = this;
    self.init();
  },
  methods: {
    init() {},
    isModal() {
      let self = this;
      return self.$store.state.isModal;
    },
    openModal() {
      store.commit("modalChange");
    },
    openModalEdit(id) {
      // let self = this;
      store.commit("openModalEditMuta", id);
    },
    deletePerson(ids) {
      let self = this;
      let link = "http://127.0.0.1:8000/api/person/{id}";
      let linknew = link.replace("{id}", ids);
      axios.delete(linknew).then(response => {
        response;
        self.updateData();
        self.updateState();
      });
    },
    // updateData() {
    //   let self = this;
    //   self.notFound = false;
    //   const params = {
    //     page: self.page,
    //     find: self.searchQuery,
    //     perPage: self.perPage,
    //     orderColumn: self.orderColumn,
    //     orderBy: self.orderBy
    //   };
    //   Api.user
    //     .filter(params)
    //     .then(res => {
    //       console.log(res.data);
    //       self.dataAll = res.data.data.data;
    //       self.response = res.data.data;
    //       self.updateState();
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       self.notFound = true;
    //     });
    // },
    updateData() {
      let self = this;
      const params = {
        page: self.filter.page,
        find: self.filter.find,
        perPage: self.filter.perPage,
        orderColumn: self.filter.orderColumn,
        orderBy: self.filter.orderBy
      };
      // console.log(params);
      self.$emit("update-data", params);
    },
    nextPage() {
      let self = this;
      let page = self.page;
      if (page + 1 <= self.response.last_page) {
        self.page += 1;
      }
    },
    prevPage() {
      let self = this;
      let page = self.page;
      if (page - 1 >= 1) {
        self.page -= 1;
      }
    },
    updateState() {
      let self = this;
      self.currentState = self.response.current_page;
      self.lastState = self.response.last_page;
      let nextState = self.currentState + 1;
      if (nextState <= self.lastState - 2) {
        if (nextState + 1 >= self.lastState) {
          self.nextState = self.lastState - 2;
        } else {
          self.nextState = nextState;
        }
      } else {
        self.nextState = self.lastState - 2;
      }
      let doubleState = self.currentState + 2;
      if (doubleState <= self.lastState - 1) {
        if (doubleState >= self.lastState) {
          self.doubleState = self.lastState - 1;
        } else {
          self.doubleState = doubleState;
        }
      } else {
        self.doubleState = self.lastState - 1;
      }
      if (self.currentState + 2 >= self.lastState) {
        self.last = true;
      } else {
        self.last = false;
      }
    },
    changeOrder(column) {
      let self = this;
      if (self.filter.orderBy === "ASC") {
        self.filter.orderColumn = column;
        self.filter.orderBy = "DESC";
      } else {
        self.filter.orderColumn = column;
        self.filter.orderBy = "ASC";
      }
    },
    goTo(route) {
      let self = this;
      return self.$router.push({ name: route });
    },
    downloadAsCsv() {
      Api.download.ascsv().then(resp => {
        const link = document.createElement("a");
        link.href = resp.config.url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    downloadAsXls() {
      Api.download.asxlsx().then(resp => {
        const link = document.createElement("a");
        link.href = resp.config.url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    downloadAsPdf() {
      Api.download.aspdf().then(resp => {
        const link = document.createElement("a");
        link.href = resp.config.url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    viewAsPdf() {
      Api.download
        .aspdf()
        .then(resp => {
          let self = this;
          self.pdfLink = resp.config.url;
          console.log(resp);
        })
        .catch(err => {
          console.log("middle" + err);
        });
      self.isLoading = false;
    }
  },
  watch: {
    "filter.page": function() {
      let self = this;
      self.updateData();
    },
    "filter.find": function() {
      let self = this;
      self.updateData();
      self.updateState();
      self.page = 1;
    },
    "filter.perPage": function() {
      let self = this;
      self.updateData();
      self.updateState();
      self.page = 1;
    },
    "filter.orderBy": function() {
      let self = this;
      self.updateData();
      self.updateState();
      self.page = 1;
    },
    "filter.orderColumn": function() {
      let self = this;
      self.updateData();
      self.updateState();
      self.page = 1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
