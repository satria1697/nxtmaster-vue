<template>
  <div class="bg-theme login-page">
    <span></span>
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
            v-model="username"
            @keyup.enter="login()"
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
            v-model="password"
            @keyup.enter="login()"
          />
        </div>
      </div>
      <!-- <div class="row">
        <div class="form form-group col">
          <label for="formStructureLevel" class="top">Structure Level</label>
          <select class="form-control bottom" id="formStructureLevel">
            <option
              :value="data.id"
              v-for="data in dataSLevel"
              :key="data.id"
              >{{ data.description }}</option
            >
          </select>
        </div>
      </div> -->
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
      <div v-if="!berhasil" class="text-danger">
        <span>Username atau password yang dimasukan salah</span>
      </div>
      <div v-if="empty" class="text-danger">
        <span>Masukan username dan password</span>
      </div>
    </div>
    <div class="fixed-bottom bg-theme">
      <h1 class="display-1">NXTOffice4</h1>
    </div>
  </div>
</template>

<script>
import Api from "../api";
import store from "../store";
export default {
  data() {
    return {
      username: "",
      password: "",
      berhasil: true,
      masuk: false,
      empty: false,
      dataApp: []
    };
  },
  mounted() {},
  methods: {
    login() {
      let self = this;
      if (self.username === "" || self.password === "") {
        self.empty = true;
      } else {
        self.berhasil = true;
        self.empty = false;
        self.masuk = true;
        let rawData = {
          username: self.username,
          password: self.password
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
              store.commit("authenChange");
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
                store.commit("setLogin", { username, fullname, levelid, id });
                if (store.state.isAuthenticated === true) {
                  try {
                    var storedTab = JSON.parse(
                      localStorage.getItem("tabState")
                    );
                    self.$router.push({
                      name: storedTab[0].name,
                      label: storedTab[0].label
                    });
                  } catch {
                    self.$router.push("/");
                  }
                }
              }
            } else {
              self.masuk = false;
              self.berhasil = false;
            }
          })
          .catch(err => {
            console.log(err);
            self.berhasil = false;
            self.masuk = false;
          });
      }
    },
    getDataApp() {
      let self = this;
      Api.application.filter().then(resp => {
        self.dataApp = resp.data.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  // padding-bottom: 10%;
}
.login-container {
  width: 400px;
  height: 310px;
  margin: 100px auto;
  padding: 10px 30px;
  background-color: white;
  border-radius: 8px;
  z-index: 100;
}
</style>
