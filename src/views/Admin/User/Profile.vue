<template>
  <div class="detail">
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
      <div class="container-fluid">
        <div class="row">
          <div class="col-3">
            <div class="row">
              <div class="form-group col">
                <div class="img-container">
                  <img v-if="dataAll.avatar" :src="dataAll.avatar" />
                  <img v-else src="@/assets/image/table/blank_avatar.png" />
                  <div class="form-group">
                    <label for="fileInputForm">
                      <span class="fa-stack fa-2x pointer-event">
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
              <div v-if="dataAll.id === null" class="form form-group col">
                <label for="formUsername" class="top">Username</label>
                <input
                  id="formUsername"
                  class="bottom form-control"
                  type="text"
                  v-model="dataAll.username"
                />
              </div>
              <div v-else class="form form-group col">
                <label for="formUsername" class="top top-disabled"
                  >Username</label
                >
                <input
                  id="formUsername"
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
                <label for="formActive" class="form-check-label">Aktif</label>
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
                <label for="formStrcId" class="top top-disabled"
                  >Structure</label
                >
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
                <label for="formRankid" class="top top-disabled">Tingkat</label>
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataAll.id === null" class="modal-footer">
      <button class="btn btn-default" v-on:click="reset()">
        <i class="fas fa-eraser"></i> Reset
      </button>
      <button class="btn btn-default" v-on:click="register('submit', null)">
        <i class="fas fa-save"></i> Simpan
      </button>
    </div>
    <div v-if="dataAll.id !== null" class="modal-footer">
      <button
        class="btn btn-default float-left"
        v-on:click="deleteData(dataAll.id)"
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
</template>

<script>
import Api from "../../../api";
import DataTableLevel from "../../../components/Admin/DataTableLevel.vue";
import DataTableStructure from "../../../components/Admin/DataTableStructure.vue";
import DataTableRank from "../../../components/Admin/DataTableRank.vue";
import store from "../../../store";

function initialDataAll() {
  return {
    id: store.getters["getId"],
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
    "data-table-rank": DataTableRank
  },
  data() {
    //
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
  mounted() {
    this.isLoading = true;
    this.init();
    this.isLoading = false;
  },
  methods: {
    init() {
      this.getAksesData();
      this.checkEdit();
    },
    getAksesData(params) {
      Api.akses
        .filter(params)
        .then(resp => {
          this.dataAkses = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    findLevel() {
      if (this.isLevelModal === false) {
        this.isLevelModal = true;
      } else {
        this.isLevelModal = false;
      }
    },
    levelSelected(data) {
      this.dataAll.levelid = data.id;
      this.dataAll.level.id = data.id;
      this.dataAll.level.description = data.description;
    },
    findStructure() {
      if (this.isStructureModal === false) {
        this.isStructureModal = true;
      } else {
        this.isStructureModal = false;
      }
    },
    structureSelected(data) {
      console.log(data);
      this.dataAll.structureid = data.id;
      this.dataAll.structure.id = data.id;
      this.dataAll.structure.label = data.label;
    },
    findRank() {
      if (this.isRankModal === false) {
        this.isRankModal = true;
      } else {
        this.isRankModal = false;
      }
    },
    rankSelected(data) {
      this.dataAll.rankid = data.id;
      this.dataAll.rank.id = data.id;
      this.dataAll.rank.description = data.description;
    },
    closeModal() {
      if (this.berhasil) {
        this.reset();
        this.$emit("get-data");
        this.$emit("modal-closed");
      } else {
        this.isUserModal = false;
      }
    },
    reset() {
      this.dataAll = initialDataAll();
      this.confirmedAkses = [];
    },
    checkEdit() {
      if (this.dataAll.id !== null) {
        Api.user
          .find(this.dataAll.id)
          .then(resp => {
            this.dataAll = resp.data.data;
            this.dataAll.akses.forEach(data => {
              this.confirmedAkses.push(data);
            });
            this.dataAkses = this.dataAkses.filter(
              elem => !this.confirmedAkses.find(({ id }) => elem.id === id)
            );
          })
          .catch(error => {
            console.log(error);
            // this.reset();
            // this.unauthorized = true;
          });
      }
    },
    deleteData(id) {
      Api.user.delete(id).then(resp => {
        console.log(resp);
        this.closeModal();
      });
    },
    register(setup, id) {
      let jsonAkses = JSON.stringify(this.confirmedAkses);
      let active = this.dataAll.active === true ? 1 : 0;
      console.log(this.avatarChange);
      let rawData = {
        username: this.dataAll.username,
        password: this.dataAll.password,
        password_confirmation: this.dataAll.password_confirmation,
        empid: this.dataAll.empid,
        fullname: this.dataAll.fullname,
        rankid: this.dataAll.rankid,
        city: this.dataAll.city,
        address: this.dataAll.address,
        email: this.dataAll.email,
        phone: this.dataAll.phone,
        levelid: this.dataAll.levelid,
        neverexpired: 1,
        active: active,
        structureid: this.dataAll.structureid,
        avatar: this.dataAll.avatar,
        akses: jsonAkses,
        avatarChange: this.avatarChange
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
              this.textTitle = "Data berhasil disimpan";
              this.berhasil = true;
              this.isUserModal = true;
            } else {
              this.berhasil = false;
            }
          })
          .catch(err => {
            console.log(err);
            this.textTitle = "Input data salah, silahkan cek kembali";
            this.berhasil = false;
            this.isUserModal = true;
          });
      } else {
        Api.user
          .update(id, formData)
          .then(resp => {
            if (resp.data.status === "success") {
              this.textTitle = "Data berhasil diperbaharui";
              this.berhasil = true;
              this.isUserModal = true;
            } else {
              this.berhasil = false;
            }
          })
          .catch(err => {
            this.textTitle = "Input data salah, silahkan cek kembali";
            this.berhasil = false;
            this.isUserModal = true;
            console.log(err);
          });
      }
    },
    selectImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        let image64 = reader.result;
        this.avatarChange = true;
        this.dataAll.avatar = image64;
      };
      reader.readAsDataURL(image);
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
#formRole {
  min-height: 200px;
  height: auto;
  .form-check {
    margin: 5px 10px;
    &-label {
      color: black;
      // font-size: 12px;
      padding-left: 2px;
    }
  }
}
.akses {
  ::v-deep .list-picker-item {
    border: none;
    padding: 3px;
  }
}
</style>
