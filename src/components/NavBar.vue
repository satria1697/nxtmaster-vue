<template>
  <div>
    <Form
      v-if="isModal"
      :editIdProps="editId"
      titleProps="Profil Saya"
      @modal-closed="changeModal"
    ></Form>
    <div class="navbar bg-theme">
      <div class="left">
        <div class="detail-left">
          <div class="logo">
            <img src="../assets/logo.png" alt="" />
            <span>NXTOffice 4</span>
          </div>
          <div class="burger" v-on:click="sideBar()">
            <div class="burger-inside"></div>
            <div class="burger-inside"></div>
            <div class="burger-inside"></div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="detail-right">
          <!-- <div
          class="dropdown"
          v-on:click="toggleActive('1st')"
          :class="{ active: isActive }"
        >
          <div><i class="fas fa-comments"></i></div>
          <div
            class="dropdown-content"
            :class="{ active: isActive }"
            v-if="active == '1st'"
          >
            <div class="content">z</div>
            <div class="content">x</div>
            <div class="content">c</div>
          </div>
        </div> -->
          <div
            class="dropdown"
            v-on:click="toggleActive('2nd')"
            :class="{ active: isActive }"
            v-if="this.$store.getters['getLevelId'] <= 2"
          >
            <div class="pointer"><i class="fas fa-cogs fa-2x"></i></div>
            <div
              class="dropdown-content"
              :class="{ active: isActive }"
              v-if="active == '2nd'"
            >
              <div class="font-weight-bold text-dark">Pengaturan</div>
              <div class="content-theme text-black-50 not-allowed">
                <i class="fas fa-home"></i> Umum
              </div>

              <div class="font-weight-bold text-dark">Manajemen Akses</div>
              <div
                class="content-theme text-black-50 pointer"
                @click="goTo('dataakses')"
              >
                <i class="fas fa-puzzle-piece"></i> Data Akses
              </div>
              <div
                class="content-theme text-black-50 pointer"
                @click="goTo('dataaksesmanager')"
              >
                <i class="fas fa-puzzle-piece"></i> Pengaturan Akses
              </div>

              <div class="font-weight-bold text-dark">Manajemen Aplikasi</div>
              <div
                class="content-theme text-black-50 pointer"
                @click="goTo('dataaplikasi')"
              >
                <i class="fas fa-th "></i> Data Aplikasi
              </div>
              <div
                class="content-theme text-black-50 pointer"
                @click="goTo('datamodul')"
              >
                <i class="fas fa-box-open"></i> Data Modul
              </div>
              <div class="content-theme text-black-50 not-allowed">
                <i class="fas fa-box"></i> Api Klien
              </div>
            </div>
          </div>
          <div
            class="dropdown"
            v-on:click="toggleActive('3rd')"
            :class="{ active: isActive }"
            v-if="this.$store.getters['getLevelId'] <= 2"
          >
            <div class="pointer"><i class="fas fa-users fa-2x"></i></div>
            <div
              class="dropdown-content"
              :class="{ active: isActive }"
              v-if="active == '3rd'"
            >
              <div class="font-weight-bold text-dark">Manajemen Pengguna</div>
              <div
                class="content-theme text-black-50 pointer"
                @click="goTo('datauser')"
              >
                <i class="fas fa-user-friends"></i> Data Pengguna
              </div>
              <div
                class="content-theme text-black-50 pointer"
                @click="goTo('datalevel')"
              >
                <i class="fas fa-users-cog"></i> Tingkatan Pengguna
              </div>
              <div
                class="content-theme text-black-50 pointer"
                @click="goTo('datarank')"
              >
                <i class="fas fa-map-marker-alt"></i> Pangkat dan Golongan
              </div>
              <div
                class="content-theme text-black-50 pointer"
                @click="goTo('datastructure')"
              >
                <i class="fas fa-network-wired"></i> Struktur Organisasi
              </div>
              <div
                class="content-theme text-black-50 pointer"
                @click="goTo('datastructurelevel')"
              >
                <i class="fas fa-project-diagram"></i> Tingkatan Struktural
              </div>
            </div>
          </div>
          <div
            class="dropdown"
            v-on:click="toggleActive('4th')"
            :class="{ active: isActive }"
          >
            <div class="pointer"><i class="fas fa-info-circle fa-2x"></i></div>
            <div
              class="dropdown-content"
              :class="{ active: isActive }"
              v-if="active == '4th'"
            >
              <span class="text-dark">Developed by</span>
            </div>
          </div>
          <!-- <div class="user"> -->
          <div
            class="dropdown"
            v-on:click="toggleActive('5th')"
            :class="{ active: isActive }"
          >
            <div class="user pointer">
              <div class="img-container">
                <img
                  v-if="avatar === null"
                  src="@/assets/image/table/blank_avatar.png"
                />
                <img v-else :src="avatar" />
              </div>
              <div class="user-name">
                <span>{{ fullname }}</span>
              </div>
              <i class="fas fa-caret-down"></i>
            </div>
            <div
              class="dropdown-content"
              :class="{ active: isActive }"
              v-if="active == '5th'"
            >
              <div class="content-theme pointer" v-on:click="changeModal()">
                <i class="fas fa-user-cog"></i> Profil Saya
              </div>
              <div class="content-theme pointer" v-on:click="logout()">
                <i class="fas fa-sign-out-alt"></i> Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../api";
