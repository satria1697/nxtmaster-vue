<template>
  <div id="app">
    <NavBar v-if="this.$router.currentRoute.name !== 'login'" />
    <SideBar v-if="this.$router.currentRoute.name !== 'login'" />
    <Sesi v-if="this.$store.state.isExpired === true" />
    <Tab v-if="this.$router.currentRoute.name !== 'login'" />
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import Tab from "@/components/Tab.vue";
import Sesi from "../src/components/AuthorizationExpired.vue";
// import Api from "./api";
import store from "./store";

export default {
  name: "Home",
  components: {
    NavBar,
    SideBar,
    Tab,
    Sesi
  },
  mounted() {
    if (localStorage.token) {
      let self = this;
      console.log('login');
      store.commit("authenChange");
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
      store.commit("setLogin", { username, fullname, levelid, id });
      try {
        var storedTab = JSON.parse(localStorage.getItem("tabState"));
        self.$router.push({ name: storedTab[0].name });
      } catch {
        self.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss">
@import "../src/style/main.scss";
</style>
