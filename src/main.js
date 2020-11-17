import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import VueJWT from "vuejs-jwt";
import DataTable from "laravel-vue-datatable";
import RouterTab from "vue-router-tab";
import "vue-router-tab/dist/lib/vue-router-tab.css";

Vue.config.productionTip = false;

Vue.use(VueJWT, { ignoreNotBefore: true, keyName: "token" });

Vue.use(DataTable);

Vue.use(RouterTab);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
