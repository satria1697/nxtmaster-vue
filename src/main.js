import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import VueJWT from "vuejs-jwt";
import DataTable from "laravel-vue-datatable";

Vue.config.productionTip = false;

Vue.use(VueJWT);

Vue.use(DataTable);
// Vue.component('datatable', require('./components/DataTable').default);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