import store from "../store";
import Form from "../components/Admin/FormDataUser";
export default {
  components: {
    Form
  },
  data() {
    // let self = this;
    return {
      avatar: null,
      isActive: false,
      first: false,
      second: false,
      active: "",
      fullname: store.getters["getFullname"],
      isModal: false,
      editId: store.getters["getId"]
    };
  },
  mounted() {
    let self = this;
    self.getAvatar();
    document.addEventListener("click", self.close);
  },
  methods: {
    changeModal() {
      let self = this;
      if (self.isModal === false) {
        self.isModal = true;
      } else {
        self.isModal = false;
      }
    },
    toggleActive(where) {
      let self = this;
      if (where === self.active) {
        self.isActive = !self.isActive;
      } else {
        self.active = where;
        self.isActive = true;
      }
    },
    sideBar() {
      store.commit("sideBarChange");
    },
    logout() {
      let self = this;
      Api.auth
        .logout()
        .then(resp => {
          if (resp.data.status === "success") {
            store.commit("authenChange");
            if (store.state.isAuthenticated === false) {
              store.commit("emptyTab");
              store.commit("setToken", "");
              localStorage.removeItem("token");
              let username = "";
              let fullname = "";
              let levelid = null;
              let id = null;
              store.commit("setLogin", { username, fullname, levelid, id });
              self.$router.push("/login");
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAvatar() {
      let self = this;
      Api.user
        .find(store.getters["getId"])
        .then(resp => {
          self.avatar = resp.data.data.avatar;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goTo(place) {
      let self = this;
      self.$router.push({ name: place });
      // self.$router.push(place);
    },
    close(e) {
      let self = this;
      // console.log("asds");
      if (!this.$el.contains(e.target)) {
        self.isActive = false;
        self.active = "";
      }
    }
  },
  beforeDestroy() {
    let self = this;
    document.removeEventListener("click", self.close);
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  // display: grid;
  // grid-template-columns: 1fr 1fr;
  height: 50px;
  z-index: 120;
  position: sticky;
  top: 0;
  .left {
    margin: auto 0;
    justify-self: start;
  }
  .right {
    margin: auto 0;
    justify-self: end;
  }
  .detail-right {
    display: grid;
    grid-template-columns: 50px 50px 50px 190px;
    align-items: center;
  }
  .detail-left {
    display: grid;
    grid-template-columns: 250px 50px;
  }
}

.user {
  display: grid;
  grid-template-columns: 35px 135px 20px;
  align-items: center;
  &-image {
    height: 34px;
  }
  &-name {
    span {
      font-size: 13px;
    }
  }
}
.burger {
  justify-self: center;
  align-self: center;
  cursor: pointer;
  .burger-inside {
    width: 35px;
    height: 2px;
    background-color: white;
    margin: 5px 0;
  }
}
.logo {
  img {
    height: 40px;
  }
}

.dropdown {
  position: relative;
  display: inline-block;
  .active {
    background-color: white;
    display: block;
  }
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  right: 0;
  // left: -40;
  .content {
    color: black;
    padding: 5px;
  }
  .content:hover {
    color: white !important;
    background-color: darkslategray;
  }
}
.img-container {
  img {
    width: 30px;
    height: 30px;
  }
}
</style>
