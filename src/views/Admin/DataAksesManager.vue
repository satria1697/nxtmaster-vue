<template>
  <div class="detail" v-if="isLoading">
    <b-spinner></b-spinner>
  </div>
  <div class="detail" v-else>
    <data-modul
      title="Modul"
      :appIdProps="dataAll.application.id"
      v-if="isModulModal"
      @id-selected="getModulId"
      @modal-closed="findModul"
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
          <div class="title">
            <h4>
              <i class="fas fa-search"></i>
              Antarmuka
              <div v-if="isLoading" class="spinner-border"></div>
            </h4>
          </div>
          <div class="sidenav">
            <div class="sidenav-list">
              <span class="font-weight-bold"
                ><i class="fas fa-th-large"></i> Menu
                <span class="pointer-event"><i class="fas fa-times"></i></span
              ></span>
              <v-jstree
                :data="dataDir"
                whole-row
                @item-click="getId"
              ></v-jstree>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="title">
            <h4>
              <i class="fas fa-plus"></i>
              Tambah Menu
            </h4>
          </div>
          <div class="row">
            <div class="form form-group col-md-6">
              <label for="formDataAkses" class="top">Akses</label>
              <v-select
                label="description"
                :options="dataAkses"
                v-model="akses"
              ></v-select>
            </div>
          </div>
          <div class="row">
            <div class="form form-group col-md-4">
              <label for="formLabel" class="top">Label</label>
              <input
                id="formLabel"
                class="bottom form-control"
                v-model="dataAll.text"
              />
            </div>
          </div>
          <div class="row">
            <div class="form form-group col-md-6">
              <label for="formIkon" class="top">Ikon</label>
              <input
                id="formIkon"
                class="bottom form-control"
                v-model="dataAll.icon"
              />
            </div>
          </div>
          <div class="row">
            <div class="form form-group col-md-4">
              <label class="top">Tingkat</label>
              <v-select
                :options="dataRoleLevel"
                label="description"
                v-model="dataAll.rolelevel"
              ></v-select>
            </div>
            <div
              v-if="dataAll.rolelevel.id > 1"
              class="form form-group col-md-4"
            >
              <label class="top">Menu Induk</label>
              <v-select
                :options="dataParent"
                label="text"
                v-model="dataAll.parent"
              ></v-select>
            </div>
          </div>
          <div v-if="dataAll.rolelevel.id === 3" class="row">
            <div class="form form-group col-md-5">
              <label for="formApp" class="top">Application</label>
              <v-select
                :options="dataApp"
                label="description"
                v-model="dataAll.application"
              ></v-select>
            </div>
          </div>
          <div
            v-if="dataAll.rolelevel.id === 3 && dataAll.application.id !== null"
            class="form form-group col-md-5 input-group row"
          >
            <label for="FormModul" class="top">Modul</label>
            <input
              type="text"
              class="form-control bottom"
              id="formModul"
              :value="dataAll.modul.description"
            />
            <div class="input-group-append">
              <button
                class="btn btn-default"
                type="button"
                v-on:click="findModul()"
              >
                Cari
              </button>
            </div>
          </div>
          <div class="row">
            <div v-if="dataAll.id === null" class="modal-footer">
              <button class="btn btn-default" v-on:click="reset">
                <i class="fas fa-eraser"></i> Reset
              </button>
              <button
                class="btn btn-default"
                v-on:click="register('submit', null)"
              >
                <i class="fas fa-save"></i> Simpan
              </button>
            </div>
            <div v-if="dataAll.id !== null" class="modal-footer">
              <button class="btn btn-default" v-on:click="reset">
                <i class="fas fa-eraser"></i> Reset
              </button>
              <button class="btn btn-default" v-on:click="isDeleteModal = true">
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
  </div>
</template>

<script>
import DataModul from "../../components/Admin/AksesManager/DataTableModul";
import api from "../../api";
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
    rolelevel: {
      id: null,
      description: null
    },
    id: null
  };
}

