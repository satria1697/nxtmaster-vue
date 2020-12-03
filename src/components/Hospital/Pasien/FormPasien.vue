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
                  <div class="form form-group col-4">
                    <label for="formNRM" class="top">Nomer Rekam Medis</label>
                    <input
                      id="formNRM"
                      class="bottom form-control"
                      v-model="dataAll.norm"
                    />
                  </div>
                  <div class="form form-group col-4">
                    <label for="formAkses" class="top">Jenis Kelamin</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.jeniskelamin"
                    >
                      <option value="0">Laki-laki</option>
                      <option value="1">Perempuan</option>
                    </select>
                  </div>
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
                    <label for="formNama" class="top">Nama Lengkap</label>
                    <input
                      id="formNama"
                      class="bottom form-control"
                      v-model="dataAll.namapasien"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col-5">
                    <label for="formTmptl" class="top">Tempat Lahir</label>
                    <input
                      id="formTmptl"
                      class="bottom form-control"
                      v-model="dataAll.tempatlahir"
                    />
                  </div>
                  <div class="form form-group col-5">
                    <label for="formtgll" class="top">Tanggal Lahir</label>
                    <input
                      type="date"
                      id="formtgll"
                      class="bottom form-control"
                      v-model="dataAll.tanggallahir"
                    />
                  </div>
                  <div class="form form-group col-2">
                    <label for="formTmptl" class="top">Usia</label>
                    <input
                      id="formTmptl"
                      class="bottom form-control"
                      v-model="dataAll.usia"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formhp" class="top">Alamat</label>
                    <input
                      id="formhp"
                      class="bottom form-control"
                      v-model="dataAll.alamat"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formhp" class="top">Asuransi</label>
                    <input
                      id="formhp"
                      class="bottom form-control"
                      v-model="dataAll.asuransi"
                    />
                  </div>
                  <div class="form form-group col">
                    <label for="formhp" class="top">Nomer Perserta</label>
                    <input
                      id="formhp"
                      class="bottom form-control"
                      v-model="dataAll.nopeserta"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formAkses" class="top">Agama</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.agama"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataAgama"
                        :key="data.id"
                        >{{ data.id }} - {{ data.description }}</option
                      >
                    </select>
                  </div>
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
                    <label for="formAkses" class="top"
                      >Pendidikan Terakhir</label
                    >
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.pendidikan"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataPendidikan"
                        :key="data.id"
                        >{{ data.id }} - {{ data.description }}</option
                      >
                    </select>
                  </div>
                  <div class="form form-group col">
                    <label for="formAkses" class="top">Pekerjaan</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.pekerjaan"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataPekerjaan"
                        :key="data.id"
                        >{{ data.id }} - {{ data.description }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formhp" class="top">Penganggung Jawab</label>
                    <input
                      id="formhp"
                      class="bottom form-control"
                      v-model="dataAll.penanggungjawab"
                    />
                  </div>
                  <div class="form form-group col">
                    <label for="formhp" class="top">Nomer Hp</label>
                    <input
                      id="formhp"
                      class="bottom form-control"
                      v-model="dataAll.nohppenanggungjawab"
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
    id: null,
    norm: "",
    namapasien: "",
    tempatlahir: "",
    tanggallahir: "",
    usia: "",
    jeniskelamin: null,
    agama: 0,
    alamat: "",
    idwilayah: "",
    pendidikan: "",
    pekerjaan: "",
    nohp: "",
    asuransi: "",
    nopeserta: "",
    penanggungjawab: ""
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
    dataAgama: {
      type: Array
    },
    dataPendidikan: {
      type: Array
    },
    dataPekerjaan: {
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
        Api.pasien
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
        norm: self.dataAll.norm,
        namapasien: self.dataAll.namapasien,
        tempatlahir: self.dataAll.tempatlahir,
        tanggallahir: self.dataAll.tanggallahir,
        usia: self.dataAll.usia,
        jeniskelamin: self.dataAll.jeniskelamin,
        agama: self.dataAll.agama,
        alamat: self.dataAll.alamat,
        idwilayah: self.dataAll.idwilayah,
        pendidikan: self.dataAll.pendidikan,
        pekerjaan: self.dataAll.pekerjaan,
        nohp: self.dataAll.nohp,
        asuransi: self.dataAll.asuransi,
        nopeserta: self.dataAll.nopeserta,
        penanggungjawab: self.dataAll.penanggungjawab
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (status === "submit") {
        Api.pasien
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
        Api.pasien
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
      Api.pasien
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
.modal {
  &-dialog {
    max-width: 800px;
  }
}
</style>
