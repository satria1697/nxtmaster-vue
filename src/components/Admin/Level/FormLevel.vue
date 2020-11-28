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
                v-if="userModal"
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
              <div class="container">
                <div class="row">
                  <div v-if="editId === null" class="form form-group col-4">
                    <label for="formID" class="top">ID</label>
                    <input
                      id="formID"
                      class="bottom form-control"
                      v-model="dataAll.id"
                    />
                  </div>
                  <div v-else class="form form-group col-4">
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
                    <label for="formDesc" class="top">Description</label>
                    <input
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.description"
                    />
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
                v-on:click="register('submit', dataAll.id)"
              >
                <i class="fas fa-save"></i> Simpan
              </button>
            </div>
            <div v-if="editId !== null" class="modal-footer">
              <button class="btn btn-danger" v-on:click="isDeleteModal = true">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button
                class="btn btn-default"
                v-on:click="update('update', dataAll.id)"
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
        description: ""
      },
      editId: self.editIdProps,
      berhasil: true,
      uploaded: false,
      updated: false,
      deleted: false,
      isDeleteModal: false,
      userModal: false
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
      self.dataAll.id = null;
      self.dataAll.description = "";
      self.editId = null;
    },
    checkEdit() {
      let self = this;
      if (self.editId !== null) {
        Api.level
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
    register(setup, id) {
      let self = this;
      let rawData = {
        id: self.dataAll.id,
        description: self.dataAll.description
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (setup === "submit") {
        Api.level
          .register(formData)
          .then(resp => {
            if (resp.data.status === "success") {
              self.textTitle = "Data berhasil diunggah";
              self.berhasil = true;
              self.userModal = true;
            } else {
              self.textTitle = "Input belum masuk database";
              self.berhasil = false;
              self.userModal = true;
            }
          })
          .catch(err => {
            self.textTitle = "Input data salah, silahkan cek kembali";
            self.berhasil = false;
            self.userModal = true;
            console.log(err);
          });
      } else {
        Api.level
          .update(id, formData)
          .then(resp => {
            if (resp.data.status === "success") {
              self.textTitle = "Data berhasil diperbaharui";
              self.berhasil = true;
              self.userModal = true;
            } else {
              self.textTitle = "Input belum masuk database";
              self.berhasil = false;
              self.userModal = true;
            }
          })
          .catch(err => {
            self.textTitle = "Input data salah, silahkan cek kembali";
            self.berhasil = false;
            self.userModal = true;
            console.log(err);
          });
      }
    },
    deleteData() {
      let self = this;
      Api.level
        .delete(self.dataAll.id)
        .then(resp => {
          if (resp.status === 204) {
            self.berhasil = true;
            self.deleted = true;
            self.isDeleteModal = false;
            self.$emit("modal-closed");
          }
        })
        .catch(err => {
          console.log(err);
          self.berhasil = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
