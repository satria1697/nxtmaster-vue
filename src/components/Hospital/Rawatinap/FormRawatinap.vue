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
                  <div class="form form-group col-4">
                    <label for="formAkses" class="top">Nama Pasien</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.idpasien"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataPasien"
                        :key="data.id"
                        >{{ data.id }} - {{ data.namapasien }}</option
                      >
                    </select>
                  </div>
                  <div class="form form-group col-4">
                    <label for="formtgll" class="top">Tanggal Masuk</label>
                    <input
                      type="datetime-local"
                      id="formtgll"
                      class="bottom form-control"
                      v-model="dataAll.tglmasuk"
                    />
                  </div>
                  <div class="form form-group col-4">
                    <label for="formtgll" class="top">Tanggal Keluar</label>
                    <input
                      type="datetime-local"
                      id="formtgll"
                      class="bottom form-control"
                      v-model="dataAll.tglkeluar"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col-4">
                    <label for="formAkses" class="top">Kelas Rawat Inap</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.idkelas"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataKelasrawatinap"
                        :key="data.id"
                        >{{ data.id }} - {{ data.description }}</option
                      >
                    </select>
                  </div>
                  <div class="form form-group col-4">
                    <label for="formAkses" class="top">Bangsal</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.idbangsal"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataBangsal"
                        :key="data.id"
                        >{{ data.id }} - {{ data.description }}</option
                      >
                    </select>
                  </div>
                  <div class="form form-group col-4">
                    <label for="formAkses" class="top">Kamar Rawat Inap</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.idkamar"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataKamarrawatinap"
                        :key="data.id"
                        >{{ data.id }} - {{ data.description }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col-10">
                    <label for="formAkses" class="top"
                      >Dokter yang Menangani</label
                    >
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.iddokter"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataDokter"
                        :key="data.id"
                        >{{ data.id }} - {{ data.namadokter }}</option
                      >
                    </select>
                  </div>
                  <div class="form form-group col-2">
                    <label for="formAkses" class="top">Cara Masuk</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.jeniskasus"
                    >
                      <option value="1">Baru</option>
                      <option value="2">Lama</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formhp" class="top">Tindakan</label>
                    <textarea
                      id="formhp"
                      class="bottom form-control"
                      v-model="dataAll.tindakan"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col-4">
                    <label for="formAkses" class="top">Cara Masuk</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.caramasuk"
                    >
                      <option value="1">Poliklinik</option>
                      <option value="2">IGD</option>
                    </select>
                  </div>
                  <div class="form form-group col-4">
                    <label for="formAkses" class="top">Keterangan Pulang</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.ketpulang"
                    >
                      <option value="1">APS</option>
                      <option value="2">Sembuh</option>
                      <option value="3">Dirujuk</option>
                      <option value="4">Meninggal</option>
                    </select>
                  </div>
                  <div class="form form-group col-4">
                    <label for="formAkses" class="top">Cara Pembayaran</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.carabayar"
                    >
                      <option value="1">BPJS</option>
                      <option value="2">CASH</option>
                      <option value="3">Asuransi Lain</option>
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
    idpasien: null,
    tglmasuk: "",
    tglkeluar: "",
    idkelas: null,
    idbangsal: null,
    idkamar: null,
    iddokter: null,
    jeniskasus: null,
    tindakan: "",
    caramasuk: null,
    ketpulang: null,
    carabayar: null
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
    dataPasien: {
      type: Array
    },
    dataKelasrawatinap: {
      type: Array
    },
    dataBangsal: {
      type: Array
    },
    dataKamarrawatinap: {
      type: Array
    },
    dataDokter: {
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
        Api.rawatinap
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
        tglmasuk: self.dataAll.tglmasuk,
        idpasien: self.dataAll.idpasien,
        tglkeluar: self.dataAll.tglkeluar,
        idkelas: self.dataAll.idkelas,
        idbangsal: self.dataAll.idbangsal,
        idkamar: self.dataAll.idkamar,
        iddokter: self.dataAll.iddokter,
        jeniskasus: self.dataAll.jeniskasus,
        tindakan: self.dataAll.tindakan,
        caramasuk: self.dataAll.caramasuk,
        ketpulang: self.dataAll.ketpulang,
        carabayar: self.dataAll.carabayar
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (status === "submit") {
        Api.rawatinap
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
        Api.rawatinap
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
      Api.rawatinap
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
