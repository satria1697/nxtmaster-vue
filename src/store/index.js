import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    isExpired: false,
    isLoading: false,
    isLoadingPage: false,
    isModal: false,
    isSideBar: false,
    active: 0,
    editId: 0,
    tabState: [],
    token: "" || localStorage.getItem("token"),
    isConfirmed: false,
    isLoginConfirmed: false
  },
  getters: {},
  mutations: {
    sideBarChange: state => {
      if (state.isSideBar === true) {
        state.isSideBar = false;
      } else {
        state.isSideBar = true;
      }
    },
    modalChange: state => {
      if (state.isModal === false) {
        state.isModal = true;
      } else {
        state.isModal = false;
      }
    },
    openModalEditMuta: (state, id) => {
      state.isModal = true;
      state.editId = id;
    },
    authenChange: state => {
      if (state.isAuthenticated === false) {
        state.isAuthenticated = true;
      } else {
        localStorage.removeItem("token");
        state.isSideBar = false;
        state.isAuthenticated = false;
      }
    },
    // emptyTab: (state, getters) => {

    //   state.tabState = [];
    // },
    setToken: (state, token) => {
      state.token = token;
    },
    openExpired: state => {
      state.isExpired = true;
    },
    closeExpired: state => {
      state.isExpired = false;
    },
    confirmedChange: state => {
      if (state.isConfirmed === false) {
        state.isConfirmed = true;
      } else {
        state.isConfirmed = false;
      }
    },
    loginConfirmedChange: state => {
      if (state.isLoginConfirmed === false) {
        state.isLoginConfirmed = true;
      } else {
        state.isLoginConfirmed = false;
      }
    }
  },
  actions: {},
  modules: {
    login: {
      state: () => ({
        username: "",
        fullname: "",
        levelid: null,
        id: null,
        akses: null
      }),
      getters: {
        getUsername(state) {
          return state.username;
        },
        getFullname(state) {
          return state.fullname;
        },
        getLevelId(state) {
          return state.levelid;
        },
        getId(state) {
          return state.id;
        },
        getAkses(state) {
          return state.akses;
        }
      },
      mutations: {
        setLogin(state, { username, fullname, levelid, id, akses }) {
          state.username = username;
          state.fullname = fullname;
          state.levelid = levelid;
          state.id = id;
          state.akses = akses;
        }
      }
    }
  }
});
