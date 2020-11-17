<template>
  <div
    class="detail"
    :class="{ closeSideMain: this.$store.state.sideBarClose }"
  >
    <data-modul
      titleProps="Modul"
      :appIdProps="dataAll.applicationid"
      v-if="isModulModal"
      @id-selected="getModulId"
      @modal-closed="findModul"
    />
    <delete-modal
      v-if="isDeleteModal"
      @modal-closed="isDeleteModal = false"
      @delete-data="(isDeletemodal = false), (isLoginModal = true)"
    />
    <login-modal
      v-if="isLoginModal"
      @modal-closed="isLoginModal = false"
      @confirmed-login="deleteData(dataAll.id)"
    />
    <div class="container">
      <div class="row">
        <div class="col-3">
          <div class="title">
            <span>
              <i class="fas fa-search"></i>
              Antarmuka
            </span>
          </div>
          <div v-if="idAkses === 1" class="sidebar"></div>
          <div v-if="idAkses > 1" class="sidebar">
            <div class="row">
              <h5 class="pointer" @click="getId(dataRoot.id)">
                <i class="fas fa-home"></i>
                {{ dataRoot.caption }}
              </h5>
            </div>
            <div v-for="(data, index) in dataChild" :key="data.id" class="row">
              <span
                class="col-12 font-weight-bold span-theme-alt pointer"
                @click="getId(dataParent[index].id)"
              >
                <i
                  v-if="dataParent[index].icon !== ''"
                  :class="dataParent[index].icon"
                ></i>
                <i v-else class="fas fa-folder-open"></i>
                {{ dataParent[index].caption }}
              </span>
              <div class="col-12" v-for="d in data" :key="d.id">
                <span class="pointer" @click="getId(d.id)">
                  <i class="fas fa-calendar-plus  "></i>
                  {{ d.caption }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="title">
            <span class="title">
              <i class="fas fa-plus"></i>
              Tambah Menu
            </span>
          </div>
          <div class="row">
            <div class="form form-group col-5">
              <label for="formDataAkses" class="top">Akses</label>
              <select
                class="form-control bottom"
                id="formDataAkses"
                v-model="idAkses"
                value="idAkses"
              >
                <option
                  :value="data.id"
                  v-for="data in dataAkses"
                  :key="data.id"
                >
                  {{ data.description }}
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="form form-group col-4">
              <label for="formLabel" class="top">Label</label>
              <input
                id="formLabel"
                class="bottom form-control"
                v-model="dataAll.caption"
              />
            </div>
            <!-- <div class="form form-group col-4">
              <label for="formName" class="top">Label (ID)</label>
              <input
                id="formName"
                class="bottom form-control"
                v-model="dataChild.captionid"
              />
            </div>
            <div class="form form-group col-4">
              <label for="formName" class="top">label (EN)</label>
              <input
                id="formName"
                class="bottom form-control"
                v-model="dataChild.captionen"
              />
            </div> -->
          </div>
          <div class="row">
            <div class="form form-group col-6">
              <label for="formIkon" class="top">Ikon</label>
              <input
                id="formIkon"
                class="bottom form-control"
                v-model="dataAll.icon"
              />
            </div>
          </div>
          <div class="row">
            <div class="form form-group col-4">
              <label for="formTingkat" class="top">Tingkat</label>
              <select
                class="form-control bottom"
                id="formTingkat"
                v-model="dataAll.rolelevelid"
                value="idRoleLevel"
              >
                <option
                  :value="data.id"
                  v-for="data in dataRoleLevel"
                  :key="data.id"
                >
                  {{ data.id }} - {{ data.description }}
                </option>
              </select>
            </div>
            <div v-if="dataAll.rolelevelid === 3" class="form form-group col-4">
              <label for="formMenuInduk" class="top">Menu Induk</label>
              <select
                class="form-control bottom"
                id="formMenuInduk"
                v-model="dataAll.parentid"
              >
                <option
                  :value="data.id"
                  v-for="data in dataParent"
                  :key="data.id"
                >
                  {{ data.id }} - {{ data.caption }}
                </option>
              </select>
            </div>
          </div>
          <div v-if="dataAll.rolelevelid === 3" class="row">
            <div class="form form-group col-5">
              <label for="formApp" class="top">Application</label>
              <select
                class="form-control bottom"
                id="formApp"
                v-model="dataAll.applicationid"
              >
                <option :value="data.id" v-for="data in dataApp" :key="data.id">
                  {{ data.description }}
                </option>
              </select>
            </div>
          </div>
          <!-- <div v-if="dataAll.rolelevelid === 3" class="row">
            <div class="form form-group col-5">
              <label for="formModul" class="top">Modul</label>
              <select
                class="form-control bottom"
                id="formModul"
                v-model="dataAll.moduleid"
              >
                <option
                  :value="data.id"
                  v-for="data in dataModul"
                  :key="data.id"
                >
                  {{ data.name }} - {{ data.description }}
                </option>
              </select>
            </div>
          </div> -->
          <div
            v-if="dataAll.rolelevelid === 3 && dataAll.applicationid !== null"
            class="form form-group col-5 input-group row"
          >
            <label for="FormModul" class="top">Modul</label>
            <input
              type="text"
              class="form-control bottom"
              id="formModul"
              v-model="dataAll.modul.description"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                v-on:click="findModul()"
              >
                Cari
              </button>
            </div>
          </div>
          <div class="row">
            <div v-if="dataAll.id === null" class="modal-footer">
              <button class="btn btn-warning" v-on:click="reset()">
                <i class="fas fa-eraser"></i> Reset
              </button>
              <button
                class="btn btn-primary"
                v-on:click="register('submit', null)"
              >
                <i class="fas fa-save"></i> Submit
              </button>
            </div>
            <div v-if="dataAll.id !== null" class="modal-footer">
              <button class="btn btn-warning" v-on:click="reset()">
                <i class="fas fa-eraser"></i> Reset
              </button>
              <button class="btn btn-danger" v-on:click="isDeleteModal = true">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button
                class="btn btn-primary"
                v-on:click="register('update', dataAll.id)"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataModul from "../../../components/Admin/AksesManager/DataTableModul";
import LoginModal from "../../../components/Admin/LoginConfirmation";
import DeleteModal from "../../../components/DeleteConfirmation";
import api from "../../../api";
import store from "../../../store";
export default {
  components: {
    "data-modul": DataModul,
    "delete-modal": DeleteModal,
    "login-modal": LoginModal
  },
  data() {
    return {
      dataAll: {
        applicationid: null,
        caption: "",
        ikon: "",
        moduleid: null,
        modul: {
          id: null,
          description: ""
        },
        parentid: null,
        roleid: null,
        rolelevelid: null,
        id: null
      },
      dataRoot: {},
      dataParent: [],
      dataChild: [],
      dataRoleLevel: [],
      dataApp: [],
      dataAkses: [],
      idAkses: 1,
      dataModul: [],
      isModulModal: false,
      isDeleteModal: false,
      isLoginModal: false
    };
  },
  mounted() {
    let self = this;
    self.init();
  },
  methods: {
    init() {
      let self = this;
      self.openTab(self.$route.name, self.$route.name);
      self.getDataAkses();
      self.getDataRoleLevel();
      self.getDataApp();
    },
    openTab(name, label) {
      let exists = false;
      let tabState = store.state.tabState;
      let isZero = tabState.length === 0;
      if (!isZero) {
        exists = tabState.some(tab => tab.name === name);
      }
      if (!exists) {
        if (tabState.length > 4) {
          console.log("tidak bisa menambah lebih dari 5");
          store.commit("closeTab", 5);
        } else {
          store.commit("openTab", { name, label });
        }
      }
    },
    reset() {
      let self = this;
      self.dataAll.applicationid = null;
      self.dataAll.caption = null;
      self.dataAll.moduleid = null;
      self.dataAll.modul.id = null;
      self.dataAll.modul.description = "";
      self.dataAll.parentid = null;
      self.dataAll.roleid = null;
      self.dataAll.id = null;
      self.dataAll.ikon = null;
    },
    getDataAkses(params) {
      let self = this;
      api.akses
        .filter(params)
        .then(resp => {
          self.dataAkses = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataApp(params) {
      let self = this;
      api.application
        .filter(params)
        .then(resp => {
          self.dataApp = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    findModul() {
      let self = this;
      if (self.isModulModal === false) {
        self.isModulModal = true;
      } else {
        self.isModulModal = false;
      }
    },
    getDataModul() {
      let self = this;
      let params = {
        applicationid: self.dataAll.applicationid
      };
      api.modul
        .filterApp(params)
        .then(resp => {
          self.dataModul = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getModulId(id) {
      let self = this;
      api.modul
        .find(id)
        .then(resp => {
          self.dataAll.modul.id = resp.data.data.id;
          self.dataAll.modul.description = resp.data.data.name;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataRootId() {
      let self = this;
      api.aksesmanager
        .findRoot(self.idAkses)
        .then(resp => {
          self.dataRoot = resp.data.data;
          let params = {
            parentid: self.dataRoot.id
          };
          self.getDataFolder(params);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataFolder(params) {
      let self = this;
      api.aksesmanager
        .filterParent(params)
        .then(resp => {
          self.dataParent = resp.data.dataParent;
          self.dataChild = resp.data.dataChild;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataRoleLevel(params) {
      let self = this;
      api.rolelevel
        .filter(params)
        .then(resp => {
          self.dataRoleLevel = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getId(id) {
      let self = this;
      api.aksesmanager
        .find(id)
        .then(resp => {
          console.log(resp.data.data[0]);
          self.dataAll = resp.data.data[0];
          if (resp.data.data[0].modul === null) {
            self.dataAll.modul = {
              id: null,
              description: ""
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteData(id) {
      let self = this;
      console.log(id);
      api.aksesmanager
        .delete(id)
        .then(() => {
          // console.log(resp);
          self.isDeleteModal = false;
          self.isLoginModal = false;
          self.getDataRootId();
        })
        .catch(err => {
          console.log(err);
        });
    },
    register(setup, id) {
      let self = this;
      let rawData = {
        caption: self.dataAll.caption,
        icon: self.dataAll.icon,
        rolelevelid: self.dataAll.rolelevelid,
        roleid: self.idAkses
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (self.dataAll.rolelevelid === 2) {
        formData.append("parentid", self.dataRoot.id);
      }
      if (self.dataAll.rolelevelid === 3) {
        let childData = {
          parentid: self.dataAll.parentid,
          applicationid: self.dataAll.applicationid,
          moduleid: self.dataAll.modul.id
        };
        for (let key in childData) {
          formData.append(key, childData[key]);
        }
      }
      if (setup === "submit") {
        api.aksesmanager
          .register(formData)
          .then(resp => {
            console.log(resp);
            self.getDataRootId();
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (setup === "update") {
        console.log(setup);
        api.aksesmanager
          .update(id, formData)
          .then(resp => {
            console.log(resp);
            self.getDataRootId();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  watch: {
    idAkses: function() {
      let self = this;
      self.reset();
      self.getDataRootId();
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #222222;
  color: white;
  padding: 10px 20px 20px 25px;
  min-height: 70vh;
  // margin: 10px 5px;
}
.title {
  padding-bottom: 10px;
}
</style>
