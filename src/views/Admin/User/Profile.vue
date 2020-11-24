<template>
  <div class="detail">
    <data-table-level
      titleProps="User Level"
      v-if="isLevelModal"
      @id-selected="getLevelId"
      @modal-closed="findLevel"
    />
    <data-table-structure
      titleProps="User Structure"
      v-if="isStructureModal"
      @id-selected="getStructureId"
      @modal-closed="findStructure"
    />
    <data-table-rank
      titleProps="User Rank"
      v-if="isRankModal"
      @id-selected="getRankId"
      @modal-closed="findRank"
    />
    <user-modal
      v-if="berhasil && uploaded"
      tileProps="Data berhasil diunggah."
      textSuccess="true"
      @modal-closed="closeModal"
    />
    <user-modal
      v-if="berhasil && updated"
      titleProps="Data berhasil diperbaharui."
      textSuccess="true"
      @modal-closed="closeModal"
    />
    <user-modal
      v-if="unauthorized"
      titleProps="Tidak memiliki otoritas untuk merubah data."
      textDanger="true"
      @modal-closed="closeModal"
    />
    <delete-modal
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
                <img v-else src="@/assets/image/table/blank_avatar.png" />
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
            <div v-if="newForm" class="form form-group col">
              <label for="formUsername1" class="top">Username</label>
              <input
                id="formUsername1"
                class="bottom form-control"
                type="text"
                v-model="dataAll.username"
                v-on:focus="resetSpan()"
              />
            </div>
            <div v-if="!newForm" class="form form-group col">
              <label for="formUsername2" class="top top-disabled"
                >Username</label
              >
              <input
                id="formUsername2"
                class="bottom form-control disabled"
                type="text"
                v-model="dataAll.username"
                v-on:focus="resetSpan()"
                disabled
              />
            </div>
            <div class="form form-group col input-group">
              <label for="formLvlid" class="top">Level Pengguna</label>
              <input
                type="text"
                class="form-control bottom"
                id="formLvlid"
                v-model="levelname"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  v-on:click="findLevel()"
                >
                  Cari
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
              <label for="formActive" class="form-check-label">Aktif</label>
            </div>
          </div>
          <div class="row">
            <div class="form form-group col-10">
              <label for="formNama" class="top">Full Name</label>
              <input
                id="formNama"
                class="bottom form-control"
                type="text"
                v-model="dataAll.fullname"
                v-on:focus="resetSpan()"
              />
            </div>
            <div class="form form-group col-2">
              <label for="formEmpid" class="top">Employment ID</label>
              <input
                id="formEmpid"
                class="bottom form-control"
                type="text"
                v-model="dataAll.empid"
                v-on:focus="resetSpan()"
              />
            </div>
          </div>
          <div class="row">
            <div class="form form-group col input-group">
              <label for="formStrcId" class="top">Structure</label>
              <input
                type="text"
                class="form-control bottom"
                id="formStrcId"
                v-model="structurename"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  v-on:click="findStructure()"
                >
                  Cari
                </button>
              </div>
            </div>
            <div class="form form-group col input-group">
              <label for="formRankid" class="top">Tingkat</label>
              <input
                type="text"
                class="form-control bottom"
                id="formRankid"
                v-model="rankname"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  v-on:click="findRank()"
                >
                  Cari
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
                v-on:focus="resetSpan()"
              />
            </div>
            <div class="form form-group col">
              <label for="formPhone" class="top">Phone</label>
              <input
                id="formPhone"
                class="bottom form-control"
                type="text"
                v-model="dataAll.phone"
                v-on:focus="resetSpan()"
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
                v-on:focus="resetSpan()"
              />
            </div>
            <div class="form form-group col">
              <label for="formCity" class="top">City</label>
              <input
                id="formCity"
                class="bottom form-control"
                type="text"
                v-model="dataAll.city"
                v-on:focus="resetSpan()"
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
                v-on:focus="resetSpan()"
              />
            </div>
            <div class="form form-group col">
              <label for="formPwdconf" class="top">Password Confirmation</label>
              <input
                id="formPwdconf"
                class="bottom form-control"
                type="password"
                v-model="dataAll.password_confirmation"
                v-on:focus="resetSpan()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../../../api";
import DataTableLevel from "@/components/Admin/DataTableLevel.vue";
import DataTableStructure from "@/components/Admin/DataTableStructure.vue";
import DataTableRank from "@/components/Admin/DataTableRank.vue";
import UserModal from "@/components/Admin/UserModal.vue";
import DeleteModal from "@/components/DeleteConfirmation";
import store from "../../../store";

