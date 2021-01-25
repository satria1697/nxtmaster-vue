<template>
  <transition class="modal" tabindex="-1">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-centered container-md">
          <div class="modal-content">
            <div class="modal-header bg-default">
              <span class="font-weight-bold">{{ title }}</span>
              <i
                class="fa fa-window-close pull-right pointer-event"
                aria-hidden="true"
                @click="closeModal()"
              ></i>
            </div>
            <div class="modal-body text-center" v-if="dataAll === null">
              <b-spinner></b-spinner>
            </div>
            <div class="modal-body" v-else>
              <data-table-level
                title="User Level"
                v-if="isLevelModal"
                @id-selected="levelSelected"
                @modal-closed="isLevelModal = false"
              />
              <data-table-structure
                title="User Structure"
                v-if="isStructureModal"
                @id-selected="structureSelected"
                @modal-closed="isStructureModal = false"
              />
              <data-table-rank
                title="User Rank"
                v-if="isRankModal"
                @id-selected="rankSelected"
                @modal-closed="isRankModal = false"
              />
              <info-modal
                v-if="info.modal"
                :title="info.text"
                :success="success"
                @modal-closed="info.modal = false"
              />
              <delete-modal
                :data="dataAll"
                v-if="isDeleteModal"
                @modal-closed="isDeleteModal = false"
                @delete-data="deleteData"
              />
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-3">
                    <div class="row">
                      <div class="form-group col">
                        <div class="img-container-fluid">
                          <img v-if="dataAll.avatar" :src="dataAll.avatar" />
                          <img
                            v-else
                            :src="avatar"
                          />
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
                  <div class="col-md-9">
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
                        class="form form-group col-md"
                      >
                        <label for="formUsername" class="top">Username</label>
                        <input
                          id="formUsername"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.username"
                        />
                      </div>
                      <div v-else class="form form-group col-md-5">
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
                      <div class="form form-group col-md-5 input-group">
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
                            v-on:click="isLevelModal = true"
                          >
                            <i class="fas fa-search"></i> Cari
                          </button>
                        </div>
                      </div>
                      <div class="form-group form-check col-md-2">
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
                      <div class="form form-group col-md-8">
                        <label for="formNama" class="top">Full Name</label>
                        <input
                          id="formNama"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.fullname"
                        />
                      </div>
                      <div class="form form-group col-md-4">
                        <label for="formEmpid" class="top">Emp ID</label>
                        <input
                          id="formEmpid"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.empid"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="form form-group col-md input-group">
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
                            v-on:click="isStructureModal = true"
                          >
                            <i class="fas fa-search"></i> Cari
                          </button>
                        </div>
                      </div>
                      <div class="form form-group col-md input-group">
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
                            v-on:click="isRankModal = true"
                          >
                            <i class="fas fa-search"></i> Cari
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="form form-group col-md">
                        <label for="formEmail" class="top">Email</label>
                        <input
                          id="formEmail"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.email"
                        />
                      </div>
                      <div class="form form-group col-md">
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
                      <div class="form form-group col-md">
                        <label for="formAddress" class="top">Address</label>
                        <input
                          id="formAddress"
                          class="bottom form-control"
                          type="text"
                          v-model="dataAll.address"
                        />
                      </div>
                      <div class="form form-group col-md">
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
                      <div class="form form-group col-md">
                        <label for="formPwd" class="top">Password</label>
                        <input
                          id="formPwd"
                          class="bottom form-control"
                          type="password"
                          v-model="dataAll.password"
                        />
                        <password-meter :password="dataAll.password" />
                      </div>
                      <div class="form form-group col-md">
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
                    <div class="row" v-if="dataAkses !== null">
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
                        min-width="100px"
                        :titleCentered="false"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="editId === 0" class="modal-footer">
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
            <div v-if="editId !== 0" class="modal-footer">
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
  import avatar from "../../assets/image/table/blank_avatar.png";

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
    return {
      avatar: avatar,
      isLoading: false,
      newForm: true,
      dataAll: null,
      confirmedAkses: [],
      success: true,
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
      info: {
        text: null,
        modal: false
      },
      dataAkses: [],
      avatarChange: false
    };
  },
  created() {
    this.eschandler();
  },
  mounted() {
    this.init();
  },
  methods: {
    eschandler() {
      const escapeHandler = e => {
        if (e.key === "Escape") {
          this.closeModal();
        }
      };
      document.addEventListener("keydown", escapeHandler);
      this.$once("hook:destroyed", () => {
        document.removeEventListener("keydown", escapeHandler);
      });
    },
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
    levelSelected(data) {
      this.dataAll.level = data;
    },
    structureSelected(data) {
      this.dataAll.structure = data;
    },
    rankSelected(data) {
      this.dataAll.rank = data;
    },
    closeModal() {
      this.reset();
      this.$emit("get-data");
      this.$emit("modal-closed");
    },
    reset() {
      this.dataAll = initialDataAll();
      this.confirmedAkses = [];
      this.avatarChange = false;
    },
    checkEdit() {
      if (this.editId !== 0) {
        Api.user
          .find(this.editId)
          .then(resp => {
            this.dataAll = resp.data.data;
            this.dataAll.active = this.dataAll.active === 1;
            this.dataAll.akses.forEach(data => {
              this.confirmedAkses.push(data);
            });
            this.dataAkses = this.dataAkses.filter(
              elem => !this.confirmedAkses.find(({ id }) => elem.id === id)
            );
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.dataAll = initialDataAll();
      }
    },
    deleteData(id) {
      Api.user.delete(id).then(resp => {
        console.log(resp);
        this.closeModal();
      });
    },
    register(setup, id) {
      let rawData = {
        username: this.dataAll.username,
        password: this.dataAll.password,
        password_confirmation: this.dataAll.password_confirmation,
        empid: this.dataAll.empid,
        fullname: this.dataAll.fullname,
        rankid: this.dataAll.rank.id,
        city: this.dataAll.city,
        address: this.dataAll.address,
        email: this.dataAll.email,
        phone: this.dataAll.phone,
        levelid: this.dataAll.level.id,
        neverexpired: 1,
        active: this.dataAll.active === true ? 1 : 0,
        structureid: this.dataAll.structure.id,
        avatar: this.dataAll.avatar,
        akses: JSON.stringify(this.confirmedAkses),
        avatarChange: this.avatarChange
      };
      if (setup === "submit") {
        Api.user
          .register(rawData)
          .then(resp => {
            if (resp.status === 200) {
              this.info.text = "Data berhasil disimpan";
              this.success = true;
              this.info.modal = true;
            } else {
              this.info.text = "Terjadi kesalahan pada server";
              this.success = false;
              this.info.modal = true;
            }
          })
          .catch(err => {
            console.log(err);
            this.info.text = "Data gagal disimpan";
            this.success = false;
            this.info.modal = true;
          });
      } else {
        Api.user
          .update(id, rawData)
          .then(resp => {
            if (resp.status === 200) {
              this.info.text = "Data berhasil diunggah";
              this.success = true;
              this.info.modal = true;
            } else {
              this.info.text = "Terjadi kesalahan pada server";
              this.success = false;
              this.info.modal = true;
            }
          })
          .catch(err => {
            console.log(err);
            this.info.text = "Data gagal diunggah";
            this.success = false;
            this.info.modal = true;
          });
      }
    },
    selectImage(e) {
      let self = this;
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        self.dataAll.avatar = reader.result;
        self.avatarChange = true;
      };
      reader.readAsDataURL(image);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/abstracts/_variables.scss";
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
.img-container-fluid {
  text-align: center;
  span {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  img {
    width: 200px;
    height: 200px;
  }
}
::v-deep .list-picker-item {
  border: none;
  padding: 3px;
}
::v-deep .vue-list-picker {
  .list-picker-title {
    color: inherit;
  }
}
</style>
