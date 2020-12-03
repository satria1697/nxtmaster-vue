<template>
  <div class="main" :class="{ closeSideMain: this.$store.state.isSideBar }">
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
</template>

<script>
// import store from "../store";
export default {
  data() {
    return {
      tabs: ["/"]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/abstracts/_variables";
.app-body {
  margin: 11px 15px 0 15px;
}
.router-tab {
  // min-height: 200px;
  ::v-deep .router-tab__header {
    margin: 0 5px;
    height: 25px;
    z-index: 1;
    border-bottom: none;
    .router-tab__scroll {
      height: 25px;
      position: absolute;
      top: 1px;
    }
  }
  ::v-deep .router-tab__item {
    margin: 0 1px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #dcdcdc;
    color: $text-theme-alt;
    font-size: 12px;
    line-height: 1.2em;
    padding: 0 5px;
    &:first-child {
      border-left: 1px solid rgba(0, 0, 0, 0.2);
    }
    &:hover {
      color: $theme;
    }
    &-title {
      margin: 0;
    }
    &-icon {
      font-size: 12px;
    }
  }
  ::v-deep .router-tab__item.is-active {
    background-color: $theme-bg-detail;
    z-index: 11;
    color: $theme;
    border-bottom: none;
    font-weight: 700;
    &:hover {
      color: $theme-alt;
    }
  }
  ::v-deep .router-tab__container {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }
  ::v-deep .page-fade {
    &-enter-active {
      transition-duration: 0.3s;
      transition-property: opacity;
    }
    &-enter {
      opacity: 0;
    }
  }
}
</style>
