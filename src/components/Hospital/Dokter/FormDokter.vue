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
                    <label for="formNama" class="top">Nama Dokter</label>
                    <input
                      id="formNama"
                      class="bottom form-control"
                      v-model="dataAll.namadokter"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formhp" class="top">Nomer Hp</label>
                    <input
                      id="formhp"
                      class="bottom form-control"
                      v-model="dataAll.nohp"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formAkses" class="top">Spesialisasi</label>
                    <v-select
                      :options="dataSpesialisasi"
                      label="description"
                      v-model="dataAll.spesialisasi"
                    ></v-select>
                    <!--                    <select-->
                    <!--                      class="form-control bottom custom-select"-->
                    <!--                      id="formAkses"-->
                    <!--                      v-model="dataAll.idspesialisasi"-->
                    <!--                    >-->
                    <!--                      <option-->
                    <!--                        :value="data.id"-->
                    <!--                        v-for="data in dataSpesialisasi"-->
                    <!--                        :key="data.id"-->
                    <!--                        >{{ data.id }} - {{ data.spesialisasi }}</option-->
                    <!--                      >-->
                    <!--                    </select>-->
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
    id: null,
    namadokter: "",
    nohp: null,
    idspesialisasi: null,
    spesialisasi: {
      id: null,
      spesialisasi: ""
    }
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
    dataSpesialisasi: {
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
        Api.dokter
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
        namadokter: this.dataAll.namadokter,
        nohp: this.dataAll.nohp,
        idspesialisasi: this.dataAll.idspesialisasi
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (status === "submit") {
        Api.dokter
          .register(formData)
          .then(resp => {
            if (resp.data.status === "success") {
              this.textTitle = "Data berhasil disimpan";
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
          });
      } else {
        Api.dokter
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
      Api.dokter
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
