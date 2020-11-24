<template>
  <div class="sidenav" :class="{ closeSide: isSideBar }">
    <div v-if="!isSideBar" class="sidenav-list pointer">
      <span class="float-right" v-on:click="sidebar()"
        ><i class="fas fa-thumbtack"></i
      ></span>
      <v-jstree :data="dataSidebar" whole-row @item-click="goTo"></v-jstree>
    </div>
    <div v-else class="sidenav-list pointer" v-on:click="sidebar()">
      <span class="menu">Menu</span>
    </div>
  </div>
</template>

<script>
import store from "../store";
import api from "../api";
import VJstree from "vue-jstree";

export default {
  components: {
    VJstree
  },
  props: {
    avatarProps: {
      type: String
    }
  },
  data() {
    let self = this;
    return {
      avatar: self.avatarProps,
      fullname: store.getters["getFullname"],
      isSideBar: false,
      isActive: false,
      dataRoot: {},
      dataParent: [],
      dataSidebar: []
    };
  },
  created() {
    let self = this;
    store.watch(
      state => {
        return state.isSideBar;
      },
      () => {
        self.isSideBar = store.state.isSideBar;
      },
      {
        deep: true
      }
    );
  },
  mounted() {
    let self = this;
    let id = store.getters["getAkses"];
    self.getDataRootId(id);
  },
  methods: {
    sidebar() {
      store.commit("sideBarChange");
    },
    computedClass(routeName) {
      let className = "isActive";
      let self = this;
      if (routeName === self.$route.name) {
        return className;
      }
    },
    getDataRootId(id) {
      let self = this;
      api.aksesmanager
        .findRoot(id)
        .then(resp => {
          self.dataSidebar = resp.data.data;
          self.dataSidebar.forEach(data => {
            data.children.forEach(data => {
              data.children.forEach(leaf => {
                if (leaf.icon === "") {
                  leaf.icon = "fa fa-file";
                }
              });
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataFolder(params) {
      let self = this;
      api.aksesmanager
        .filterParent(params)
        .then(resp => {
          self.dataSidebar = resp.data.data;
          // self.dataChild = resp.data.dataChild;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goTo(payload) {
      let self = this;
      self.$router.push({ name: payload.data.modul.path });
    }
  },
  watch: {
    "$route.name": {
      handler(name) {
        let self = this;
        self.computedClass(name);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/abstracts/_variables";
.sidenav {
  height: 100vh;
  width: 230px;
  position: fixed;
  overflow-y: auto;
  z-index: 1;
  background-color: #a9a9a9;
  overflow-x: hidden;
  color: $text-theme-alt;
  border-right: 2px solid black;
  padding: 0px;
  overflow-y: auto;
  overflow-x: scroll;
  &-list {
    margin: 5px;
  }
  transition: 0.2s;
  /deep/ span {
    margin: 0;
    font-size: 12px;
  }
  /deep/ .tree-icon {
    width: 16px !important;
    height: 16px !important;
  }
  /deep/ .tree-icon.tree-ocl {
    width: 24px !important;
    height: 24px !important;
  }
}
.span-side {
  color: white;
}
.sidenav.closeSide {
  width: 30px;
  padding: 0;
  background-color: $theme;
  .sidenav-list {
    margin: 2px;
  }
  .menu {
    margin: 0;
    padding: 3px;
    font-size: 14px;
    border-bottom: 2px solid black;
    background-color: white;
    -ms-writing-mode: tb-rl;
    writing-mode: tb-rl;
  }
}
.user {
  margin: 7px;
  display: grid;
  grid-template-columns: 35px 180px;
  .img-container {
    img {
      width: 30px;
      height: 30px;
    }
  }
  &-name {
    span {
      font-size: 13px;
    }
  }
}
</style>
