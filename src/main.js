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

// import SlVueTree from "sl-vue-tree";
// import "sl-vue-tree/src/sl-vue-tree-minimal.css";

Vue.config.productionTip = false;

Vue.use(VueJWT, { ignoreNotBefore: true, keyName: "token" });

Vue.use(DataTable);

Vue.use(RouterTab);

Vue.component("vue-navigation-bar", VueNavigationBar);

// Vue.component("sl-vue-tree", SlVueTree);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
