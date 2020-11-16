import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/LoginView.vue";
import Home from "../views/Home.vue";
import DataUser from "../views/Admin/DataUser.vue";
import DataLevel from "../views/Admin/User/DataLevel.vue";
import DataStructure from "../views/Admin/User/DataStructure.vue";
import DataStructureLevel from "../views/Admin/User/DataStructureLevel.vue";
import DataRank from "../views/Admin/User/DataRank.vue";
import DataAplikasi from "../views/Admin/User/DataAplikasi.vue";
import DataModul from "../views/Admin/User/DataModul.vue";
import DataAkses from "../views/Admin/User/DataAkses.vue";
import DataAksesManager from "../views/Admin/User/DataAksesManager.vue";

import NotFound from "../views/notfound.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requireAuth: true }
  },
  {
    path: "/admin/datauser",
    name: "datauser",
    component: DataUser,
    meta: { requireAuth: true }
  },
  {
    path: "/admin/datalevel",
    name: "datalevel",
    component: DataLevel,
    meta: { requireAuth: true }
  },
  {
    path: "/admin/datarank",
    name: "datarank",
    component: DataRank,
    meta: { requireAuth: true }
  },
  {
    path: "/admin/datastructure",
    name: "datastructure",
    component: DataStructure,
    meta: { requireAuth: true }
  },
  {
    path: "/admin/datastructurelevel",
    name: "datastructurelevel",
    component: DataStructureLevel,
    meta: { requireAuth: true }
  },
  {
    path: "/admin/dataaplikasi",
    name: "dataaplikasi",
    component: DataAplikasi,
    meta: { requireAuth: true }
  },
  {
    path: "/admin/datamodul",
    name: "datamodul",
    component: DataModul,
    meta: { requireAuth: true }
  },
  {
    path: "/admin/dataakses",
    name: "dataakses",
    component: DataAkses,
    meta: { requireAuth: true }
  },
  {
    path: "/admin/dataaksesmanager",
    name: "dataaksesmanager",
    component: DataAksesManager,
    meta: { requireAuth: true }
  },
  {
    path: "*",
    redirect: "/404"
  },
  {
    path: "/404",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.isAuthenticated === false) {
      next("/login");
    } else {
      next();
    }
  } else next();
});

export default router;
