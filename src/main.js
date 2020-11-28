import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";

import VueJWT from "vuejs-jwt";

import DataTable from "laravel-vue-datatable";

import RouterTab from "vue-router-tab";
import "vue-router-tab/dist/lib/vue-router-tab.css";

import VueNavigationBar from "vue-navigation-bar";
import "vue-navigation-bar/dist/vue-navigation-bar.css";

import Vue2OrgTree from "vue2-org-tree";

import VueNestable from "vue-nestable";

import VueListPicker from "vue-list-picker";
// import "vue-org-tree/styles/org-tree.less";

Vue.config.productionTip = false;

Vue.use(VueJWT, { ignoreNotBefore: true, keyName: "token" });

Vue.use(DataTable);

Vue.use(RouterTab);

Vue.use(Vue2OrgTree);

Vue.component("vue-navigation-bar", VueNavigationBar);

Vue.use(VueNestable);

Vue.use(VueListPicker);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
