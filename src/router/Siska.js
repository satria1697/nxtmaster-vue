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
  },
  {
    path: "/siska/laporan",
    // name: "dataperawat",
    component: importPage("Siska/LaporanKLPCM"),
    meta: {
      requireAuth: true,
      title: "Laporan"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/siska/laporankelengkapan",
    // name: "dataperawat",
    component: importPage("Siska/LaporanKelengkapan"),
    meta: {
      requireAuth: true,
      title: "Laporan Kelengkapan"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/siska/laporanmutu",
    // name: "dataperawat",
    component: importPage("Siska/LaporanMutu"),
    meta: {
      requireAuth: true,
      title: "Laporan Mutu"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/siska/statuskelengkapan",
    // name: "pdf/laporanmutu",
    component: importPage("Siska/DataStatusKelengkapan"),
    meta: {
      requireAuth: true,
      title: "Status Kelengkapan"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  }
];

export default SiskaPath;
