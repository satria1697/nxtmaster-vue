<template>
  <transition class="modal" tabindex="-1" role="dialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-theme">
              <span class="font-weight-bold">{{ titleProps }}</span>
              <i
                class="fa fa-window-close pull-right pointer"
                aria-hidden="true"
                @click="closeModal()"
              ></i>
            </div>
            <div class="modal-body">
              <user-modal
                v-if="berhasil && uploaded"
                titleProps="Data berhasil diunggah."
                :textSuccess="true"
                @modal-closed="closeModal"
              />
              <user-modal
                v-if="berhasil && updated"
                titleProps="Data berhasil diperbaharui."
                :textSuccess="true"
                @modal-closed="closeModal"
              />
              <user-modal
                v-if="berhasil && deleted"
                titleProps="Data berhasil dihapus."
                :textSuccess="true"
                @modal-closed="closeModal"
              />
              <user-modal
                v-if="!berhasil"
                titleProps="Terdapat Kesalahan Data"
                :textDanger="true"
                @modal-closed="berhasil = true"
              />
              <delete-modal
                v-if="isDeleteModal"
                @modal-closed="isDeleteModal = false"
                @delete-data="deleteData"
              />
              <div class="container">
                <div class="row">
                  <div v-if="editId !== null" class="form form-group col4">
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
                    <select class="form-control bottom" id="formStructureLevel">
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
                    <select class="form-control bottom" id="formParentId">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="editId === null" class="modal-footer">
              <button class="btn btn-warning" v-on:click="reset()">
                <i class="fas fa-eraser"></i> Reset
              </button>
              <button class="btn btn-primary" v-on:click="submit()">
                <i class="fas fa-save"></i> Submit
              </button>
            </div>
            <div v-if="editId !== null" class="modal-footer">
              <button class="btn btn-danger" v-on:click="deleteData(editId)">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button class="btn btn-primary" v-on:click="update(editId)">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import UserModal from "../../Admin/UserModal.vue";
import DeleteModal from "../../DeleteConfirmation";
import Api from "../../../api";
export default {
  components: {
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
      dataAll: {
        id: null,
        description: ""
      },
      filter: {
        page: null,
        find: "",
        length: null,
        orderColumn: "",
        orderBy: ""
      },
      editId: self.editIdProps,
      berhasil: true,
      uploaded: false,
      updated: false,
      deleted: false,
      isDeleteModal: false,
      dataSLevel: []
    };
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
        description: self.dataAll.description
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
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
          console.log(err.response);
          self.berhasil = false;
        });
    },
    update(id) {
      let self = this;
      let rawData = {
        id: self.dataAll.id,
        description: self.dataAll.description
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      Api.structure
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
    }
  }
};
</script>

<style lang="scss" scoped>
.pull-right {
  margin: 8px 10px 0 0;
}
</style>
