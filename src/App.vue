<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import loginMixin from "./mixins/loginMixin";

export default {
  name: "Home",
  mixins: [loginMixin],
  mounted() {
    this.loginHandler();
  }
};
</script>

<style lang="scss">
@import "assets/styles/main.scss";
</style>
