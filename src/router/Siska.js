const importPage = view => () =>
  import(/* webpackChunkName: "p-[request]" */ `../views/${view}.vue`);

const SiskaPath = [
  {
    path: "/siska/status",
    // name: "dataperawat",
    component: importPage("Siska/DataStatus"),
    meta: {
      requireAuth: true,
      title: "Status Siska"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/siska/formulir",
    // name: "dataperawat",
    component: importPage("Siska/DataFormulir"),
    meta: {
      requireAuth: true,
      title: "Jenis Formulir Siska"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/siska/formulirdata",
    // name: "dataperawat",
    component: importPage("Siska/DataFormulirData"),
    meta: {
      requireAuth: true,
      title: "Pembuatan Formulir Siska"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/siska/analisisrawatinap",
    // name: "dataperawat",
    component: importPage("Siska/DataAnalisisrawatinap"),
    meta: {
      requireAuth: true,
      title: "Analisis"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  }
];

export default SiskaPath;
