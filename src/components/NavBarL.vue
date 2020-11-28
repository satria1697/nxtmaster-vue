<template>
  <vue-navigation-bar
    :options="navbarOptions"
    @vnb-item-clicked="navBarMethods"
  />
</template>

<script>
import api from "../api";
import store from "../store";

export default {
  data() {
    // let self = this;
    return {
      navbarOptions: {
        elemendId: "main-navbar",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImage: require("@/assets/logo.png"),
        brandImageAltText: "brand-image",
        collapseButtonOpenColor: "#ffffff",
        collapseButtonCloseColor: "#ffffff",
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away",
        tooltipPlacement: "bottom",
        menuOptionsRight: [
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
  created() {
    // let self = this;
    // if (store.state.isAuthenticated === true) {
    //   // self.getUsername();
    // }
  },
  methods: {
    // getUsername() {
    //   let self = this;
    //   self.username = store.getters["getUsername"];
    // },
    navBarMethods(payload) {
      if (payload === "Sidebar") {
        store.commit("sideBarChange");
      }
      if (payload === "Logout") {
        let self = this;
        api.auth
          .logout()
          .then(resp => {
            if (resp.data.status === "success") {
              store.commit("authenChange");
              if (store.state.isAuthenticated === false) {
                // store.commit("emptyTab");
                // if (localStorage.tabState + ":" + store.getters["getUsername"]) {
                //   localStorage.removeItem(
                //     "tabState" + ":" + store.getters["getUsername"]
                //   );
                // }
                // localStorage.setItem(
                //   "tabState" + ":" + store.getters["getUsername"],
                //   this.$tab.routerTab.ActiveTab
                // );
                store.commit("setToken", "");
                localStorage.removeItem("token");
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
  /deep/ .vnb__menu-options__option {
    margin: 0;
    &__link {
      color: $text-theme;
    }
  }
  /deep/ .vnb__sub-menu-options {
    padding: 0;
    &__option__link {
      padding: 0 0 0 5px;
    }
  }
}
</style>
