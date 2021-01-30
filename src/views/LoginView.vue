<template>
  <div class="bg-default login-page container-lg-fluid">
    <span></span>
    <div class="login-container col-md-4">
      <info-modal
        v-if="isUserModal"
        :title="textTitle"
        :textSuccess="berhasil"
        :textDanger="!berhasil"
        @modal-closed="isUserModal = false"
      />
      <div class="form-group row mb-3">
        <h1 class="text-dark display-4 col">Login</h1>
      </div>
      <div class="row">
        <div class="form form-group col-md">
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
        <div class="form form-group col-md">
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
        <div v-if="isLoading" class="spinner-border center span-theme">
          <span class="sr-only"></span>
        </div>
        <div v-else class="form-group col-4">
          <button class="btn btn-theme btn-block" @click="login()">
            Login
          </button>
        </div>
      </div>
    </div>
    <div class="fixed-bottom">
      <h1 class="display-1">NXT</h1>
    </div>
  </div>
</template>

<script>
import api from "../api";
import Api from "../api";
import store from "../store";

function initialDataLogin() {
  return {
    username: "",
    password: "",
    akses: null
  };
}
export default {
  data() {
    return {
      dataLogin: initialDataLogin(),
      berhasil: true,
      masuk: false,
      empty: false,
      dataAkses: [],
      textTitle: "",
      isUserModal: false,
      isLoading: false
    };
  },
  mounted() {},
  methods: {
    login() {
      this.isLoading = true;
      if (this.dataLogin.username === "" || this.dataLogin.password === "") {
        // this.empty = true;
        this.isUserModal = true;
        this.textTitle = "Username dan Password tidak boleh kosong";
        this.berhasil = false;
        this.isLoading = false;
      } else {
        this.berhasil = true;
        let rawData = {
          username: this.dataLogin.username,
          password: this.dataLogin.password,
          akses: this.dataLogin.akses
        };
        const formData = new FormData();
        for (let key in rawData) {
          formData.append(key, rawData[key]);
        }
        Api.auth
          .login(formData)
          .then(resp => {
            if (resp.data.status === "success") {
              this.berhasil = true;
              // store.commit("setToken", resp.headers.authorization);
              if (localStorage.token) {
                localStorage.removeItem("token");
              }
              localStorage.setItem("token", resp.headers.authorization);
              if (localStorage.token) {
                const secretKey =
                  "TtGYMF5mRwzAPEJKQ7eYDB0mAQnbdW4ijXBmZMHvpAy5a78dQ4z2lzDDF65uEhQ1";
                const jwtDecode = this.$jwt.decode(
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
                store.commit("authenChange");
                let tabs = sessionStorage.getItem(
                  "tab" + ":" + username + ":" + akses
                );
                if (tabs === null) {
                  this.$router.push("/");
                } else {
                  this.$router.push(tabs);
                }
              }
            } else {
              this.berhasil = false;
              this.isUserModal = true;
              this.textTitle = "Akses Ditolak";
              this.isLoading = false;
              this.dataLogin = initialDataLogin();
            }
          })
          .catch(() => {
            // console.log(err.response.data);
            // if (err.response.data.error === "akses_required") {
            //   this.errorText = "Tidak Memiliki Akses";
            // } else if (err.response.data.error === "not_active") {
            //   this.errorText =
            //     "Username belum aktif, silahkan hubungi administrator";
            // } else {
            //   this.errorText = "Username atau Password yang dimasukan salah";
            // }
            this.berhasil = false;
            this.isUserModal = true;
            this.textTitle = "Akses Ditolak";
            this.dataLogin = initialDataLogin();
            this.isLoading = false;
          });
      }
    },
    getDataAkses() {
      let params = {
        username: this.dataLogin.username,
        login: true
      };
      api.auth
        .akses(params)
        .then(resp => {
          this.dataAkses = resp.data.data[0].akses;
          if (this.dataAkses.length === 0) {
            this.dataAkses = [
              {
                id: 0,
                description: "#Tidak ada akses",
                active: 1
              }
            ];
          }
          this.dataAkses = this.dataAkses.filter(function(data) {
            return data.active === 1;
          });
          this.dataLogin.akses = this.dataAkses[0].id;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/abstracts/variables";
.login-page {
  height: 100vh;
  width: 100vw;
  color: $text;
  // padding-bottom: 10%;
}
.login-container {
  max-width: 400px;
  max-height: 250px;
  margin: 10rem auto;
  padding: 10px 30px;
  background-color: $theme-bg-detail;
  /*opacity: 0.9;*/
  border-radius: 8px;
  z-index: 9999;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
