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
                  <div class="form form-group col-10">
                    <label for="formDesc" class="top">Description</label>
                    <input
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.description"
                    />
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
              </div>
            </div>
            <div v-if="dataAll.id === null" class="modal-footer">
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
            <div v-if="dataAll.id !== null" class="modal-footer">
              <button
                class="btn btn-danger"
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
        description: "",
        active: false
      },
      editId: self.editIdProps,
      berhasil: true,
      uploaded: false,
      updated: false,
      deleted: false,
      isDeleteModal: false
    };
  },
  mounted() {
    let self = this;
    self.checkEdit();
  },
  methods: {
    closeModal() {
      let self = this;
      self.reset();
      self.$emit("get-data");
      self.$emit("modal-closed");
    },
    reset() {
      let self = this;
      self.dataAll.description = "";
      self.editId = null;
      self.dataAll.active = false;
    },
    checkEdit() {
      let self = this;
      if (self.editId !== null) {
        Api.akses
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
    register(status, id) {
      let self = this;
      let active = self.dataAll.active === true ? 1 : 0;
      let rawData = {
        description: self.dataAll.description,
        active: active
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (status === "register") {
        Api.akses
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
      } else {
        Api.akses
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
            if (err.response.error === "") {
              self.berhasil = false;
            }
          });
      }
    },
    deleteData(id) {
      let self = this;
      Api.akses
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
    }
  }
};
</script>

<style lang="scss" scoped>
.pull-right {
  margin: 8px 10px 0 0;
}
</style>
