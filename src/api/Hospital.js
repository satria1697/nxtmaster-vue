import Axios from "axios";

const api = {
  agama: {
    Get: "/api/hospital/agama/data",
    GetId: "/api/hospital/agama/{id}",
    Register: "/api/hospital/agama/register",
    Update: "/api/hospital/agama/update/{id}",
    Delete: "/api/hospital/agama/delete/{id}"
  },
  bangsal: {
    Get: "/api/hospital/bangsal/data",
    GetId: "/api/hospital/bangsal/{id}",
    Register: "/api/hospital/bangsal/register",
    Update: "/api/hospital/bangsal/update/{id}",
    Delete: "/api/hospital/bangsal/delete/{id}"
  },
  diagnosisrawatinap: {
    Get: "/api/hospital/diagnosisrawatinap/data",
    GetId: "/api/hospital/diagnosisrawatinap/{id}",
    Register: "/api/hospital/diagnosisrawatinap/register",
    Update: "/api/hospital/diagnosisrawatinap/update/{id}",
    Delete: "/api/hospital/diagnosisrawatinap/delete/{id}"
  },
  dokter: {
    Get: "/api/hospital/dokter/data",
    GetId: "/api/hospital/dokter/{id}",
    Register: "/api/hospital/dokter/register",
    Update: "/api/hospital/dokter/update/{id}",
    Delete: "/api/hospital/dokter/delete/{id}"
  },
  icd10: {
    Get: "/api/hospital/icd10/data",
    GetId: "/api/hospital/icd10/{id}",
    Register: "/api/hospital/icd10/register",
    Update: "/api/hospital/icd10/update/{id}",
    Delete: "/api/hospital/icd10/delete/{id}"
  },
  kamarrawatinap: {
    Get: "/api/hospital/kamarrawatinap/data",
    GetId: "/api/hospital/kamarrawatinap/{id}",
    Register: "/api/hospital/kamarrawatinap/register",
    Update: "/api/hospital/kamarrawatinap/update/{id}",
    Delete: "/api/hospital/kamarrawatinap/delete/{id}"
  },
  kelasrawatinap: {
    Get: "/api/hospital/kelasrawatinap/data",
    GetId: "/api/hospital/kelasrawatinap/{id}",
    Register: "/api/hospital/kelasrawatinap/register",
    Update: "/api/hospital/kelasrawatinap/update/{id}",
    Delete: "/api/hospital/kelasrawatinap/delete/{id}"
  },
  pasien: {
    Get: "/api/hospital/pasien/data",
    GetId: "/api/hospital/pasien/{id}",
    Register: "/api/hospital/pasien/register",
    Update: "/api/hospital/pasien/update/{id}",
    Delete: "/api/hospital/pasien/delete/{id}"
  },
  pekerjaan: {
    Get: "/api/hospital/pekerjaan/data",
    GetId: "/api/hospital/pekerjaan/{id}",
    Register: "/api/hospital/pekerjaan/register",
    Update: "/api/hospital/pekerjaan/update/{id}",
    Delete: "/api/hospital/pekerjaan/delete/{id}"
  },
  pendidikan: {
    Get: "/api/hospital/pendidikan/data",
    GetId: "/api/hospital/pendidikan/{id}",
    Register: "/api/hospital/pendidikan/register",
    Update: "/api/hospital/pendidikan/update/{id}",
    Delete: "/api/hospital/pendidikan/delete/{id}"
  },
  perawat: {
    Get: "/api/hospital/perawat/data",
    GetId: "/api/hospital/perawat/{id}",
    Register: "/api/hospital/perawat/register",
    Update: "/api/hospital/perawat/update/{id}",
    Delete: "/api/hospital/perawat/delete/{id}"
  },
  rawatinap: {
    Get: "/api/hospital/rawatinap/data",
    GetId: "/api/hospital/rawatinap/{id}",
    Register: "/api/hospital/rawatinap/register",
    Update: "/api/hospital/rawatinap/update/{id}",
    Delete: "/api/hospital/rawatinap/delete/{id}"
  },
  spesialisasi: {
    Get: "/api/hospital/spesialisasi/data",
    GetId: "/api/hospital/spesialisasi/{id}",
    Register: "/api/hospital/spesialisasi/register",
    Update: "/api/hospital/spesialisasi/update/{id}",
    Delete: "/api/hospital/spesialisasi/delete/{id}"
  },
  wilayah: {
    Get: "/api/hospital/wilayah/data",
    GetId: "/api/hospital/wilayah/{id}",
    Register: "/api/hospital/wilayah/register",
    Update: "/api/hospital/wilayah/update/{id}",
    Delete: "/api/hospital/wilayah/delete/{id}"
  }
};

