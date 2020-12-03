<template>
  <vue-navigation-bar
    :options="navbarOptions"
    @vnb-item-clicked="navBarMethods"
  />
</template>

<script>
import api from "../api";
import store from "../store";

function navbarOptionRightAkses() {
  if (store.getters["getLevelId"] <= 3) {
    return {
      type: "link",
      iconLeft: '<i class="fas fa-cogs fa-2x"></i>',
      arrowColor: "#ffffff",
      subMenuOptions: [
        {
          type: "link",
          text: "Umum",
          path: { name: "umum" },
          iconLeft: '<i class="fa fa-star fa-fw"></i>'
        },
        {
          type: "hr"
        },
        {
          type: "link",
          text: "Hak Akses",
          path: { name: "dataakses" },
          iconLeft: '<i class="fas fa-puzzle-piece"></i>'
        },
        {
          type: "link",
          text: "Pengaturan Akses",
          path: { name: "dataaksesmanager" },
          iconLeft: '<i class="fas fa-universal-access"></i>'
        },
        {
          type: "hr"
        },
        {
          type: "link",
          text: "Data Aplikasi",
          path: { name: "dataaplikasi" },
          iconLeft: '<i class="fas fa-th"></i>'
        },
        {
          type: "link",
          text: "Data Modul",
          path: { name: "datamodul" },
          iconLeft: '<i class="fas fa-box-open"></i>'
        }
        // {
        //   type: "link",
        //   text: "Api Klien",
        //   path: { name: "dataapiklien" },
        //   iconLeft: '<i class="fas fa-box"></i>'
        // }
      ]
    };
  } else {
    return {};
  }
}
function navbarOptionRightUser() {
  if (store.getters["getLevelId"] <= 3) {
    return {
      type: "link",
      iconLeft: '<i class="fas fa-users fa-2x"></i>',
      arrowColor: "#ffffff",
      subMenuOptions: [
        {
          type: "link",
          text: "Data Pengguna",
          path: { name: "datauser" },
          iconLeft: '<i class="fas fa-user-friends"></i>'
        },
        {
          type: "hr"
        },
        {
          type: "link",
          text: "Tingkatan Pengguna",
          path: { name: "datalevel" },
          iconLeft: '<i class="fas fa-users-cog"></i>'
        },
        {
          type: "link",
          text: "Pangkat dan Golongan",
          path: { name: "datarank" },
          iconLeft: '<i class="fas fa-map-marker-alt"></i>'
        },
        {
          type: "hr"
        },
        {
          type: "link",
          text: "Struktur Organisasi",
          path: { name: "datastructure" },
          iconLeft: '<i class="fas fa-network-wired"></i>'
        },
        {
          type: "link",
          text: "Tingkatan Struktural",
          path: { name: "datastructurelevel" },
          iconLeft: '<i class="fas fa-project-diagram"></i>'
        }
      ]
    };
  } else {
    return {};
  }
}

export default {
  data() {
    // let self = this;
    return {
      navbarOptions: {
        elemendId: "main-navbar",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImage: require("@/assets/image/logo/nxtoffice-light.png"),
        brandImageAltText: "brand-image",
        collapseButtonOpenColor: "#ffffff",
        collapseButtonCloseColor: "#ffffff",
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away",
        tooltipPlacement: "bottom",
        menuOptionsRight: [
          navbarOptionRightAkses(),
          navbarOptionRightUser(),
          {
            type: "link",
            iconLeft: '<i class="fas fa-info-circle fa-2x"></i>',
            arrowColor: "#ffffff",
            subMenuOptions: [
              {
                isLinkAction: true,
                type: "link",
                text: "Developed By",
                path: { name: "home" },
                subText: "Wish Enterprise"
              }
            ]
          },
          {
            type: "link",
            iconLeft: '<i class="fas fa-user-circle fa-2x"></i>',
            arrowColor: "#ffffff",
            subMenuOptions: [
              {
                type: "link",
                text: store.getters["getFullname"],
                path: { name: "profile" }
              },
              {
                isLinkAction: true,
                type: "link",
                text: "Logout",
                path: { name: "home" },
                iconLeft: '<i class="fas fa-sign-out-alt"></i>'
              }
            ]
          }
        ]
      },
      avatar: "",
      username: ""
    };
  },
  mounted() {
    // let self = this;
    // console.log(navbarOptionRightUser());
  },
  methods: {
    navBarMethods(payload) {
      let self = this;
      if (payload === "Logout") {
        api.auth
          .logout()
          .then(resp => {
            if (resp.data.status === "success") {
              store.commit("authenChange");
              if (store.state.isAuthenticated === false) {
                self.$tabs.saveTabs();
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
                self.$router.push("/login");
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (payload === "Developed By") {
        console.log(payload);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/abstracts/_variables";
nav {
  position: sticky;
  top: 0;
}
.vnb {
  z-index: 110;
  background: $theme-bg;
  padding: 2px 0;
  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  // box-shadow: 0px 0px 10px #000000;
  ::v-deep .vnb__menu-options__option {
    margin: 0;
    &__link {
      color: $text-theme;
    }
  }
  ::v-deep .vnb__sub-menu-options {
    padding: 0;
    &__option__link {
      padding: 0 0 0 5px;
    }
  }
}
</style>
