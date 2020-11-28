<template>
  <div id="app">
    <NavBarC
      v-if="
        this.$router.currentRoute.name !== 'login' &&
          this.$store.state.isAuthenticated === true &&
          this.$store.getters['getLevelId'] <= 3
      "
    />
    <NavBarL
      v-if="
        this.$router.currentRoute.name !== 'login' &&
          this.$store.state.isAuthenticated === true &&
          this.$store.getters['getLevelId'] > 3
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
import NavBarC from "@/components/NavBarC.vue";
import NavBarL from "@/components/NavBarL.vue";
import SideBar from "@/components/SideBar.vue";
import Sesi from "../src/components/AuthorizationExpired.vue";
import LoginConfirmed from "./components/Admin/LoginConfirmation.vue";
// import Api from "./api";
import store from "./store";

export default {
  name: "Home",
  components: {
    NavBarC,
    NavBarL,
    SideBar,
    LoginConfirmed,
    Sesi
  },
  // created() {
  //   let self = this;
  //   window.addEventListener("beforeunload", self.handler);
  // },
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
        if (akses === "0") {
          store.commit("sideBarChange");
        }
        // try {
        //   var storedTab = JSON.parse(localStorage.getItem("tabState"));
        //   self.$router.push({ name: storedTab[0].name });
        // } catch {
        //   self.$router.push("/");
        // }
        store.commit("authenChange");
        self.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss">
@import "../src/style/main.scss";
</style>