const HospitalApi = {
  agama: {
    filter: params => {
      return Axios.get(api.agama.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.agama.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.agama.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.agama.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.agama.Delete.replace("{id}", id));
    }
  },
  bangsal: {
    filter: params => {
      return Axios.get(api.bangsal.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.bangsal.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.bangsal.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.bangsal.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.bangsal.Delete.replace("{id}", id));
    }
  },
  diagnosisrawatinap: {
    filter: params => {
      return Axios.get(api.diagnosisrawatinap.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.diagnosisrawatinap.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.diagnosisrawatinap.Register, data);
    },
    update: (id, data) => {
      return Axios.post(
        api.diagnosisrawatinap.Update.replace("{id}", id),
        data
      );
    },
    delete: id => {
      return Axios.delete(api.diagnosisrawatinap.Delete.replace("{id}", id));
    }
  },
  dokter: {
    filter: params => {
      return Axios.get(api.dokter.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.dokter.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.dokter.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.dokter.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.dokter.Delete.replace("{id}", id));
    }
  },
  icd10: {
    filter: params => {
      return Axios.get(api.icd10.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.icd10.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.icd10.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.icd10.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.icd10.Delete.replace("{id}", id));
    }
  },
  kamarrawatinap: {
    filter: params => {
      return Axios.get(api.kamarrawatinap.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.kamarrawatinap.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.kamarrawatinap.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.kamarrawatinap.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.kamarrawatinap.Delete.replace("{id}", id));
    }
  },
  kelasrawatinap: {
    filter: params => {
      return Axios.get(api.kelasrawatinap.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.kelasrawatinap.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.kelasrawatinap.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.kelasrawatinap.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.kelasrawatinap.Delete.replace("{id}", id));
    }
  },
  pasien: {
    filter: params => {
      return Axios.get(api.pasien.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.pasien.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.pasien.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.pasien.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.pasien.Delete.replace("{id}", id));
    }
  },
  pekerjaan: {
    filter: params => {
      return Axios.get(api.pekerjaan.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.pekerjaan.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.pekerjaan.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.pekerjaan.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.pekerjaan.Delete.replace("{id}", id));
    }
  },
  pendidikan: {
    filter: params => {
      return Axios.get(api.pendidikan.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.pendidikan.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.pendidikan.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.pendidikan.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.pendidikan.Delete.replace("{id}", id));
    }
  },
  perawat: {
    filter: params => {
      return Axios.get(api.perawat.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.perawat.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.perawat.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.perawat.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.perawat.Delete.replace("{id}", id));
    }
  },
  rawatinap: {
    filter: params => {
      return Axios.get(api.rawatinap.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.rawatinap.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.rawatinap.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.rawatinap.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.rawatinap.Delete.replace("{id}", id));
    }
  },
  spesialisasi: {
    filter: params => {
      return Axios.get(api.spesialisasi.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.spesialisasi.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.spesialisasi.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.spesialisasi.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.spesialisasi.Delete.replace("{id}", id));
    }
  },
  wilayah: {
    filter: params => {
      return Axios.get(api.wilayah.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.wilayah.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.wilayah.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.wilayah.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.wilayah.Delete.replace("{id}", id));
    }
  }
};

export default HospitalApi;
