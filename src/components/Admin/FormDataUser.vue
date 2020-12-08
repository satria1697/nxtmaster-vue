<template>
  <transition class="modal" tabindex="-1" role="dialog" v-if="!isLoading">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-theme">
              <span class="font-weight-bold">{{ title }}</span>
              <i
                class="fa fa-window-close pull-right pointer"
                aria-hidden="true"
                @click="closeModal()"
              ></i>
            </div>
            <div class="modal-body">
              <data-table-level
                title="User Level"
                v-if="isLevelModal"
                @id-selected="levelSelected"
                @modal-closed="findLevel"
              />
              <data-table-structure
                title="User Structure"
                v-if="isStructureModal"
                @id-selected="structureSelected"
                @modal-closed="findStructure"
              />
              <data-table-rank
                title="User Rank"
                v-if="isRankModal"
                @id-selected="rankSelected"
                @modal-closed="findRank"
              />
              <user-modal
                v-if="isUserModal"
                :title="textTitle"
                :textSuccess="berhasil"
                :textDanger="!berhasil"
                @modal-closed="closeModal"
              />
              <delete-modal
                :data="dataAll"
                v-if="isDeleteModal"
                @modal-closed="isDeleteModal = false"
                @delete-data="deleteData"
              />
              <div class="container">
                <div class="row">
                  <div class="col-3">
                    <div class="row">
                      <div class="form-group col">
                        <div class="img-container">
                          <img v-if="dataAll.avatar" :src="dataAll.avatar" />
                          <img
                            v-else
                            src="@/assets/image/table/blank_avatar.png"
                          />
                          <div class="form-group">
                            <label for="fileInputForm">
                              <span class="fa-stack fa-2x pointer">
                                <i
                                  class="fa fa-circle fa-stack-2x"
                                  aria-hidden="true"
                                ></i>
                                <i
                                  class="fas fa-camera fa-stack-1x fa-inverse"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              <input
                                id="fileInputForm"
                                type="file"
                                class="d-none"
                                @change="selectImage"
                                accept="image/*"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-9">
                    <div class="row">
                      <div class="form form-group col" v-if="!newForm">
                        <label for="formID" class="top top-disabled">ID</label>
                        <input
                          id="formID"
                          class="bottom form-control disabled"
                          disabled
                          v-model="dataAll.id"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div
                        v-if="dataAll.id === null"
                        class="form form-group col"
                      >
                        <label for="formUsername" class="top">Username</label>
                        <input
                          id="formUsername"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.username"
                        />
                      </div>
                      <div v-else class="form form-group col">
                        <label
                          for="formusernamedisabled"
                          class="top top-disabled"
                          >Username</label
                        >
                        <input
                          id="formusernamedisabled"
                          class="bottom form-control disabled"
                          type="text"
                          v-model="dataAll.username"
                          disabled
                        />
                      </div>
                      <div class="form form-group col input-group">
                        <label for="formLvlid" class="top top-disabled"
                          >Level Pengguna</label
                        >
                        <input
                          type="text"
                          class="form-control bottom"
                          id="formLvlid"
                          v-model="dataAll.level.description"
                          disabled
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-default"
                            type="button"
                            v-on:click="findLevel()"
                          >
                            <i class="fas fa-search"></i> Cari
                          </button>
                        </div>
                      </div>
                      <div class="form-group form-check col">
                        <input
                          id="formActive"
                          class="form-check-input"
                          type="checkbox"
                          v-model="dataAll.active"
                        />
                        <label for="formActive" class="form-check-label"
                          >Aktif</label
                        >
                      </div>
                    </div>
                    <div class="row">
                      <div class="form form-group col-8">
                        <label for="formNama" class="top">Full Name</label>
                        <input
                          id="formNama"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.fullname"
                        />
                      </div>
                      <div class="form form-group col-4">
                        <label for="formEmpid" class="top">Employment ID</label>
                        <input
                          id="formEmpid"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.empid"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="form form-group col input-group">
                        <label for="formStrcId" class="top top-disabled">Structure</label>
                        <input
                          type="text"
                          class="form-control bottom"
                          id="formStrcId"
                          v-model="dataAll.structure.label"
                          disabled
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-default"
                            type="button"
                            v-on:click="findStructure()"
                          >
                            <i class="fas fa-search"></i> Cari
                          </button>
                        </div>
                      </div>
                      <div class="form form-group col input-group">
                        <label for="formRankid" class="top top-disabled"
                          >Tingkat</label
                        >
                        <input
                          type="text"
                          class="form-control bottom"
                          id="formRankid"
                          v-model="dataAll.rank.description"
                          disabled
                        />
                        <div class="input-group-append">
                          <button
                            class="btn btn-default"
                            type="button"
                            v-on:click="findRank()"
                          >
                            <i class="fas fa-search"></i> Cari
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="form form-group col">
                        <label for="formEmail" class="top">Email</label>
                        <input
                          id="formEmail"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.email"
                        />
                      </div>
                      <div class="form form-group col">
                        <label for="formPhone" class="top">Phone</label>
                        <input
                          id="formPhone"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.phone"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="form form-group col">
                        <label for="formAddress" class="top">Address</label>
                        <input
                          id="formAddress"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.address"
                        />
                      </div>
                      <div class="form form-group col">
                        <label for="formCity" class="top">City</label>
                        <input
                          id="formCity"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.city"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="form form-group col">
                        <label for="formPwd" class="top">Password</label>
                        <input
                          id="formPwd"
                          class="bottom form-control"
                          type="password"
                          v-model="dataAll.password"
                        />
                        <password-meter :password="dataAll.password" />
                      </div>
                      <div class="form form-group col">
                        <label for="formPwdconf" class="top"
                          >Password Confirmation</label
                        >
                        <input
                          id="formPwdconf"
                          class="bottom form-control"
                          type="password"
                          v-model="dataAll.password_confirmation"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <vue-list-picker
                        :left-items="dataAkses"
                        :right-items="confirmedAkses"
                        title-left="Akses Tersedia"
                        title-right="Akses Terpilih"
                        content-key="id"
                        content-attr="description"
                        class="akses col"
                        button-class="btn btn-default btn-sm"
                        min-height="150px"
                        height="150px"
                        :titleCentered="false"
                        title-class="vue-picker-title-class"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="editId === null" class="modal-footer">
              <button class="btn btn-default" v-on:click="reset()">
                <i class="fas fa-eraser"></i> Reset
              </button>
              <button
                class="btn btn-default"
                v-on:click="register('submit', null)"
              >
                <i class="fas fa-save"></i> Simpan
              </button>
            </div>
            <div v-if="editId !== null" class="modal-footer">
              <button
                class="btn btn-default float-left"
                v-on:click="isDeleteModal = true"
              >
                <i class="fas fa-trash"></i> Delete
              </button>
              <button
                class="btn btn-default"
                v-on:click="register('update', dataAll.id)"
              >
                <i class="fas fa-save"></i>
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Api from "../../api";
import DataTableLevel from "../Admin/DataTableLevel.vue";
import DataTableStructure from "../Admin/DataTableStructure.vue";
import DataTableRank from "../Admin/DataTableRank.vue";
import passwordMeter from "vue-simple-password-meter";

