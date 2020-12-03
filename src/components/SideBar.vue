<template>
  <div class="sidenav" :class="{ closeSide: this.$store.state.isSideBar }">
    <div v-if="!this.$store.state.isSideBar" class="sidenav-list">
      <span class="font-weight-bold"
        ><i class="fas fa-th-large"></i> Menu
        <span class="pointer" v-on:click="sidebar()"
          ><i class="fas fa-times"></i></span
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
      // isSideBar: false,
      isActive: false,
      dataRoot: {},
      dataParent: [],
      dataSidebar: []
    };
  },
  // created() {
  //   let self = this;
  //   store.watch(
  //     state => {
  //       return state.isSideBar;
  //     },
  //     () => {
  //       self.isSideBar = store.state.isSideBar;
  //     },
  //     {
  //       deep: true
  //     }
  //   );
  // },
  mounted() {
    let self = this;
    let id = store.getters["getAkses"];
    self.getDataRootId(id);
  },
  methods: {
    sidebar() {
      store.commit("sideBarChange");
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    goTo(payload) {
      let self = this;
      // console.log("/" + payload.data.application.path + "/" + payload.data.modul.path);
      if (payload.data.rolelevelid === 3) {
        self.$router
          .push(
            "/" + payload.data.application.path + "/" + payload.data.modul.path
          )
          .catch(() => {});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/abstracts/_variables";
.sidenav {
  min-height: 100vh;
  width: 230px;
  position: fixed;
  z-index: 100;
  background: #f0f0f0;
  color: $text-theme-alt;
  padding: 0;
  // overflow-y: auto;
  // overflow-x: hidden;
  border-radius: 0px;
  &-list {
    margin: 5px;
  }
  transition: 0.2s;
  ::v-deep span {
    margin: 0;
    font-size: 12px;
  }
  ::v-deep .tree-icon {
    width: 16px !important;
    height: 16px !important;
  }
  ::v-deep .tree-icon.tree-ocl {
    width: 20px !important;
    height: 20px !important;
  }
  ::v-deep .tree-wholerow-ul {
    min-height: 20vh;
    border-radius: 4px;
    margin-top: 30px;
    background-color: $theme-bg-detail;
    color: $text-theme-alt;
    border: 1px solid rgba($color: #000000, $alpha: 0.2);
    -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    padding-bottom: 5px;
    overflow-x: hidden;
  }
}
span.font-weight-bold {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin: 10px 0 0 4px;
  font-size: 13px;
  background: $theme-bg-detail;
  padding: 3px 14px 3px;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.2);
  border-right: 1px solid rgba($color: #000000, $alpha: 0.2);
  border-left: 1px solid rgba($color: #000000, $alpha: 0.2);
  position: absolute;
  top: 1px;
  z-index: 10;
  color: $text-theme-alt;
}
.sidenav.closeSide {
  width: 30px;
  padding: 0;
  background-color: $theme;
  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1999;
  .sidenav-list {
    margin: 2px;
  }
  .menu {
    margin: 0;
    padding: 3px;
    font-size: 13px;
    font-weight: bold;
    background-color: $theme;
    color: $text-theme;
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
.position-absolute {
  right: 10px;
}
</style>
