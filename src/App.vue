<template>
  <div id="app">
    <!--    <NavBar-->
    <!--      v-if="-->
    <!--        this.$router.currentRoute.name !== 'login' &&-->
    <!--          this.$store.state.isAuthenticated === true-->
    <!--      "-->
    <!--    />-->
    <!--    <SideBar-->
    <!--      v-if="-->
    <!--        this.$router.currentRoute.name !== 'login' &&-->
    <!--          this.$store.state.isAuthenticated === true-->
    <!--      "-->
    <!--    />-->
    <!--    <LoginConfirmed-->
    <!--      v-if="-->
    <!--        this.$router.currentRoute.name !== 'login' &&-->
    <!--          this.$store.state.isAuthenticated === true &&-->
    <!--          this.$store.state.isLoginConfirmed === true-->
    <!--      "-->
    <!--    />-->
    <!--    <Sesi v-if="this.$store.state.isExpired === true" />-->
    <!-- <Tab v-if="this.$router.currentRoute.name !== 'login'" /> -->
    <router-view />
  </div>
</template>

<script>
// import NavBar from "@/components/NavBar.vue";
// import SideBar from "@/components/SideBar.vue";
// import Sesi from "../src/components/AuthorizationExpired.vue";
// import LoginConfirmed from "./components/Admin/LoginConfirmation.vue";
// import Api from "./api";
import store from "./store";

export default {
  name: "Home",
  components: {
    // NavBar,
    // SideBar,
    // LoginConfirmed,
    // Sesi
  },
  mounted() {
    this.handler();
  },
  methods: {
    handler() {
      if (localStorage.token) {
        const secretKey =
          "TtGYMF5mRwzAPEJKQ7eYDB0mAQnbdW4ijXBmZMHvpAy5a78dQ4z2lzDDF65uEhQ1";
        const jwtDecode = this.$jwt.decode(
          localStorage.getItem("token"),
          secretKey
        );
        let username = jwtDecode.username;
        let fullname = jwtDecode.fullname;
        let levelid = jwtDecode.levelid;
        let id = jwtDecode.sub;
        let akses = jwtDecode.akses;
        store.commit("setLogin", { username, fullname, levelid, id, akses });
        // let sidebarstate = sessionStorage.getItem(
        //   "sidebar" + ":" + username + ":" + akses
        // );
        // if (!sidebarstate && akses === "0") {
        //   store.commit("sideBarChange");
        // }
        // if (sidebarstate === "true") {
        //   store.commit("sideBarChange");
        // }
        // if (akses === "0") {
        //   store.commit("sideBarChange");
        // }
        store.commit("authenChange");
        let tabs = sessionStorage.getItem("tab" + ":" + username + ":" + akses);
        // let re = new RegExp("(siska/pdf/)\\w+");
        // console.log(re);
        if (tabs === null) {
          this.$router.push("/");
        } else {
          this.$router.push(tabs);
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "assets/styles/main.scss";
</style>