function initialDataAll() {
  return {
    id: null,
    fullname: "",
    address: "",
    city: "",
    email: "",
    empid: "",
    phone: null,
    levelid: null,
    level: {
      id: null,
      description: ""
    },
    structureid: null,
    structure: {
      id: null,
      label: ""
    },
    rankid: null,
    rank: {
      id: null,
      description: ""
    },
    akses: [],
    username: "",
    active: false,
    password: "",
    password_confirmation: "",
    avatar: ""
  };
}

export default {
  components: {
    "data-table-level": DataTableLevel,
    "data-table-structure": DataTableStructure,
    "data-table-rank": DataTableRank,
    "password-meter": passwordMeter
  },
  props: {
    editId: {
      type: Number
    },
    title: {
      type: String
    }
  },
  data() {
    // let self = this;
    return {
      isLoading: false,
      newForm: true,
      dataAll: initialDataAll(),
      confirmedAkses: [],
      berhasil: true,
      nikEn: true,
      image: null,
      levelData: [],
      updated: false,
      uploaded: false,
      isRankModal: false,
      isLevelModal: false,
      isStructureModal: false,
      idnotfound: false,
      unauthorized: false,
      isDeleteModal: false,
      textTitle: "",
      isUserModal: false,
      dataAkses: [],
      avatarChange: false
    };
  },
  created() {
    let self = this;
    const escapeHandler = e => {
      if (e.key === "Escape") {
        self.closeModal();
      }
    };
    document.addEventListener("keydown", escapeHandler);
    self.$once("hook:destroyed", () => {
      document.removeEventListener("keydown", escapeHandler);
    });
  },
  mounted() {
    let self = this;
    self.isLoading = true;
    self.init();
    self.isLoading = false;
  },
  methods: {
    init() {
      let self = this;
      self.getAksesData();
      self.checkEdit();
    },
    getAksesData(params) {
      let self = this;
      Api.akses
        .filter(params)
        .then(resp => {
          self.dataAkses = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    findLevel() {
      let self = this;
      if (self.isLevelModal === false) {
        self.isLevelModal = true;
      } else {
        self.isLevelModal = false;
      }
    },
    levelSelected(data) {
      let self = this;
      self.dataAll.levelid = data.id;
      self.dataAll.level.id = data.id;
      self.dataAll.level.description = data.description;
    },
    findStructure() {
      let self = this;
      if (self.isStructureModal === false) {
        self.isStructureModal = true;
      } else {
        self.isStructureModal = false;
      }
    },
    structureSelected(data) {
      let self = this;
      console.log(data);
      self.dataAll.structureid = data.id;
      self.dataAll.structure.id = data.id;
      self.dataAll.structure.label = data.label;
    },
    findRank() {
      let self = this;
      if (self.isRankModal === false) {
        self.isRankModal = true;
      } else {
        self.isRankModal = false;
      }
    },
    rankSelected(data) {
      let self = this;
      self.dataAll.rankid = data.id;
      self.dataAll.rank.id = data.id;
      self.dataAll.rank.description = data.description;
    },
    closeModal() {
      let self = this;
      if (self.berhasil) {
        self.reset();
        self.$emit("get-data");
        self.$emit("modal-closed");
      } else {
        self.isUserModal = false;
      }
    },
    reset() {
      let self = this;
      self.dataAll = initialDataAll();
      self.confirmedAkses = [];
      self.avatarChange = false;
    },
    checkEdit() {
      let self = this;
      if (self.editId !== null) {
        Api.user
          .find(self.editId)
          .then(resp => {
            self.dataAll = resp.data.data;
            self.dataAll.active = self.dataAll.active === 1 ? true : false;
            self.dataAll.akses.forEach(data => {
              self.confirmedAkses.push(data);
            });
            self.dataAkses = self.dataAkses.filter(
              elem => !self.confirmedAkses.find(({ id }) => elem.id === id)
            );
          })
          .catch(error => {
            console.log(error);
            // self.reset();
            // self.unauthorized = true;
          });
      }
    },
    deleteData(id) {
      let self = this;
      Api.user.delete(id).then(resp => {
        console.log(resp);
        self.closeModal();
      });
    },
    register(setup, id) {
      let self = this;
      let jsonAkses = JSON.stringify(self.confirmedAkses);
      let active = self.dataAll.active === true ? 1 : 0;
      let rawData = {
        username: self.dataAll.username,
        password: self.dataAll.password,
        password_confirmation: self.dataAll.password_confirmation,
        empid: self.dataAll.empid,
        fullname: self.dataAll.fullname,
        rankid: self.dataAll.rankid,
        city: self.dataAll.city,
        address: self.dataAll.address,
        email: self.dataAll.email,
        phone: self.dataAll.phone,
        levelid: self.dataAll.levelid,
        neverexpired: 1,
        active: active,
        structureid: self.dataAll.structureid,
        avatar: self.dataAll.avatar,
        akses: jsonAkses,
        avatarChange: self.avatarChange
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (setup === "submit") {
        Api.user
          .register(formData)
          .then(resp => {
            if (resp.data.status === "success") {
              self.textTitle = "Data berhasil disimpan";
              self.berhasil = true;
              self.isUserModal = true;
            } else {
              self.berhasil = false;
              self.textTitle = "Terjadi kesalahan pada server";
              self.isUserModal = true;
            }
          })
          .catch(err => {
            self.textTitle =
              err.response.data.error[Object.keys(err.response.data.error)[0]];
            self.berhasil = false;
            self.isUserModal = true;
          });
      } else {
        Api.user
          .update(id, formData)
          .then(resp => {
            if (resp.data.status === "success") {
              self.textTitle = "Data berhasil diperbaharui";
              self.berhasil = true;
              self.isUserModal = true;
            } else {
              self.berhasil = false;
              self.textTitle = "Terjadi kesalahan pada server";
              self.isUserModal = true;
            }
          })
          .catch(err => {
            self.textTitle = "Input data salah, silahkan cek kembali";
            self.berhasil = false;
            self.isUserModal = true;
            console.log(err);
          });
      }
    },
    selectImage(e) {
      let self = this;
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        let image64 = reader.result;
        self.dataAll.avatar = image64;
        self.avatarChange = true;
      };
      reader.readAsDataURL(image);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/abstracts/_variables.scss";
.modal {
  overflow-y: auto;
}
.modal-mask {
  z-index: 9900;
  overflow-y: auto;
  display: inline;
}
.modal-dialog {
  max-width: 1000px;
  overflow-y: auto;
}
.img-container {
  text-align: center;
  span {
    position: absolute;
    bottom: -40px;
    left: 90px;
  }
  img {
    width: 200px;
    height: 200px;
  }
}
.akses {
  ::v-deep .list-picker-item {
    border: none;
    padding: 3px;
  }
}
</style>