export default {
  components: {
    "data-modul": DataModul,
    VJstree
  },
  data() {
    return {
      dataAll: initialDataAll(),
      dataDir: [],
      dataParent: [],
      dataRoleLevel: [],
      dataApp: [],
      dataAkses: [],
      akses: null,
      dataModul: [],
      isModulModal: false,
      isDeleteModal: false,
      isLoginModal: false,
      isLoading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getDataAkses();
      this.getDataRoleLevel();
      this.getDataApp();
    },
    reset() {
      this.dataAll = initialDataAll();
    },
    getDataAkses(params) {
      this.isLoading = true;
      api.akses
        .filter(params)
        .then(resp => {
          this.dataAkses = resp.data.data;
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    getDataApp(params) {
      api.application
        .filter(params)
        .then(resp => {
          this.dataApp = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    findModul() {
      this.isModulModal = this.isModulModal === false;
    },
    getModulId(data) {
      api.modul
        .find(data.id)
        .then(resp => {
          this.dataAll.modul.id = resp.data.data.id;
          this.dataAll.modul.description = resp.data.data.name;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataRootId() {
      api.aksesmanager
        .findRoot(this.akses.id)
        .then(resp => {
          this.dataDir = resp.data.data;
          this.dataDir.forEach(data => {
            data.children.forEach(data => {
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
      let rawData = {
        idakses: id
      };
      api.aksesmanager
        .filterRoot(rawData)
        .then(resp => {
          this.dataParent = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataParent(id) {
      let rawData = {
        idakses: id
      };
      api.aksesmanager
        .filterParent(rawData)
        .then(resp => {
          this.dataParent = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataRoleLevel(params) {
      api.rolelevel
        .filter(params)
        .then(resp => {
          this.dataRoleLevel = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getId(payload) {
      console.log(payload.data.id);
      api.aksesmanager
        .find(payload.data.id)
        .then(resp => {
          this.dataAll = resp.data.data;
          if (resp.data.data.modul === null) {
            this.dataAll.modul = {
              id: null,
              description: ""
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteData(data) {
      api.aksesmanager
        .delete(data.id)
        .then(() => {
          this.isDeleteModal = false;
          this.isLoginModal = false;
          this.reset();
          this.getDataRootId();
        })
        .catch(err => {
          console.log(err);
        });
    },
    register(setup, id) {
      let rawData = {
        text: this.dataAll.text,
        icon: this.dataAll.icon,
        rolelevelid: this.dataAll.rolelevel.id,
        roleid: this.akses.id
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (this.dataAll.rolelevel.id === 2) {
        formData.append("parentid", this.dataAll.parent.id);
      }
      if (this.dataAll.rolelevel.id === 3) {
        let childData = {
          parentid: this.dataAll.parent.id,
          applicationid: this.dataAll.application.id,
          moduleid: this.dataAll.modul.id
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
              this.reset();
              this.getDataRootId();
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
              this.reset();
              this.getDataRootId();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  watch: {
    "akses.id": function() {
      this.reset();
      this.getDataRootId();
    },
    "dataAll.rolelevel.id": function() {
      if (this.dataAll.rolelevel.id === 2) {
        this.getDataRoot(this.akses.id);
      } else {
        this.getDataParent(this.akses.id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/abstracts/variables";
.sidenav {
  width: 230px;
  z-index: 100;
  color: $text-alt;
  padding: 0;
  border-radius: 0px;
  &-list {
    margin: 5px;
  }
  transition: 0.2s;
  ::v-deep span {
    margin: 0;
    font-size: 12px;
  }
  ::v-deep .tree-icon {
    width: 16px !important;
    height: 16px !important;
  }
  ::v-deep .tree-icon.tree-ocl {
    width: 20px !important;
    height: 20px !important;
  }
  ::v-deep .tree-wholerow-ul {
    min-height: 20vh;
    border-radius: 4px;
    margin-top: 30px;
    background-color: $theme-bg-detail;
    color: $text-alt;
    border: 1px solid rgba($color: #000000, $alpha: 0.2);
    -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    padding-bottom: 5px;
    overflow-x: hidden;
  }
}
span.font-weight-bold {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin: 10px 0 5px 4px;
  font-size: 13px;
  background: $theme-bg-detail;
  padding: 3px 14px 3px;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.2);
  border-right: 1px solid rgba($color: #000000, $alpha: 0.2);
  border-left: 1px solid rgba($color: #000000, $alpha: 0.2);
  position: absolute;
  top: 23px;
  z-index: 10;
  color: $text-alt;
}
</style>
