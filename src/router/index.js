import Vue from "vue";
import VueRouter from "vue-router";

import NotFound from "../views/notfound.vue";

import store from "../store";

import { RouterTabRoutes } from "vue-router-tab";
import Frame from "../components/Frame";

Vue.use(VueRouter);

const importPage = view => () =>
  import(/* webpackChunkName: "p-[request]" */ `../views/${view}.vue`);

const routes = [
  {
    path: "/",
    component: Frame,
    children: [
      ...RouterTabRoutes,
      {
        path: "/",
        name: "Home",
        component: importPage("Home"),
        meta: {
          requireAuth: true,
          title: "Home",
          icon: "fas fa-home",
          closable: false
        }
      },
      {
        path: "/admin/datauser",
        name: "datauser",
        component: importPage("Admin/DataUser"),
        meta: {
          requireAuth: true,
          title: "Manajemen Pengguna",
          icon: "fas fa-user-friends"
          // closable: false
        }
      },
      {
        path: "/admin/datalevel",
        name: "datalevel",
        component: importPage("Admin/User/DataLevel"),
        meta: {
          requireAuth: true,
          title: "Manajemen Level",
          icon: "fas fa-users-cog"
        }
      },
      {
        path: "/admin/datarank",
        name: "datarank",
        component: importPage("Admin/User/DataRank"),
        meta: {
          requireAuth: true,
          title: "Manajemen Pangkat",
          icon: "fas fa-map-marker-alt"
        }
      },
      {
        path: "/admin/datastructure",
        name: "datastructure",
        component: importPage("Admin/User/DataStructure"),
        meta: {
          requireAuth: true,
          title: "Manajemen Struktur Organisasi",
          icon: "fas fa-network-wired"
        }
      },
      {
        path: "/admin/datastructurelevel",
        name: "datastructurelevel",
        component: importPage("Admin/User/DataStructureLevel"),
        meta: {
          requireAuth: true,
          title: "Manajemen Struktur Level",
          icon: "fas fa-project-diagram"
        }
      },
      {
        path: "/admin/dataaplikasi",
        name: "dataaplikasi",
        component: importPage("Admin/User/DataAplikasi"),
        meta: {
          requireAuth: true,
          title: "Manajemen Aplikasi",
          icon: "fas fa-th"
        }
      },
      {
        path: "/admin/datamodul",
        name: "datamodul",
        component: importPage("Admin/User/DataModul"),
        meta: {
          requireAuth: true,
          title: "Manajemen Modul",
          icon: "fas fa-box-open"
        }
      },
      {
        path: "/admin/dataakses",
        name: "dataakses",
        component: importPage("Admin/User/DataAkses"),
        meta: {
          requireAuth: true,
          title: "Hak Akses",
          icon: "fas fa-puzzle-piece"
        }
      },
      {
        path: "/admin/dataaksesmanager",
        name: "dataaksesmanager",
        component: importPage("Admin/User/DataAksesManager"),
        meta: {
          requireAuth: true,
          title: "Manajemen Data Akses",
          icon: "fas fa-universal-access"
        }
      },
      {
        path: "admin/umum",
        name: "umum",
        component: importPage("Admin/User/Umum"),
        meta: {
          requireAuth: true,
          title: "Manajemen Umum",
          icon: "fas fa-house-damage"
        }
      },
      {
        path: "admin/profile",
        name: "profile",
        component: importPage("Admin/User/Profile"),
        meta: {
          requireAuth: true,
          title: "Profil",
          icon: "fa fa-user-circle"
        }
      },
      {
        path: "/404",
        name: "NotFound",
        component: NotFound,
        meta: {
          title: "Not Found",
          icon: "fas fa-exclamation-triangle"
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: importPage("LoginView")
  },
  {
    path: "*",
    name: "*",
    redirect: { name: "NotFound" }
    // component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  // let self = this;
  if (to.meta.requireAuth) {
    if (store.state.isAuthenticated === false) {
      next("/login");
    } else {
      sessionStorage.setItem(
        "tab" +
          ":" +
          store.getters["getUsername"] +
          ":" +
          store.getters["getAkses"],
        to.path
      );
      next();
    }
  } else next();
});

export default router;
