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
                  <div class=" form form-group col-8">
                    <label for="formDesc" class="top">Description</label>
                    <input
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.description"
                    />
                  </div>
                  <div class="form-group form-check col-3">
                    <input
                      id="formSign"
                      class="form-check-input"
                      type="checkbox"
                      v-model="dataAll.signability"
                    />
                    <label for="formSign" class="form-check-label"
                      >Sign Ability</label
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formStructureLevel" class="top"
                      >Structure Level</label
                    >
                    <select
                      class="form-control bottom"
                      id="formStructureLevel"
                      v-model="dataAll.structurelevelid"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataSLevel"
                        :key="data.id"
                        >{{ data.description }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formParentId" class="top">Parent ID</label>
                    <select
                      class="form-control bottom"
                      id="formParentId"
                      v-model="dataAll.parentid"
                    >
                      <option
                        v-for="data in dataS"
                        :key="data.id"
                        :value="data.id"
                        >{{ data.id }} - {{ data.description }}</option
                      >
                    </select>
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
                v-on:click="submit('register', null)"
              >
                <i class="fas fa-save"></i> Simpan
              </button>
            </div>
            <div v-if="editId !== null" class="modal-footer">
              <button class="btn btn-default" v-on:click="deleteData(editId)">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button
                class="btn btn-default"
                v-on:click="submit('update', editId)"
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
        description: "",
        structurelevelid: null,
        parentid: null,
        signability: null
      },
      filter: {
        page: null,
        find: "",
        length: null,
        orderColumn: "",
        orderBy: ""
      },
      berhasil: true,
      uploaded: false,
      updated: false,
      deleted: false,
      isDeleteModal: false,
      dataSLevel: [],
      dataS: []
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
    self.init();
  },
  methods: {
    init() {
      let self = this;
      self.checkEdit();
      self.getDataSLevel();
      self.getDataS();
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
        Api.structure
          .find(self.editId)
          .then(resp => {
            self.dataAll = resp.data.data;
            self.dataAll.signability =
              self.dataAll.signability === 1 ? true : false;
          })
          .catch(error => {
            console.log(error);
            self.reset();
          });
      }
    },
    submit(state, id) {
      let self = this;
      let signability = self.dataAll.signability === true ? 1 : 0;
      let rawData = {
        description: self.dataAll.description,
        signability: signability,
        structurelevelid: self.dataAll.structurelevelid,
        parentid: self.dataAll.parentid
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (state === "register") {
        Api.structure
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
            console.log(err);
            self.berhasil = false;
          });
      } else {
        Api.structure
          .update(id, formData)
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
            console.log(err);
            self.berhasil = false;
          });
      }
    },
    deleteData(id) {
      let self = this;
      Api.structure
        .delete(id)
        .then(resp => {
          console.log(resp);
          self.berhasil = true;
          self.deleted = true;
        })
        .catch(err => {
          console.log(err);
          self.berhasil = false;
        });
    },
    getDataSLevel(params) {
      let self = this;
      Api.structurelevel
        .filter(params)
        .then(resp => {
          self.dataSLevel = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataS(params) {
      let self = this;
      Api.structure
        .filter(params)
        .then(resp => {
          self.dataS = resp.data.data;
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
