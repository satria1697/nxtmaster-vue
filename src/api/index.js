import Axios from "axios";
import Path from "../api/const";
import store from "../store";

import HospitalApi from "./Hospital";
import SiskaApi from "./Siska";

// Axios.defaults.baseURL = "http://192.168.2.107:8000";
Axios.defaults.baseURL = "http://127.0.0.1:8000";
Axios.defaults.headers.post["Content-Type"] = "application/json";
Axios.defaults.headers.post["Accept"] = "application/json";

export const setupInterceptors = () => {
  Axios.interceptors.request.use(function(config) {
    config.headers = {
      ...config.headers,
      Authorization: "Bearer " + localStorage.getItem("token")
    };
    // const regexSiska = /(\/api\/siska\/laporan\/)\w+/g;
    // if (config.url.match(regexSiska)) {
    //   config = {
    //     ...config,
    //     responseType: "blob"
    //   };
    // }
    return config;
  });
  Axios.interceptors.response.use(undefined, error => {
    if (error.response.status === 400) {
      store.commit("openExpired");
    }
    return Promise.reject(error);
  });
};

setupInterceptors();

const api = {
  ...HospitalApi,
  ...SiskaApi,
  auth: {
    login: user => {
      return Axios.post(Path.auth.login, user);
    },
    loginconfirm: user => {
      return Axios.post(Path.auth.loginconfirm, user);
    },
    logout: () => {
      return Axios.post(Path.auth.logout);
    },
    akses: params => {
      return Axios.get(Path.auth.akses, {
        params: params
      });
    }
  },
  person: {
    filter: params => {
      return Axios.get(Path.person, {
        params: params
      });
    },
    delete: id => {
      return Axios.delete(Path.person_detail.replace("{id}", id));
    }
  },
  download: {
    ascsv: () => {
      return Axios.get("/api/downloadascsv");
    },
    asxlsx: () => {
      return Axios.get("/api/downloadasxlsx");
    },
    aspdf: () => {
      return Axios.get("/api/downloadaspdf");
    }
  },
  data: {
    filter: params => {
      return Axios.get(Path.data.dataGet, {
        params: params
      });
    },
    register: data => {
      return Axios.post(Path.data.dataRegister, data);
    },
    find: id => {
      return Axios.get(Path.data.dataGetId.replace("{id}", id));
    },
    update: (id, data) => {
      return Axios.post(Path.data.dataUpdate.replace("{id}", id), data);
    }
  },
  user: {
    filter: params => {
      return Axios.get(Path.user.userGet, {
        params: params
      });
    },
    register: data => {
      return Axios.post(Path.user.userRegister, data);
    },
    find: id => {
      return Axios.get(Path.user.userGetId.replace("{id}", id));
    },
    update: (id, data) => {
      return Axios.post(Path.user.userUpdate.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(Path.user.userDelete.replace("{id}", id));
    }
  },
  level: {
    filter: params => {
      return Axios.get(Path.level.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(Path.level.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(Path.level.Register, data);
    },
    update: (id, data) => {
      return Axios.post(Path.level.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(Path.level.Delete.replace("{id}", id));
    }
  },
  structure: {
    filter: params => {
      return Axios.get(Path.structure.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(Path.structure.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(Path.structure.Register, data);
    },
    update: (id, data) => {
      return Axios.post(Path.structure.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(Path.structure.Delete.replace("{id}", id));
    }
  },
  rank: {
    filter: params => {
      return Axios.get(Path.rank.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(Path.rank.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(Path.rank.Register, data);
    },
    update: (id, data) => {
      return Axios.post(Path.rank.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(Path.rank.Delete.replace("{id}", id));
    }
  },
  structurelevel: {
    filter: params => {
      return Axios.get(Path.structurelevel.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(Path.structurelevel.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(Path.structurelevel.Register, data);
    },
    update: (id, data) => {
      return Axios.post(Path.structurelevel.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(Path.structurelevel.Delete.replace("{id}", id));
    }
  },
  application: {
    filter: params => {
      return Axios.get(Path.application.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(Path.application.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(Path.application.Register, data);
    },
    update: (id, data) => {
      return Axios.post(Path.application.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(Path.application.Delete.replace("{id}", id));
    }
  },
  modul: {
    filter: params => {
      return Axios.get(Path.modul.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(Path.modul.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(Path.modul.Register, data);
    },
    update: (id, data) => {
      return Axios.post(Path.modul.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(Path.modul.Delete.replace("{id}", id));
    },
    filterApp: params => {
      return Axios.get(Path.modul.GetApp, {
        params: params
      });
    }
  },
  akses: {
    filter: params => {
      return Axios.get(Path.akses.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(Path.akses.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(Path.akses.Register, data);
    },
    update: (id, data) => {
      return Axios.post(Path.akses.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(Path.akses.Delete.replace("{id}", id));
    }
  },
  aksesmanager: {
    filter: params => {
      return Axios.get(Path.aksesmanager.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(Path.aksesmanager.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(Path.aksesmanager.Register, data);
    },
    update: (id, data) => {
      return Axios.post(Path.aksesmanager.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(Path.aksesmanager.Delete.replace("{id}", id));
    },
    filterRoot: params => {
      return Axios.get(Path.aksesmanager.GetRoot, {
        params: params
      });
    },
    filterParent: params => {
      return Axios.get(Path.aksesmanager.GetParent, {
        params: params
      });
    },
    filterChild: params => {
      return Axios.get(Path.aksesmanager.GetChild, {
        params: params
      });
    },
    findRoot: id => {
      return Axios.get(Path.aksesmanager.GetRootId.replace("{id}", id));
    },
    findChild: id => {
      return Axios.get(Path.aksesmanager.GetChildId.replace("{id}", id));
    }
  },
  rolelevel: {
    filter: params => {
      return Axios.get(Path.rolelevel.Get, {
        params: params
      });
    }
  },
  umum: {
    filter: params => {
      return Axios.get(Path.umum.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(Path.umum.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(Path.umum.Register, data);
    },
    update: (id, data) => {
      return Axios.post(Path.umum.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(Path.umum.Delete.replace("{id}", id));
    }
  },
  aksesuser: {
    filter: params => {
      return Axios.get(Path.aksesuser.Get, {
        params: params
      });
    },
    find: id => {
      return Axios.get(Path.aksesuser.GetId.replace("{id}", id));
    },
    register: data => {
      return Axios.post(Path.aksesuser.Register, data);
    },
    update: (id, data) => {
      return Axios.post(Path.aksesuser.Update.replace("{id}", id), data);
    },
    delete: id => {
      return Axios.delete(Path.aksesuser.Delete.replace("{id}", id));
    }
  }
};

export default api;
