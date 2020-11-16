const api = {
  auth: {
    login: "/api/v1/auth/login",
    logout: "/api/v1/auth/logout"
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
    Get: "/api/v1/auth/level/data",
    GetId: "api/v1/auth/level/{id}",
    Register: "/api/v1/auth/level/register",
    Update: "/api/v1/auth/level/update/{id}",
    Delete: "/api/v1/auth/level/delete/{id}"
  },
  structure: {
    Get: "/api/v1/auth/structure/data",
    GetId: "api/v1/auth/structure/{id}",
    Register: "/api/v1/auth/structure/register",
    Update: "/api/v1/auth/structure/update/{id}",
    Delete: "/api/v1/auth/structure/delete/{id}"
  },
  rank: {
    Get: "/api/v1/auth/rank/data",
    GetId: "api/v1/auth/rank/{id}",
    Register: "/api/v1/auth/rank/register",
    Update: "/api/v1/auth/rank/update/{id}",
    Delete: "/api/v1/auth/rank/delete/{id}"
  },
  structurelevel: {
    Get: "/api/v1/auth/structurelevel/data",
    GetId: "/api/v1/auth/structurelevel/{id}",
    Register: "/api/v1/auth/structurelevel/register",
    Update: "/api/v1/auth/structurelevel/update/{id}",
    Delete: "/api/v1/auth/structurelevel/delete/{id}"
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
    Delete: "/api/v1/auth/modul/delete/{id}"
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
    GetChild: "/api/v1/auth/aksesmanager/data/child"
  }
};

export default api;
