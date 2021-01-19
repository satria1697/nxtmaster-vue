import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import VueJWT from "vuejs-jwt";

import DataTable from "laravel-vue-datatable";

import RouterTab from "vue-router-tab";
import "vue-router-tab/dist/lib/vue-router-tab.css";

import VueNavigationBar from "vue-navigation-bar";
import "vue-navigation-bar/dist/vue-navigation-bar.css";

import Vue2OrgTree from "vue2-org-tree";

import VueListPicker from "vue-list-picker";

import VueStripeMenu from "vue-stripe-menu";
import "vue-stripe-menu/dist/vue-stripe-menu.css";

import UserModal from "./components/UserModal.vue";
import DeleteModal from "./components/DeleteConfirmation";

import vSelect from "vue-select";
Vue.component("v-select", vSelect);

Vue.config.productionTip = false;

Vue.use(VueJWT, { ignoreNotBefore: true, keyName: "token" });

Vue.use(DataTable);

Vue.use(RouterTab);

Vue.use(Vue2OrgTree);

Vue.component("vue-navigation-bar", VueNavigationBar);

Vue.use(VueStripeMenu);

Vue.use(VueListPicker);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.component("user-modal", UserModal);
Vue.component("delete-modal", DeleteModal);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
