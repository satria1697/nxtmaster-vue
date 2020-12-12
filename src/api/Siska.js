import Axios from "axios";

const api = {
  analisisdata: {
    Get: "/api/siska/analisisdata/data",
    GetId: "/api/siska/analisisdata/{id}",
    Register: "/api/siska/analisisdata/register",
    Update: "/api/siska/analisisdata/update/{id}",
    Delete: "/api/siska/analisisdata/delete/{id}"
  },
  analisisformulir: {
    Get: "/api/siska/analisisformulir/data",
    GetId: "/api/siska/analisisformulir/{id}",
    Register: "/api/siska/analisisformulir/register",
    Update: "/api/siska/analisisformulir/update/{id}",
    Delete: "/api/siska/analisisformulir/delete/{id}"
  },
  analisisoperasi: {
    Get: "/api/siska/analisisoperasi/data",
    GetId: "/api/siska/analisisoperasi/{id}",
    Register: "/api/siska/analisisoperasi/register",
    Update: "/api/siska/analisisoperasi/update/{id}",
    Delete: "/api/siska/analisisoperasi/delete/{id}"
  },
  analisisrawatinap: {
    Get: "/api/siska/analisisrawatinap/data",
    GetId: "/api/siska/analisisrawatinap/{id}",
    Register: "/api/siska/analisisrawatinap/register",
    Update: "/api/siska/analisisrawatinap/update/{id}",
    Delete: "/api/siska/analisisrawatinap/delete/{id}"
  },
  laporan: {
    Get: "/api/siska/laporan/data",
    GetId: "/api/siska/laporan/{id}",
    Register: "/api/siska/laporan/register",
    Update: "/api/siska/laporan/update/{id}",
    Delete: "/api/siska/laporan/delete/{id}",
    laporan: "/api/siska/laporan/laporan/data",
    laporanMutu: "api/siska/laporan/laporan/mutu",
    laporanoperasi: "api/siska/laporan/laporan/operasi"
  },
  formulir: {
    Get: "/api/siska/formulir/data",
    GetId: "/api/siska/formulir/{id}",
    Register: "/api/siska/formulir/register",
    Update: "/api/siska/formulir/update/{id}",
    Delete: "/api/siska/formulir/delete/{id}",
    filterdata: "/api/siska/formulir/filterdata/data"
  },
  formulirdata: {
    Get: "/api/siska/formulirdata/data",
    GetId: "/api/siska/formulirdata/{id}",
    Register: "/api/siska/formulirdata/register",
    Update: "/api/siska/formulirdata/update/{id}",
    Delete: "/api/siska/formulirdata/delete/{id}"
  },
  status: {
    Get: "/api/siska/status/data",
    GetId: "/api/siska/status/{id}",
    Register: "/api/siska/status/register",
    Update: "/api/siska/status/update/{id}",
    Delete: "/api/siska/status/delete/{id}"
  },
  statuskelengkapan: {
    Get: "/api/siska/statuskelengkapan/data",
    GetId: "/api/siska/statuskelengkapan/{id}",
    Register: "/api/siska/statuskelengkapan/register",
    Update: "/api/siska/statuskelengkapan/update/{id}",
    Delete: "/api/siska/statuskelengkapan/delete/{id}"
  }
};

const SiskaApi = {
  analisisdata: {
    filter: params => {
      return Axios.get(api.analisisdata.Get, {
        params: params
      });
    },
    find: (id, params) => {
      return Axios.get(api.analisisdata.GetId.replace("{id}", id), {
        params: params
      });
    },
    register: data => {
      return Axios.post(api.analisisdata.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.analisisdata.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.analisisdata.Delete.replace("{id}", id));
    }
  },
  analisisformulir: {
    filter: params => {
      return Axios.get(api.analisisformulir.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.analisisformulir.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.analisisformulir.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.analisisformulir.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.analisisformulir.Delete.replace("{id}", id));
    }
  },
  analisisoperasi: {
    filter: params => {
      return Axios.get(api.analisisoperasi.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.analisisoperasi.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.analisisoperasi.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.analisisoperasi.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.analisisoperasi.Delete.replace("{id}", id));
    }
  },
  analisisrawatinap: {
    filter: params => {
      return Axios.get(api.analisisrawatinap.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.analisisrawatinap.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.analisisrawatinap.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.analisisrawatinap.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.analisisrawatinap.Delete.replace("{id}", id));
    }
  },
  laporan: {
    filter: params => {
      return Axios.get(api.laporan.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.laporan.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.laporan.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.laporan.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.laporan.Delete.replace("{id}", id));
    },
    laporan: params => {
      return Axios.get(api.laporan.laporan, {
        params: params
      });
    },
    mutu: params => {
      return Axios.get(api.laporan.laporanMutu, {
        params: params
      });
    },
    operasi: params => {
      return Axios.get(api.laporan.laporanoperasi, {
        params: params
      });
    }
  },
  formulir: {
    filter: params => {
      return Axios.get(api.formulir.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.formulir.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.formulir.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.formulir.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.formulir.Delete.replace("{id}", id));
    },
    filterdata: params => {
      return Axios.get(api.formulir.filterdata, {
        params: params
      });
    }
  },
  formulirdata: {
    filter: params => {
      return Axios.get(api.formulirdata.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.formulirdata.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.formulirdata.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.formulirdata.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.formulirdata.Delete.replace("{id}", id));
    }
  },
  status: {
    filter: params => {
      return Axios.get(api.status.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.status.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.status.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.status.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.status.Delete.replace("{id}", id));
    }
  },
  statuskelengkapan: {
    filter: params => {
      return Axios.get(api.statuskelengkapan.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(api.statuskelengkapan.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(api.statuskelengkapan.Register, data);
    },
    update: (id, data) => {
      return Axios.post(api.statuskelengkapan.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(api.statuskelengkapan.Delete.replace("{id}", id));
    }
  }
};

export default SiskaApi;
