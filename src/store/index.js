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
    token: "" || localStorage.getItem("token")
  },
  getters: {
    tabState: state => state.tabState,
    // tabRoute: state => state.
    tabRouteName: state => name => {
      return state.tabState.find(tab => tab.name === name);
    }
  },
  mutations: {
    sideBarChange: state => {
      if (state.isSideBar === true) {
        state.isSideBar = false;
      } else {
        state.isSideBar = true;
      }
    },
    openTab: (state, { name, label }) => {
      let data = { name: name, label: label, tab: true };
      state.tabState.push(data);
    },
    closeTab: (state, num) => {
      state.tabState.splice(num, 1);
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
    }
  },
  actions: {},
  modules: {
    login: {
      state: () => ({
        username: "",
        fullname: "",
        levelid: null,
        id: null
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
        }
      },
      mutations: {
        setLogin(state, { username, fullname, levelid, id }) {
          state.username = username;
          state.fullname = fullname;
          state.levelid = levelid;
          state.id = id;
        }
      }
    }
  }
});
