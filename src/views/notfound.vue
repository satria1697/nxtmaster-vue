<template>
  <div
    class="detail"
    :class="{ closeSideMain: this.$store.state.sideBarClose }"
  >
    <div class="row align-items-center justify-content-center">
      <h1 class="display-1">Page not Found</h1>
    </div>
    <div class="row align-items-center justify-content-center">
      <h1 class="display-4">404</h1>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  mounted() {
    let self = this;
    self.init();
  },
  methods: {
    init() {
      let self = this;
      self.openTab(self.$route.name, "Not Found");
    },
    openTab(name, label) {
      let exists = false;
      let tabState = store.state.tabState;
      let isZero = tabState.length === 0;
      if (!isZero) {
        exists = tabState.some(tab => tab.name === name);
      }
      if (!exists) {
        if (tabState.length > 4) {
          console.log("tidak bisa menambah lebih dari 5");
          store.commit("closeTab", 5);
        } else {
          store.commit("openTab", { name, label });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
