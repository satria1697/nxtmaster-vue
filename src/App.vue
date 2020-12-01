<template>
  <div id="app">
    <NavBar
      v-if="
        this.$router.currentRoute.name !== 'login' &&
          this.$store.state.isAuthenticated === true
      "
    />
    <SideBar
      v-if="
        this.$router.currentRoute.name !== 'login' &&
          this.$store.state.isAuthenticated === true
      "
    />
    <LoginConfirmed
      v-if="
        this.$router.currentRoute.name !== 'login' &&
          this.$store.state.isAuthenticated === true &&
          this.$store.state.isLoginConfirmed === true
      "
    />
    <Sesi v-if="this.$store.state.isExpired === true" />
    <!-- <Tab v-if="this.$router.currentRoute.name !== 'login'" /> -->
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import Sesi from "../src/components/AuthorizationExpired.vue";
import LoginConfirmed from "./components/Admin/LoginConfirmation.vue";
// import Api from "./api";
import store from "./store";

export default {
  name: "Home",
  components: {
    NavBar,
    SideBar,
    LoginConfirmed,
    Sesi
  },
  mounted() {
    let self = this;
    self.handler();
  },
  methods: {
    handler() {
      let self = this;
      if (localStorage.token) {
        const secretKey =
          "TtGYMF5mRwzAPEJKQ7eYDB0mAQnbdW4ijXBmZMHvpAy5a78dQ4z2lzDDF65uEhQ1";
        const jwtDecode = self.$jwt.decode(
          localStorage.getItem("token"),
          secretKey
        );
        let username = jwtDecode.username;
        let fullname = jwtDecode.fullname;
        let levelid = jwtDecode.levelid;
        let id = jwtDecode.sub;
        let akses = jwtDecode.akses;
        store.commit("setLogin", { username, fullname, levelid, id, akses });
        if (
          sessionStorage.getItem("sidebar" + ":" + username + ":" + akses) ===
          true
        ) {
          store.commit("sideBarChange");
        } else if (akses === "0") {
          store.commit("sideBarChange");
        }
        store.commit("authenChange");
        let tabs = sessionStorage.getItem("tab" + ":" + username + ":" + akses);
        if (tabs === null) {
          self.$router.push("/");
        } else {
          self.$router.push(tabs);
        }
      }
    }
  },
  // watch: {
  //   "$route.path": {
  //     function() {
  //       let self = this;
  //       console.log(self.$route.path);
  //       // if (self.activetabto) {
  //       //   localStorage.setItem(
  //       //     "tab" +
  //       //       ":" +
  //       //       store.getters["getUsername"] +
  //       //       ":" +
  //       //       store.getters["getAkses"],
  //       //     self.$tabs.activeTab.to
  //       //   );
  //       // }
  //     },
  //     deep: true
  //   }
  // }
};
</script>

<style lang="scss">
@import "../src/style/main.scss";
</style>
