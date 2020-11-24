const api = {
  auth: {
    login: "/api/v1/auth/login",
    logout: "/api/v1/auth/logout",
    loginconfirm: "/api/v1/auth/loginconfirmation",
    akses: "/api/v1/auth/akses"
  },
  person: "/api/person",
  person_detail: "/api/person/{id}",
  data: {
    dataGet: "/api/data/data",
    dataRegister: "/api/data/register",
    dataGetId: "/api/data/{id}",
    dataUpdate: "/api/data/update/{id}"
  },
  user: {
    userGet: "/api/v1/auth/user/data",
    userRegister: "/api/v1/auth/register",
    userGetId: "/api/v1/auth/user/{id}",
    userUpdate: "/api/v1/auth/user/update/{id}",
    userDelete: "/api/v1/auth/user/delete/{id}"
  },
  level: {
    Get: "/api/admin/level/data",
    GetId: "api/admin/level/{id}",
    Register: "/api/admin/level/register",
    Update: "/api/admin/level/update/{id}",
    Delete: "/api/admin/level/delete/{id}"
  },
  structure: {
    Get: "/api/v1/auth/structure/data",
    GetId: "api/v1/auth/structure/{id}",
    Register: "/api/v1/auth/structure/register",
    Update: "/api/v1/auth/structure/update/{id}",
    Delete: "/api/v1/auth/structure/delete/{id}"
  },
  rank: {
    Get: "/api/admin/rank/data",
    GetId: "api/admin/rank/{id}",
    Register: "/api/admin/rank/register",
    Update: "/api/admin/rank/update/{id}",
    Delete: "/api/admin/rank/delete/{id}"
  },
  structurelevel: {
    Get: "/api/admin/structurelevel/data",
    GetId: "/api/admin/structurelevel/{id}",
    Register: "/api/admin/structurelevel/register",
    Update: "/api/admin/structurelevel/update/{id}",
    Delete: "/api/admin/structurelevel/delete/{id}"
  },
  application: {
    Get: "/api/v1/auth/application/data",
    GetId: "/api/v1/auth/application/{id}",
    Register: "/api/v1/auth/application/register",
    Update: "/api/v1/auth/application/update/{id}",
    Delete: "/api/v1/auth/application/delete/{id}"
  },
  modul: {
    Get: "/api/v1/auth/modul/data",
    GetId: "/api/v1/auth/modul/{id}",
    Register: "/api/v1/auth/modul/register",
    Update: "/api/v1/auth/modul/update/{id}",
    Delete: "/api/v1/auth/modul/delete/{id}",
    GetApp: "/api/v1/auth/modul/data/app"
  },
  akses: {
    Get: "/api/v1/auth/akses/data",
    GetId: "/api/v1/auth/akses/{id}",
    Register: "/api/v1/auth/akses/register",
    Update: "/api/v1/auth/akses/update/{id}",
    Delete: "/api/v1/auth/akses/delete/{id}"
  },
  aksesmanager: {
    Get: "/api/v1/auth/aksesmanager/data",
    GetId: "/api/v1/auth/aksesmanager/{id}",
    Register: "/api/v1/auth/aksesmanager/register",
    Update: "/api/v1/auth/aksesmanager/update/{id}",
    Delete: "/api/v1/auth/aksesmanager/delete/{id}",
    GetRoot: "/api/v1/auth/aksesmanager/data/root",
    GetRootId: "/api/v1/auth/aksesmanager/data/root/{id}",
    GetParent: "/api/v1/auth/aksesmanager/data/parent",
    GetChild: "/api/v1/auth/aksesmanager/data/child",
    GetChildId: "/api/v1/auth/aksesmanager/data/child/{id}"
  },
  rolelevel: {
    Get: "/api/v1/auth/rolelevel/data"
  },
  umum: {
    Get: "/api/v1/auth/option/data",
    GetId: "/api/v1/auth/option/{id}",
    Register: "/api/v1/auth/option/register",
    Update: "/api/v1/auth/option/update/{id}",
    Delete: "/api/v1/auth/option/delete/{id}"
  },
  aksesuser: {
    Get: "/api/admin/aksesuser/data",
    GetId: "/api/admin/aksesuser/{id}",
    Register: "/api/admin/aksesuser/register",
    Update: "/api/admin/aksesuser/update/{id}",
    Delete: "/api/admin/aksesuser/delete/{id}"
  }
};

export default api;