export default {
  components: {
    "data-table-level": DataTableLevel,
    "data-table-structure": DataTableStructure,
    "data-table-rank": DataTableRank,
    "user-modal": UserModal,
    "delete-modal": DeleteModal
  },
  props: {
    editIdProps: {
      type: Number
    },
    titleProps: {
      type: String
    }
  },
  data() {
    let self = this;
    return {
      newForm: true,
      dataAll: {
        id: store.getters["getId"],
        fullname: "",
        address: "",
        city: "",
        email: "",
        empid: "",
        phone: null,
        levelid: null,
        structureid: null,
        rankid: null,
        username: "",
        active: false,
        password: "",
        password_confirmation: "",
        avatar: null
      },
      levelname: "",
      structurename: "",
      rankname: "",
      berhasil: true,
      nikEn: true,
      image: null,
      levelData: [],
      updated: false,
      uploaded: false,
      editId: self.editIdProps,
      isRankModal: false,
      isLevelModal: false,
      isStructureModal: false,
      idnotfound: false,
      unauthorized: false,
      isDeleteModal: false
    };
  },
  mounted() {
    let self = this;
    self.checkEdit();
  },
  methods: {
    findLevel() {
      let self = this;
      if (self.isLevelModal === false) {
        self.isLevelModal = true;
      } else {
        self.isLevelModal = false;
      }
    },
    getLevelId(id) {
      let self = this;
      self.dataAll.levelid = id;
    },
    getLevelData() {
      let self = this;
      Api.level
        .find(self.dataAll.levelid)
        .then(resp => {
          self.levelname = resp.data.data.description;
        })
        .catch(err => {
          console.log(err);
        });
    },
    findStructure() {
      let self = this;
      if (self.isStructureModal === false) {
        self.isStructureModal = true;
      } else {
        self.isStructureModal = false;
      }
    },
    getStructureId(id) {
      let self = this;
      self.dataAll.structureid = id;
    },
    getStructureData() {
      let self = this;
      Api.structure
        .find(self.dataAll.structureid)
        .then(resp => {
          self.structurename = resp.data.data.description;
        })
        .catch(err => {
          console.log(err);
        });
    },
    findRank() {
      let self = this;
      if (self.isRankModal === false) {
        self.isRankModal = true;
      } else {
        self.isRankModal = false;
      }
    },
    getRankId(id) {
      let self = this;
      self.dataAll.rankid = id;
    },
    getRankData() {
      let self = this;
      Api.rank
        .find(self.dataAll.rankid)
        .then(resp => {
          self.rankname = resp.data.data.description;
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetSpan() {
      let self = this;
      self.uploaded = false;
      self.berhasil = true;
    },
    closeModal() {
      let self = this;
      self.reset();
      self.$emit("get-data");
      self.$emit("modal-closed");
    },
    reset() {
      let self = this;
      self.dataAll = {};
      self.dataAll.levelid = null;
      self.dataAll.rankid = null;
      self.dataAll.structureid = null;
      self.rankname = "";
      self.structurename = "";
      self.levelname = "";
      self.berhasil = true;
      self.unauthorized = false;
    },
    checkEdit() {
      let self = this;
      if (self.dataAll.id !== null) {
        Api.user
          .find(self.dataAll.id)
          .then(resp => {
            self.dataAll = resp.data.data;
            self.getLevelData();
            self.getStructureData();
            self.getRankData();
          })
          .catch(error => {
            console.log(error);
            self.reset();
            self.unauthorized = true;
          });
      }
    },
    deleteData() {
      let self = this;
      console.log(self.editId);
      Api.user.delete(self.editId).then(resp => {
        console.log(resp);
        self.closeModal();
      });
    },
    submit() {
      let self = this;
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
        active: self.dataAll.active,
        structureid: self.dataAll.structureid,
        avatar: self.dataAll.avatar
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      Api.user
        .register(formData)
        .then(resp => {
          if (resp.data.status === "success") {
            // self.reset();
            self.berhasil = true;
            self.uploaded = true;
          } else {
            self.berhasil = false;
          }
        })
        .catch(err => {
          console.log(err.response);
          self.berhasil = false;
        });
    },
    update(id) {
      let self = this;
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
        active: self.dataAll.active,
        structureid: self.dataAll.structureid,
        avatar: self.dataAll.avatar
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      Api.user
        .update(id, formData)
        .then(resp => {
          if (resp.data.status === "error") {
            self.berhasil = false;
          } else {
            self.berhasil = true;
            self.uploaded = true;
          }
        })
        .catch(err => {
          self.berhasil = false;
          console.log(err);
        });
    },
    selectImage(e) {
      let self = this;
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        let image64 = reader.result;
        self.dataAll.avatar = image64;
      };
      reader.readAsDataURL(image);
    }
  },
  watch: {
    "dataAll.levelid": function() {
      let self = this;
      if (self.dataAll.levelid !== null) {
        self.getLevelData();
      }
    },
    "dataAll.structureid": function() {
      let self = this;
      if (self.dataAll.structureid !== null) {
        self.getStructureData();
      }
    },
    "dataAll.rankid": function() {
      let self = this;
      if (self.dataAll.rankid !== null) {
        self.getRankData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
