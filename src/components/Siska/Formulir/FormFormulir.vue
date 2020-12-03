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
                v-if="isUserModal"
                :title="textTitle"
                :textSuccess="berhasil"
                :textDanger="!berhasil"
                @modal-closed="isUserModal = false"
              />
              <delete-modal
                :data="dataAll"
                v-if="isDeleteModal"
                @modal-closed="isDeleteModal = false"
                @delete-data="deleteData"
              />
              <div class="container">
                <div class="row">
                  <div class="form form-group col" v-if="editId !== null">
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
                  <div class="form form-group col">
                    <label for="formtgll" class="top">Jenis Formulir</label>
                    <input
                      id="formtgll"
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
                v-on:click="register('submit', null)"
              >
                <i class="fas fa-save"></i> Simpan
              </button>
            </div>
            <div v-if="editId !== null" class="modal-footer">
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
import Api from "../../../api";

function initialDataAll() {
  return {
    description: ""
  };
}

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
      dataAll: initialDataAll(),
      berhasil: true,
      uploaded: false,
      updated: false,
      deleted: false,
      isDeleteModal: false,
      textTitle: "",
      isUserModal: false
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
    self.checkEdit();
  },
  methods: {
    closeModal() {
      let self = this;
      self.$emit("get-data");
      self.$emit("modal-closed");
    },
    reset() {
      let self = this;
      self.dataAll = initialDataAll();
    },
    checkEdit() {
      let self = this;
      if (self.editId !== null) {
        Api.formulir
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
      let rawData = {
        description: self.dataAll.description
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (status === "submit") {
        Api.formulir
          .register(formData)
          .then(resp => {
            if (resp.data.status === "success") {
              self.textTitle = "Data berhasil disimpan";
              self.berhasil = true;
              self.isUserModal = true;
              self.reset();
            } else {
              self.berhasil = false;
              self.textTitle = "Terjadi kesalahan pada server";
              self.isUserModal = true;
            }
          })
          .catch(err => {
            if (err.status === 422) {
              self.textTitle =
                err.response.data.error[
                  Object.keys(err.response.data.error)[0]
                ];
            } else {
              self.textTitle = "Input data salah, silahkan cek kembali";
            }
            self.berhasil = false;
            self.isUserModal = true;
          });
      } else {
        Api.formulir
          .update(id, formData)
          .then(resp => {
            if (resp.data.status === "success") {
              self.textTitle = "Data berhasil diperbaharui";
              self.berhasil = true;
              self.isUserModal = true;
              self.reset();
            } else {
              self.berhasil = false;
              self.textTitle = "Terjadi kesalahan pada server";
              self.isUserModal = true;
            }
          })
          .catch(err => {
            if (err.status === 422) {
              self.textTitle =
                err.response.data.error[
                  Object.keys(err.response.data.error)[0]
                ];
            } else {
              self.textTitle = "Input data salah, silahkan cek kembali";
            }
            self.berhasil = false;
            self.isUserModal = true;
            console.log(err);
          });
      }
    },
    deleteData(id) {
      let self = this;
      Api.formulir
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

<style lang="scss" scoped></style>
