<template>
  <transition class="modal" tabindex="-1" role="dialog">
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
              <user-modal
                v-if="berhasil && uploaded"
                title="Data berhasil diunggah."
                :textSuccess="true"
                @modal-closed="closeModal"
              />
              <user-modal
                v-if="berhasil && updated"
                title="Data berhasil diperbaharui."
                :textSuccess="true"
                @modal-closed="closeModal"
              />
              <user-modal
                v-if="berhasil && deleted"
                title="Data berhasil dihapus."
                :textSuccess="true"
                @modal-closed="closeModal"
              />
              <user-modal
                v-if="!berhasil"
                title="Terdapat Kesalahan Data"
                :textDanger="true"
                @modal-closed="berhasil = true"
              />
              <delete-modal
                :data="dataAll"
                v-if="isDeleteModal"
                @modal-closed="isDeleteModal = false"
                @delete-data="deleteData"
              />
              <div class="container">
                <div class="row">
                  <div v-if="editId !== null" class="form form-group col-4">
                    <label for="formID" class="top top-disabled">ID</label>
                    <input
                      id="formID"
                      class="bottom form-control disabled"
                      v-model="dataAll.id"
                      disabled
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formStructureLevel" class="top"
                      >Nama Aplikasi</label
                    >
                    <select
                      class="form-control bottom"
                      id="formStructureLevel"
                      v-model="appSelect"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataApp"
                        :key="data.id"
                        >{{ data.description }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formName" class="top">Nama Modul</label>
                    <input
                      id="formName"
                      class="bottom form-control"
                      v-model="dataAll.name"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formDesc" class="top">Description</label>
                    <input
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.description"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formDesc" class="top">path</label>
                    <input
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.path"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-if="editId === null" class="modal-footer">
              <button class="btn btn-default" v-on:click="reset()">
                <i class="fas fa-eraser"></i> Reset
              </button>
              <button class="btn btn-default" v-on:click="submit()">
                <i class="fas fa-save"></i> Simpan
              </button>
            </div>
            <div v-if="editId !== null" class="modal-footer">
              <button class="btn btn-default" v-on:click="isDeleteModal = true">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button class="btn btn-default" v-on:click="update(editId)">
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
import Api from "../../../api";

export default {
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
      dataAll: {
        id: null,
        applicationid: "",
        name: "",
        description: "",
        path: ""
      },
      berhasil: true,
      uploaded: false,
      updated: false,
      deleted: false,
      isDeleteModal: false,
      dataApp: [],
      appSelect: null
    };
  },
  mounted() {
    let self = this;
    self.init();
  },
  methods: {
    init() {
      let self = this;
      self.getDataApp();
      self.checkEdit();
    },
    closeModal() {
      let self = this;
      self.reset();
      self.$emit("get-data");
      self.$emit("modal-closed");
    },
    reset() {
      let self = this;
      self.dataAll.id = null;
      self.dataAll.description = "";
      self.editId = null;
    },
    checkEdit() {
      let self = this;
      if (self.editId !== null) {
        Api.modul
          .find(self.editId)
          .then(resp => {
            self.dataAll = resp.data.data;
            self.appSelect = resp.data.data.applicationid;
          })
          .catch(error => {
            console.log(error);
            self.reset();
          });
      }
    },
    submit() {
      let self = this;
      let rawData = {
        id: self.dataAll.id,
        applicationid: self.appSelect,
        name: self.dataAll.name,
        description: self.dataAll.description,
        path: self.dataAll.path
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      Api.modul
        .register(formData)
        .then(resp => {
          if (resp.data.status === "success") {
            self.reset();
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
        id: self.dataAll.id,
        applicationid: self.appSelect,
        name: self.dataAll.name,
        description: self.dataAll.description,
        path: self.dataAll.path
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      Api.modul
        .update(id, formData)
        .then(resp => {
          if (resp.status === "error") {
            self.berhasil = false;
          } else {
            self.berhasil = true;
            self.updated = true;
          }
        })
        .catch(err => {
          self.berhasil = false;
          console.log(err);
        });
    },
    deleteData() {
      let self = this;
      Api.modul
        .delete(self.dataAll.id)
        .then(resp => {
          console.log(resp);
          self.berhasil = true;
          self.deleted = true;
          self.isDeleteModal = false;
          self.$emit("modal-closed");
        })
        .catch(err => {
          console.log(err);
          self.berhasil = false;
        });
    },
    getDataApp(params) {
      let self = this;
      Api.application
        .filter(params)
        .then(resp => {
          self.dataApp = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.pull-right {
  margin: 8px 10px 0 0;
}
</style>
