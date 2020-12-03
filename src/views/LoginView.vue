<template>
  <div class="bg-theme login-page">
    <span></span>
    <user-modal
      v-if="isUserModal"
      :title="textTitle"
      :textSuccess="berhasil"
      :textDanger="!berhasil"
      @modal-closed="isUserModal = false"
    />
    <div class="login-container container">
      <div class="form-group row">
        <h1 class="text-dark display-4">Login</h1>
      </div>
      <div class="row">
        <div class="form form-group col-sm-12">
          <label for="user" class="top">Username</label>
          <input
            id="user"
            class="form-control bottom"
            type="text"
            v-model="dataLogin.username"
            @keyup.enter="login()"
            @blur="getDataAkses()"
          />
        </div>
      </div>
      <div class="row">
        <div class="form form-group col-sm-12">
          <label for="password" class="top">Password</label>
          <input
            id="password"
            class="form-control bottom"
            type="password"
            v-model="dataLogin.password"
            @keyup.enter="login()"
          />
        </div>
      </div>
      <div class="row">
        <div class="form form-group col">
          <label for="formAkses" class="top">Akses</label>
          <select
            class="form-control bottom custom-select"
            id="formAkses"
            v-model="dataLogin.akses"
          >
            <option :value="data.id" v-for="data in dataAkses" :key="data.id">{{
              data.description
            }}</option>
          </select>
        </div>
      </div>
      <div class="row align-content-center justify-content-center">
        <div v-if="masuk" class="spinner-border center span-theme">
          <span class="sr-only"></span>
        </div>
        <div v-else class="form-group col-4">
          <button class="btn btn-theme btn-block" @click="login()">
            Login
          </button>
        </div>
      </div>
    </div>
    <div class="fixed-bottom bg-theme">
      <h1 class="display-1">NXTOffice4</h1>
    </div>
  </div>
</template>

<script>
import api from "../api";
import Api from "../api";
import UserModal from "../components/UserModal.vue";
import store from "../store";

function initialDataLogin() {
  return {
    username: "",
    password: "",
    akses: null
  };
}
export default {
  components: { UserModal },
  data() {
    return {
      dataLogin: initialDataLogin(),
      berhasil: true,
      masuk: false,
      empty: false,
      dataAkses: [],
      textTitle: "",
      isUserModal: false
    };
  },
  mounted() {},
  methods: {
    login() {
      let self = this;
      if (self.dataLogin.username === "" || self.dataLogin.password === "") {
        // self.empty = true;
        self.isUserModal = true;
        self.textTitle = "Username dan Password tidak boleh kosong";
        self.berhasil = false;
      } else {
        self.berhasil = true;
        let rawData = {
          username: self.dataLogin.username,
          password: self.dataLogin.password,
          akses: self.dataLogin.akses
        };
        const formData = new FormData();
        for (let key in rawData) {
          formData.append(key, rawData[key]);
        }
        Api.auth
          .login(formData)
          .then(resp => {
            if (resp.data.status === "success") {
              self.berhasil = true;
              // store.commit("setToken", resp.headers.authorization);
              if (localStorage.token) {
                localStorage.removeItem("token");
              }
              localStorage.setItem("token", resp.headers.authorization);
              if (localStorage.token) {
                const secretKey =
                  "TtGYMF5mRwzAPEJKQ7eYDB0mAQnbdW4ijXBmZMHvpAy5a78dQ4z2lzDDF65uEhQ1";
                const jwtDecode = self.$jwt.decode(
                  // store.state.token,
                  localStorage.getItem("token"),
                  secretKey
                );
                let username = jwtDecode.username;
                let fullname = jwtDecode.fullname;
                let levelid = jwtDecode.levelid;
                let id = jwtDecode.sub;
                let akses = jwtDecode.akses;
                store.commit("setLogin", {
                  username,
                  fullname,
                  levelid,
                  id,
                  akses
                });
                let sidebarstate = sessionStorage.getItem(
                  "sidebar" + ":" + username + ":" + akses
                );
                if (!sidebarstate && akses === "0") {
                  store.commit("sideBarChange");
                }
                if (sidebarstate === "true") {
                  store.commit("sideBarChange");
                }
                store.commit("authenChange");
                let tabs = sessionStorage.getItem(
                  "tab" + ":" + username + ":" + akses
                );
                if (tabs === null) {
                  self.$router.push("/");
                } else {
                  self.$router.push(tabs);
                }
              }
            } else {
              self.berhasil = false;
              self.isUserModal = true;
              self.textTitle = "Akses Ditolak";
              self.dataLogin = initialDataLogin();
            }
          })
          .catch(() => {
            // console.log(err.response.data);
            // if (err.response.data.error === "akses_required") {
            //   self.errorText = "Tidak Memiliki Akses";
            // } else if (err.response.data.error === "not_active") {
            //   self.errorText =
            //     "Username belum aktif, silahkan hubungi administrator";
            // } else {
            //   self.errorText = "Username atau Password yang dimasukan salah";
            // }
            self.berhasil = false;
            self.isUserModal = true;
            self.textTitle = "Akses Ditolak";
            self.dataLogin = initialDataLogin();
          });
      }
    },
    getDataAkses() {
      let self = this;
      let params = {
        username: self.dataLogin.username,
        login: true
      };
      api.auth
        .akses(params)
        .then(resp => {
          self.dataAkses = resp.data.data[0].akses;
          if (self.dataAkses.length === 0) {
            self.dataAkses = [
              {
                id: 0,
                description: "#Tidak ada akses",
                active: 1
              }
            ];
          }
          self.dataAkses = self.dataAkses.filter(function(data) {
            return data.active === 1;
          });
          self.dataLogin.akses = self.dataAkses[0].id;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/abstracts/_variables.scss";
.login-page {
  height: 100vh;
  // padding-bottom: 10%;
}
.login-container {
  width: 400px;
  height: 250px;
  margin: 100px auto;
  padding: 10px 30px;
  background-color: $theme-bg-detail;
  border-radius: 8px;
  z-index: 100;
}
</style>
