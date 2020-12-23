<template>
  <transition class="modal" tabindex="-1" role="dialog">
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
              <div class="container-fluid">
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
                    <label for="formtgll" class="top">Deskripsi</label>
                    <input
                      id="formtgll"
                      class="bottom form-control"
                      v-model="dataAll.description"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col-md">
                    <label for="formAkses" class="top">Formulir</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.formulirid"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataFormulir"
                        :key="data.id"
                        >{{ data.id }} - {{ data.description }}</option
                      >
                    </select>
                  </div>
                  <div class="form form-group col">
                    <label for="formtgll" class="top">Tingkatan</label>
                    <input
                      id="formtgll"
                      class="bottom form-control"
                      v-model="dataAll.keyid"
                    />
                  </div>
                  <div class="form-group form-check col">
                    <input
                      id="formActive"
                      class="form-check-input"
                      type="checkbox"
                      v-model="dataAll.keterangan"
                    />
                    <label for="formActive" class="form-check-label"
                      >Form Keterangan</label
                    >
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
    description: "",
    formulirid: null,
    keyid: 0,
    keterangan: null
  };
}

export default {
  props: {
    editId: {
      type: Number
    },
    title: {
      type: String
    },
    dataFormulir: {
      type: Array
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
  mounted() {
    this.checkEdit();
  },
  methods: {
    closeModal() {
      this.$emit("get-data");
      this.$emit("modal-closed");
    },
    reset() {
      this.dataAll = initialDataAll();
    },
    checkEdit() {
      if (this.editId !== null) {
        Api.formulirdata
          .find(this.editId)
          .then(resp => {
            this.dataAll = resp.data.data;
          })
          .catch(error => {
            console.log(error);
            this.reset();
          });
      }
    },
    register(status, id) {
      let rawData = {
        description: this.dataAll.description,
        formulirid: this.dataAll.formulirid,
        keyid: this.dataAll.keyid,
        keterangan: this.dataAll.keterangan === true ? 1 : 0
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (status === "submit") {
        Api.formulirdata
          .register(formData)
          .then(resp => {
            if (resp.data.status === "success") {
              this.textTitle = "Data berhasil disimpan";
              this.berhasil = true;
              this.isUserModal = true;
              this.reset();
              this.dataAll.keyid = parseInt(rawData.keyid) + 1;
            } else {
              this.berhasil = false;
              this.textTitle = "Terjadi kesalahan pada server";
              this.isUserModal = true;
            }
          })
          .catch(err => {
            if (err.status === 422) {
              this.textTitle =
                err.response.data.error[
                  Object.keys(err.response.data.error)[0]
                ];
            } else {
              this.textTitle = "Input data salah, silahkan cek kembali";
            }
            this.berhasil = false;
            this.isUserModal = true;
          });
      } else {
        Api.formulirdata
          .update(id, formData)
          .then(resp => {
            if (resp.data.status === "success") {
              this.textTitle = "Data berhasil diperbaharui";
              this.berhasil = true;
              this.isUserModal = true;
              this.reset();
            } else {
              this.berhasil = false;
              this.textTitle = "Terjadi kesalahan pada server";
              this.isUserModal = true;
            }
          })
          .catch(err => {
            if (err.status === 422) {
              this.textTitle =
                err.response.data.error[
                  Object.keys(err.response.data.error)[0]
                ];
            } else {
              this.textTitle = "Input data salah, silahkan cek kembali";
            }
            this.berhasil = false;
            this.isUserModal = true;
            console.log(err);
          });
      }
    },
    deleteData(id) {
      Api.formulirdata
        .delete(id)
        .then(resp => {
          console.log(resp);
          this.berhasil = true;
          this.deleted = true;
        })
        .catch(err => {
          console.log(err);
          this.berhasil = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
