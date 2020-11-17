<template>
  <div class="main" :class="{ closeSideMain: this.$store.state.isSideBar }">
    <div class="app-body">
      <router-tab
        lang="en"
        class="tab-custom-class"
        :max-alive="10"
        :restore="this.$store.getters['getUsername']"
        restore-watch
      />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/style/abstracts/_variables";
.app-body {
  margin: 15px 15px 0 15px;
}
.tab-custom-class {
  // font-size: 13px !important;
  /deep/ .router-tab__header {
    margin: 0 5px;
  }
  /deep/ .router-tab__item {
    margin: 0 3px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    border-right: 1px solid rgba(0, 0, 0, 0.4);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-left: 1px solid rgba(0, 0, 0, 0.4);
    background-color: rgba($color: black, $alpha: 0.2);
    font-size: 13px;
    &:first-child {
      border-left: 1px solid rgba(0, 0, 0, 0.4);
    }
    &:hover {
      color: $theme-alt;
    }
  }
  /deep/ .router-tab__item.is-active {
    background-color: white;
    padding-bottom: 1px;
    z-index: 10;
    color: $theme;
    &:hover {
      color: $theme-alt;
    }
  }
  /deep/ .router-tab__container {
    border-right: 1px solid rgba(0, 0, 0, 0.4);
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    border-left: 1px solid rgba(0, 0, 0, 0.4);
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    margin-top: -1px;
  }
}
</style>
