import Vue from "vue";
import VueRouter from "vue-router";

import NotFound from "../views/notfound.vue";

import store from "../store";

import { RouterTabRoutes } from "vue-router-tab";
import Frame from "../components/Frame";
import Home from "../views/Home";
import DataUser from "../views/Admin/DataUser";
import DataLevel from "../views/Admin/DataLevel";
import DataRank from "../views/Admin/DataRank";
import DataStructure from "../views/Admin/DataStructure";
import DataStructureLevel from "../views/Admin/DataStructureLevel";
import DataAplikasi from "../views/Admin/DataAplikasi";
import DataModul from "../views/Admin/DataModul";
import DataAkses from "../views/Admin/DataAkses";
import DataAksesManager from "../views/Admin/DataAksesManager";
import Umum from "../views/Admin/Umum";
import Profile from "../views/Admin/Profile";
import LoginView from "../views/LoginView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Frame,
    children: [
      ...RouterTabRoutes,
      {
        path: "/",
        name: "Home",
        component: Home,
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
        component: DataUser,
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
        component: DataLevel,
        meta: {
          requireAuth: true,
          title: "Manajemen Level",
          icon: "fas fa-users-cog"
        }
      },
      {
        path: "/admin/datarank",
        name: "datarank",
        component: DataRank,
        meta: {
          requireAuth: true,
          title: "Manajemen Pangkat",
          icon: "fas fa-map-marker-alt"
        }
      },
      {
        path: "/admin/datastructure",
        name: "datastructure",
        component: DataStructure,
        meta: {
          requireAuth: true,
          title: "Manajemen Struktur Organisasi",
          icon: "fas fa-network-wired"
        }
      },
      {
        path: "/admin/datastructurelevel",
        name: "datastructurelevel",
        component: DataStructureLevel,
        meta: {
          requireAuth: true,
          title: "Manajemen Struktur Level",
          icon: "fas fa-project-diagram"
        }
      },
      {
        path: "/admin/dataaplikasi",
        name: "dataaplikasi",
        component: DataAplikasi,
        meta: {
          requireAuth: true,
          title: "Manajemen Aplikasi",
          icon: "fas fa-th"
        }
      },
      {
        path: "/admin/datamodul",
        name: "datamodul",
        component: DataModul,
        meta: {
          requireAuth: true,
          title: "Manajemen Modul",
          icon: "fas fa-box-open"
        }
      },
      {
        path: "/admin/dataakses",
        name: "dataakses",
        component: DataAkses,
        meta: {
          requireAuth: true,
          title: "Hak Akses",
          icon: "fas fa-puzzle-piece"
        }
      },
      {
        path: "/admin/dataaksesmanager",
        name: "dataaksesmanager",
        component: DataAksesManager,
        meta: {
          requireAuth: true,
          title: "Manajemen Data Akses",
          icon: "fas fa-universal-access"
        }
      },
      {
        path: "admin/umum",
        name: "umum",
        component: Umum,
        meta: {
          requireAuth: true,
          title: "Manajemen Umum",
          icon: "fas fa-info"
        }
      },
      {
        path: "admin/profile",
        name: "profile",
        component: Profile,
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
    component: LoginView
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
