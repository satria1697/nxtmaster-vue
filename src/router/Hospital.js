const importPage = view => () =>
  import(/* webpackChunkName: "p-[request]" */ `../views/Hospital/${view}.vue`);

const HospitalPath = [
  {
    path: "/hospital/perawat",
    name: "dataperawat",
    component: importPage("DataPerawat"),
    meta: {
      requireAuth: true,
      title: "Data Perawat"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/hospital/spesialisasi",
    // name: "dataperawat",
    component: importPage("DataSpesialisasi"),
    meta: {
      requireAuth: true,
      title: "Data Spesialisasi"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/hospital/dokter",
    // name: "dataperawat",
    component: importPage("DataDokter"),
    meta: {
      requireAuth: true,
      title: "Data Dokter"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/hospital/pasien",
    // name: "dataperawat",
    component: importPage("DataPasien"),
    meta: {
      requireAuth: true,
      title: "Data Pasien"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/hospital/kelasrawatinap",
    // name: "dataperawat",
    component: importPage("DataKelasrawatinap"),
    meta: {
      requireAuth: true,
      title: "Data Kelas Rawat Inap"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/hospital/bangsal",
    // name: "dataperawat",
    component: importPage("DataBangsal"),
    meta: {
      requireAuth: true,
      title: "Data Bangsal"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/hospital/kamarrawatinap",
    // name: "dataperawat",
    component: importPage("DataKamarrawatinap"),
    meta: {
      requireAuth: true,
      title: "Data Kamar Rawat Inap"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/hospital/rawatinap",
    // name: "dataperawat",
    component: importPage("DataRawatinap"),
    meta: {
      requireAuth: true,
      title: "Data Rawat Inap"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/hospital/jenistenagamedis",
    component: importPage("DataJenisTenagaMedis"),
    meta: {
      requireAuth: true,
      title: "Data Jenis Tenaga Medis"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  },
  {
    path: "/hospital/tenagamedis",
    component: importPage("DataTenagaMedis"),
    meta: {
      requireAuth: true,
      title: "Data Tenaga Medis"
      // icon: "fas fa-user-friends"
      // closable: false
    }
  }
];

export default HospitalPath;
