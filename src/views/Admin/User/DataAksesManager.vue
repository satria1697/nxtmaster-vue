<template>
  <div class="detail">
    <data-modul
      titleProps="Modul"
      :appIdProps="dataAll.application.id"
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
          <div class="sidebar">
            <v-jstree :data="dataDir" whole-row @item-click="getId"></v-jstree>
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
                v-model="dataAll.text"
              />
            </div>
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
                class="form-control bottom custom-select"
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
            <div v-if="dataAll.rolelevelid > 1" class="form form-group col-4">
              <label for="formMenuInduk" class="top">Menu Induk</label>
              <select
                class="form-control bottom custom-select"
                id="formMenuInduk"
                v-model="dataAll.parentid"
              >
                <option
                  :value="data.id"
                  v-for="data in dataParent"
                  :key="data.id"
                >
                  {{ data.id }} - {{ data.text }}
                </option>
              </select>
            </div>
          </div>
          <div v-if="dataAll.rolelevelid === 3" class="row">
            <div class="form form-group col-5">
              <label for="formApp" class="top">Application</label>
              <select
                class="form-control bottom custom-select"
                id="formApp"
                v-model="dataAll.application.id"
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
            v-if="dataAll.rolelevelid === 3 && dataAll.application.id !== null"
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
              <button class="btn btn-warning" v-on:click="reset">
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
              <button class="btn btn-warning" v-on:click="reset">
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
// import store from "../../../store";
import VJstree from "vue-jstree";

function initialDataAll() {
  return {
    applicationid: null,
    text: "",
    icon: "",
    moduleid: null,
    modul: {
      id: null,
      description: ""
    },
    application: {
      id: null,
      description: ""
    },
    parentid: null,
    roleid: null,
    rolelevelid: 1,
    id: null
  };
}

export default {
  components: {
    "data-modul": DataModul,
    "delete-modal": DeleteModal,
    "login-modal": LoginModal,
    VJstree
  },
  data() {
    return {
      dataAll: initialDataAll(),
      dataDir: [],
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
      self.getDataAkses();
      self.getDataRoleLevel();
      self.getDataApp();
    },
    reset() {
      let self = this;
      self.dataAll = initialDataAll();
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
          self.dataParent = [];
          self.dataDir = resp.data.data;
          self.dataDir.forEach(data => {
            data.children.forEach(data => {
              // self.dataParent.push(data);
              data.children.forEach(leaf => {
                if (
                  leaf.icon === "" ||
                  leaf.icon === null ||
                  leaf.icon === "null"
                ) {
                  leaf.icon = "fa fa-file";
                }
              });
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataRoot(id) {
      let self = this;
      let rawData = {
        idakses: id
      };
      api.aksesmanager
        .filterRoot(rawData)
        .then(resp => {
          self.dataParent = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataParent(id) {
      let self = this;
      let rawData = {
        idakses: id
      };
      api.aksesmanager
        .filterParent(rawData)
        .then(resp => {
          self.dataParent = resp.data.data;
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
    getId(payload) {
      let self = this;
      console.log(payload.data.id);
      api.aksesmanager
        .find(payload.data.id)
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
        text: self.dataAll.text,
        icon: self.dataAll.icon,
        rolelevelid: self.dataAll.rolelevelid,
        roleid: self.idAkses
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (self.dataAll.rolelevelid === 2) {
        formData.append("parentid", self.dataAll.parentid);
      }
      if (self.dataAll.rolelevelid === 3) {
        let childData = {
          parentid: self.dataAll.parentid,
          applicationid: self.dataAll.application.id,
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
            if (resp.status === 200) {
              self.reset();
              self.getDataRootId();
            }
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
            if (resp.status === 200) {
              self.reset();
              self.getDataRootId();
            }
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
    },
    "dataAll.rolelevelid": function() {
      let self = this;
      if (self.dataAll.rolelevelid === 2) {
        self.getDataRoot(self.idAkses);
      } else {
        self.getDataParent(self.idAkses);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #a9a9a9;
  color: black;
  padding: 10px 20px 20px 10px;
  min-height: 70vh;
  /deep/ span {
    margin: 0;
    font-size: 12px;
  }
  /deep/ .tree-icon {
    width: 16px !important;
    height: 16px !important;
  }
  /deep/ .tree-icon.tree-ocl {
    width: 24px !important;
    height: 24px !important;
  }
}
.title {
  padding-bottom: 10px;
}
</style>
