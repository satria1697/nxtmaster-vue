<template>
  <transition class="modal" tabindex="-1" role="dialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <span>Konfirmasi Password</span>
            </div>
            <div class="modal-body">
              <div class="row" v-if="this.$store.getters['getLevelId'] > 3">
                <div class="form form-group col-sm-10">
                  <label for="user" class="top">Username</label>
                  <input
                    id="user"
                    class="form-control bottom"
                    type="text"
                    v-model="dataLogin.username"
                    @keyup.enter="login()"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form form-group col-sm-10">
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
            </div>
            <div v-if="!isLoading" class="modal-footer">
              <div v-if="!berhasil">
                <span class="text-danger">gagal mengotorisasi</span>
              </div>
              <button class="btn btn-seconday" @click="closeModal()">
                Cancel
              </button>
              <button class="btn btn-theme" @click="login()">Otorisasi</button>
            </div>
            <div v-if="isLoading" class="modal-footer">
              <div class="spinner-border center span-theme">
                <span class="sr-only"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import api from "../../api";
import store from "../../store";

function initialDataLogin() {
  return {
    username: "",
    password: ""
  };
}
export default {
  data() {
    return {
      dataLogin: initialDataLogin(),
      isLoading: false,
      berhasil: true
    };
  },
  methods: {
    login() {
      let self = this;
      self.isLoading = true;
      if (self.password === "") {
        self.berhasil = false;
        self.isLoading = false;
      } else {
        let user =
          store.getters["getLevelId"] <= 3
            ? store.getters["getUsername"]
            : self.dataLogin.username;
        let rawData = {
          username: user,
          password: self.dataLogin.password
        };
        let formData = new FormData();
        for (let key in rawData) {
          formData.append(key, rawData[key]);
        }
        api.auth
          .loginconfirm(formData)
          .then(resp => {
            if (resp.data.status === "success") {
              self.$emit("login", true);
            }
          })
          .catch(error => {
            self.isLoading = false;
            self.berhasil = false;
            self.dataLogin = initialDataLogin();
            console.log(error);
          });
      }
    },
    closeModal() {
      let self = this;
      self.$emit("login", false);
    }
  }
};
</script>

<style lang="scss" scoped>
// .modal {
//   &-mask {
//     z-index: 90999999;
//   }
//   &-content {
//     // margin: 150px auto;
//     // max-width: 300px;
//   }
// }
</style>
