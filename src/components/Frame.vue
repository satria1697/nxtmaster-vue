<template>
  <div>
    <nav
      class="navbar navbar-expand bg-default sticky-top"
      :class="{ navbarClose: !sidebarState }"
    >
      <div class="navbar-brand">NXTHospital</div>
      <!--      <button-->
      <!--        class="navbar-toggler"-->
      <!--        type="button"-->
      <!--        data-toggle="collapse"-->
      <!--        data-target="#navbarSupportedContent"-->
      <!--        aria-controls="navbarSupportedContent"-->
      <!--        aria-expanded="false"-->
      <!--        aria-label="Toggle navigation"-->
      <!--      >-->
      <!--        <i class="fas fa-ellipsis-v"></i>-->
      <!--      </button>-->

      <!--      <div class="collapse navbar-collapse" id="navbarSupportedContent">-->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <div
            class="nav-link dropdown-toggle"
            id="navbarDropdown1"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-cogs"></i>
          </div>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown1"
          >
            <h6 class="dropdown-header">Pengaturan</h6>
            <button class="dropdown-item" v-on:click="goTo('umum')">
              Umum
            </button>
            <h6 class="dropdown-header">Manajemen Akses</h6>
            <button class="dropdown-item" v-on:click="goTo('dataakses')">
              Data Akses
            </button>
            <button class="dropdown-item" v-on:click="goTo('dataaksesmanager')">
              Pengaturan Akses
            </button>
            <h6 class="dropdown-header">Manajemen Akses</h6>
            <button class="dropdown-item" v-on:click="goTo('dataaplikasi')">
              Data Aplikasi
            </button>
            <button class="dropdown-item" v-on:click="goTo('datamodul')">
              Data Modul
            </button>
            <!--              <button class="dropdown-item">Api Klien</button>-->
          </div>
        </li>
        <li class="nav-item dropdown">
          <div
            class="nav-link dropdown-toggle"
            id="navbarDropdown2"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-users"></i>
          </div>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown2"
          >
            <h6 class="dropdown-header">Manajemen Pengguna</h6>
            <button class="dropdown-item" v-on:click="goTo('datauser')">
              Data Pengguna
            </button>
            <button class="dropdown-item" v-on:click="goTo('datalevel')">
              Tingkatan pengguna
            </button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" v-on:click="goTo('datarank')">
              Pangkat dan Golongan
            </button>
            <div
              class="dropdown-divider"
              v-on:click="goTo('datastructure')"
            ></div>
            <button class="dropdown-item">
              Struktur Organisasi
            </button>
            <button
              class="dropdown-item"
              v-on:click="goTo('datastructurelevel')"
            >
              Tingkatan Struktural
            </button>
          </div>
        </li>
        <li class="nav-item dropdown">
          <div
            class="nav-link dropdown-toggle"
            id="navbarDropdown3"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-info-circle"></i>
          </div>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown3"
          >
            <div class="dropdown-item-text p-4" style="min-width: 20rem">
              Next Integrated Application for Solutions Version
              {{ JSON.stringify(require("../../package.json").version) }}
              @{{ new Date().getFullYear() }}
              Wish Enterprise
            </div>
          </div>
        </li>
        <li class="nav-item dropdown">
          <div
            class="nav-link dropdown-toggle d-none d-lg-block"
            id="navbarDropdown4"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ this.$store.getters["getFullname"] }}
          </div>
          <div
            class="nav-link dropdown-toggle d-md-block d-sm-block d-lg-none d-xl-none"
            id="navbarDropdown4"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-user-circle"></i>
          </div>
          <div
            class="dropdown-menu dropdown-menu-right col"
            aria-labelledby="navbarDropdown4"
          >
            <button class="dropdown-item" v-on:click="goTo('profile')">
              Profil
            </button>
            <button class="dropdown-item" v-on:click="logout">
              Keluar
            </button>
          </div>
        </li>
      </ul>
      <!--      </div>-->
    </nav>
    <!--    <nav class="sidebar flex-column bg-default ml-md-auto">-->
    <!--      <router-link to="/" class="nav-link">Home</router-link>-->
    <!--      <router-link to="/about" class="nav-link">About</router-link>-->
    <!--      <div class="nav-link">Active</div>-->
    <!--      <div class="nav-link">Active</div>-->
    <!--      <div class="nav-link">Active</div>-->
    <!--    </nav>-->
    <div
      v-if="sidebarState"
      class="sidebar-mask d-md-block d-sm-block d-lg-none d-xl-none"
    ></div>
    <div
      class="sidebar flex-column bg-default ml-md-auto"
      :class="{ sidebarClose: !sidebarState }"
    >
      <div v-if="sidebarState" class="sidebar-list">
        <div class="sidebar-top">
          <span class="top-text">
            <i class="fas fa-th-large"></i>
            <span> Menu </span>
            <i
              class="fas fa-times pointer-event"
              v-on:click="sidebarState = false"
            ></i>
          </span>
        </div>
        <v-jstree :data="dataSidebar" whole-row @item-click="goTo"></v-jstree>
      </div>
      <div
        v-if="!sidebarState"
        class="sidebar-list"
        v-on:click="sidebarState = true"
      >
        <span class="menu pointer-event">Menu</span>
      </div>
    </div>
    <div class="detail" :class="{ closeSide: !sidebarState }">
      <div class="app-body">
        <router-tab
          lang="en"
          :max-alive="10"
          :restore="
            this.$store.getters['getUsername'] +
              ':' +
              this.$store.getters['getAkses']
          "
          restore-watch
          page-transition="page-fade"
          :tabs="tabs"
        />
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import VJstree from "vue-jstree";
import api from "../api";
export default {
  components: {
    VJstree
  },
  data() {
    return {
      tabs: ["/"],
      dataSidebar: [],
      sidebarState: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const id = store.getters["getAkses"];
      this.checksiderbar();
      this.getDataRootId(id);
    },
    checksiderbar() {
      let sidebarstate = sessionStorage.getItem(
        "sidebar" +
          ":" +
          store.getters["getUsername"] +
          ":" +
          store.getters["getAkses"]
      );
      if (sidebarstate !== null) {
        this.sidebarState = sidebarstate !== "false";
      } else if (store.getters["getAkses"] === "0") {
        this.sidebarState = false;
      }
      if (window.outerWidth <= 768) {
        this.sidebarState = false;
      }
      // if ($(window).width() ===)
    },
    goTo(destination) {
      if (typeof destination === "string") {
        this.$router.push({ name: destination });
        if (window.outerWidth <= 768) {
          this.sidebarState = false;
        }
      }
      if (destination.data.rolelevelid === 3) {
        this.$router
          .push(
            "/" +
              destination.data.application.path +
              "/" +
              destination.data.modul.path
          )
          .catch(() => {});
        if (window.outerWidth <= 768) {
          this.sidebarState = false;
        }
      }
    },
    getDataRootId(id) {
      api.aksesmanager
        .findRoot(id)
        .then(resp => {
          this.dataSidebar = resp.data.data;
          this.dataSidebar.forEach(data => {
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
    logout() {
      api.auth
        .logout()
        .then(resp => {
          if (resp.data.status === "success") {
            store.commit("authenChange");
            if (store.state.isAuthenticated === false) {
              this.$tabs.saveTabs();
              store.commit("setToken", "");
              localStorage.removeItem("token");
              sessionStorage.removeItem(
                "sidebar" +
                  ":" +
                  store.getters["getUsername"] +
                  ":" +
                  store.getters["getAkses"]
              );
              sessionStorage.removeItem(
                "tab" +
                  ":" +
                  store.getters["getUsername"] +
                  ":" +
                  store.getters["getAkses"]
              );
              let username = "";
              let fullname = "";
              let levelid = null;
              let id = null;
              let akses = null;
              store.commit("setLogin", {
                username,
                fullname,
                levelid,
                id,
                akses
              });
              this.$router.push("/login");
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    sidebarState: function() {
      sessionStorage.setItem(
        "sidebar" +
          ":" +
          store.getters["getUsername"] +
          ":" +
          store.getters["getAkses"],
        this.sidebarState
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/abstracts/variables";
.detail {
  margin: 1rem 1rem 0 calc(250px + 1rem);
  transition: 0.2s;
}
.detail.closeSide {
  margin-left: 3rem;
}
.navbar {
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  transition: 0.2s;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  button {
    .fas {
      color: $text;
    }
  }
}
.navbar.navbarClose {
  border-bottom-left-radius: 0;
}

//nav
@keyframes growDown {
  0% {
    transform: scaleY(0);
  }
  80% {
    transform: scaleY(1.1);
  }
  100% {
    transform: scaleY(1);
  }
}
.dropdown {
  padding: 2px;
  .dropdown-menu {
    min-width: 20vw;
    animation: growDown 200ms ease-in-out forwards;
    transform-origin: top center;
    .dropdown-item {
      &:hover {
        padding: 0.15rem 1.4rem;
        border: 0.1rem solid $theme;
        border-radius: 4px;
      }
    }
  }
}
.dropdown.show {
  padding-top: 0;
  border-top: 2px solid white;
}

//tab
.router-tab {
  /*min-height: calc(90vh - 1rem);*/
}
::v-deep .router-tab__header {
  margin: 0 0.5rem;
  height: 30px;
  /*width: 5rem;*/
  border: none;
}
::v-deep .router-tab__scroll {
  height: 30px;
  /*position: absolute;*/
  /*top: 1px;*/
  /*overflow-x: auto;*/
  /*width: 5rem;*/
  /*position: absolute;*/
  /*top: 1px;*/
}
::v-deep .router-tab__nav {
  height: 30px;
  /*width: 5rem;*/
}
::v-deep .router-tab__item {
  /*border: 1px solid #22333b;*/
  font-size: inherit;
  /*border: none;*/
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  /*border: 1px solid rgba(0, 0, 0, 0.2);*/
  padding: 0 1rem;
  /*z-index: 10;*/
  background: $theme;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  &-title {
    color: $text;
  }
  &-icon {
    font-size: inherit;
    color: $text;
  }
  &:first-child {
    /*border-left: 1px solid #22333b;*/
    /*border: 1px solid rgba(0, 0, 0, 0.2);*/
  }
}
::v-deep .router-tab__item.is-active {
  /*background: white;*/
  background: white;
  border-top: 3px solid $theme;
  box-shadow: none;
  .router-tab__item-title {
    color: $theme;
  }
  .router-tab__item-icon {
    color: $theme;
  }
}
::v-deep .router-tab__container {
  /*border: 1px solid #22333b;*/
  min-height: calc(70vh - 1rem);
  max-height: calc(86vh - 1rem);
  border-radius: 4px;
  padding: 10px 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  overflow-x: hidden;
  overflow-y: auto;
  /*border: 1px solid rgba(0, 0, 0, 0.2);*/
}
::v-deep {
  // Page fade transition
  .page-fade {
    &-enter-active {
      transition: opacity 0.5s;
    }

    &-enter {
      opacity: 0;
    }
  }
}
// sidebar
.sidebar {
  min-height: 100vh;
  @media (max-width: 768px) {
    min-width: calc(100vw - 2rem);
    max-width: calc(100vw - 2rem);
  }
  @media (min-width: 768px) {
    min-width: 250px;
    max-width: 250px;
  }

  position: fixed;
  z-index: 100;
  background: inherit;
  color: $text;
  padding: 0;
  margin: 1rem 0 0 0.5rem;
  // overflow-y: auto;
  border-radius: 0;
  z-index: 120;
  &-mask {
    background: $theme;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 110;
  }
  &-list {
    margin: 0 0 0 1rem;
  }
  &-top {
    border-top-left-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: none;
    border-top-right-radius: 4px;
    /*margin: 5px;*/
    display: inline-block;
    /*width: 100%;*/
    height: 100%;
    margin: 0 5px;
    font-size: inherit;
    background: white;
    border-top: 3px solid $theme;
    z-index: 10;
    //border-right: 1px solid $theme;
    //border-left: 1px solid $theme;
    color: $text-alt;
    .top-text {
      display: inherit;
      padding: 0 1rem;
      span {
        display: inherit;
        margin: 5px;
      }
    }
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
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-top: none;
    min-height: 20vh;
    max-width: calc(250px - 2rem);
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 4px;
    //margin-top: 3rem;
    background-color: white;
    color: $text-alt;
    //border: 1px solid rgba($color: #000000, $alpha: 0.2);
    -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    padding-bottom: 5px;
  }
  ::v-deep .tree-anchor {
    span {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.sidebar.sidebarClose {
  min-width: 1rem;
  margin: 0;
  padding: 0;
  background-color: $theme;
  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1999;
  .sidebar-list {
    margin: 2px;
  }
  .menu {
    margin: 0;
    padding: 3px;
    font-size: 13px;
    font-weight: bold;
    background-color: $theme;
    color: $text;
    -ms-writing-mode: tb-rl;
    writing-mode: tb-rl;
  }
}
.position-absolute {
  right: 10px;
}
.fa-times {
  font-size: 1rem;
}
</style>
