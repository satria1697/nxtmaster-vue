<template>
  <div
    class="main detail"
    :class="{ closeSideMain: this.$store.state.sideBarClose }"
  >
    <div class="container">
      <div class="row">
        <div class="col-3">
          <span>Antarmuka</span>
          <div class="sidebar">
            <div class="row">
              <h5>
                <i class="fas fa-home"></i>
                {{ dataRoot.caption }}
              </h5>
            </div>
            <div
              v-for="(dataChild, index) in dataAll"
              :key="dataChild.id"
              class="row"
            >
              <span class="col-12 font-weight-bold">
                <i class="fas fa-folder-open"></i>
                {{ dataParent[index].caption }}
              </span>
              <div class="col-12" v-for="data in dataChild" :key="data.id">
                <span>
                  <i class="fas fa-calendar-plus  "></i>
                  {{ data.caption }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-9">
          <span>Tambah Menu</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../api";
import store from "../../../store";
export default {
  data() {
    return {
      dataRoot: {},
      dataParent: [],
      dataChild: [],
      dataAll: []
    };
  },
  mounted() {
    let self = this;
    self.init();
  },
  methods: {
    init() {
      let self = this;
      self.openTab(self.$route.name, self.$route.name);
      self.getDataRootId();
    },
    openTab(name, label) {
      let exists = false;
      let tabState = store.state.tabState;
      let isZero = tabState.length === 0;
      if (!isZero) {
        exists = tabState.some(tab => tab.name === name);
      }
      if (!exists) {
        if (tabState.length > 4) {
          console.log("tidak bisa menambah lebih dari 5");
          store.commit("closeTab", 5);
        } else {
          store.commit("openTab", { name, label });
        }
      }
    },
    getDataRootId() {
      let self = this;
      let id = 41;
      api.aksesmanager
        .findRoot(id)
        .then(resp => {
          self.dataRoot = resp.data.data;
          let params = {
            parentid: resp.data.data.id
          };
          self.getDataParent(params);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataParent(params) {
      let self = this;
      api.aksesmanager
        .filterParent(params)
        .then(resp => {
          self.dataParent = resp.data.dataParent;
          self.dataAll = resp.data.dataChild;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #222222;
  color: white;
  padding: 10px 20px 20px 25px;
}
</style>
