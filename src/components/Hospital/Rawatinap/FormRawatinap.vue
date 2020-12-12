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
                    <label for="formnamapasien" class="top">Nama Pasien</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formnamapasien"
                      v-model="dataAll.pasien_id"
                      v-on:change="getDataPasien()"
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
                    <label for="formtglmsk" class="top">Tanggal Masuk</label>
                    <input
                      type="datetime-local"
                      id="formtglmsk"
                      class="bottom form-control"
                      v-model="dataAll.tglmasuk"
                    />
                  </div>
                  <div class="form form-group col-4">
                    <label for="formtglkeluar" class="top"
                      >Tanggal Keluar</label
                    >
                    <input
                      type="datetime-local"
                      id="formtglkeluar"
                      class="bottom form-control"
                      v-model="dataAll.tglkeluar"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col-4">
                    <label for="formkelranap" class="top"
                      >Kelas Rawat Inap</label
                    >
                    <select
                      class="form-control bottom custom-select"
                      id="formkelranap"
                      v-model="dataAll.kelas_id"
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
                    <label for="formbangsal" class="top">Bangsal</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formbangsal"
                      v-model="dataAll.bangsal_id"
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
                    <label for="formkamarranap" class="top"
                      >Kamar Rawat Inap</label
                    >
                    <select
                      class="form-control bottom custom-select"
                      id="formkamarranap"
                      v-model="dataAll.kamar_id"
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
                    <label for="formdpjp" class="top"
                      >Dokter Penanggung Jawab</label
                    >
                    <select
                      class="form-control bottom custom-select"
                      id="formdpjp"
                      v-model="dataAll.dokter_id"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataDokter"
                        :key="data.id"
                        >{{ data.id }} - {{ data.nama }}</option
                      >
                    </select>
                  </div>
                  <div class="form form-group col-2">
                    <label for="formmasuk" class="top">Cara Masuk</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formmasuk"
                      v-model="dataAll.jeniskasus"
                    >
                      <option value="1">Baru</option>
                      <option value="2">Lama</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formtindakan" class="top">Tindakan</label>
                    <textarea
                      id="formtindakan"
                      class="bottom form-control"
                      v-model="dataAll.tindakan"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col-4">
                    <label for="formhowto" class="top">Cara Masuk</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formhowto"
                      v-model="dataAll.caramasuk"
                    >
                      <option value="1">Poliklinik</option>
                      <option value="2">IGD</option>
                    </select>
                  </div>
                  <div class="form form-group col-4">
                    <label for="formpulang" class="top"
                      >Keterangan Pulang</label
                    >
                    <select
                      class="form-control bottom custom-select"
                      id="formpulang"
                      v-model="dataAll.ketpulang"
                    >
                      <option value="1">APS</option>
                      <option value="2">Sembuh</option>
                      <option value="3">Dirujuk</option>
                      <option value="4">Meninggal</option>
                    </select>
                  </div>
                  <div class="form form-group col-4">
                    <label for="formbayar" class="top">Cara Pembayaran</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formbayar"
                      v-model="dataAll.carabayar"
                    >
                      <option value="1">BPJS</option>
                      <option value="2">CASH</option>
                      <option value="3">Asuransi Lain</option>
                    </select>
                  </div>
                </div>
                <div v-if="formOperasi">
                  <div class="row">
                    <div class="col">
                      <h5>Form Operasi</h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form form-group col-4">
                      <label for="formtglmsk" class="top"
                        >Tanggal Operasi</label
                      >
                      <input
                        type="datetime-local"
                        id="formtglmsk"
                        class="bottom form-control"
                        v-model="dataAll.operasi.tgloperasi"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form form-group col-6">
                      <label for="formdpjp" class="top"
                        >Dokter Penanggung Jawab</label
                      >
                      <select
                        class="form-control bottom custom-select"
                        id="formdpjp"
                        v-model="dataAll.operasi.dokter_id"
                      >
                        <option
                          :value="data.id"
                          v-for="data in dataDokter"
                          :key="data.id"
                          >{{ data.id }} - {{ data.nama }}</option
                        >
                      </select>
                    </div>
                    <div class="form form-group col-6">
                      <label for="formdpjp" class="top">Dokter Anestesi</label>
                      <select
                        class="form-control bottom custom-select"
                        id="formdpjp"
                        v-model="dataAll.operasi.dokteranestesi_id"
                      >
                        <option
                          :value="data.id"
                          v-for="data in dataDokterAnestesi"
                          :key="data.id"
                          >{{ data.id }} - {{ data.nama }}</option
                        >
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form form-group col-6">
                      <label for="formdpjp" class="top">Perawat</label>
                      <select
                        class="form-control bottom custom-select"
                        id="formdpjp"
                        v-model="dataAll.operasi.perawat_id"
                      >
                        <option
                          :value="data.id"
                          v-for="data in dataPerawat"
                          :key="data.id"
                          >{{ data.id }} - {{ data.nama }}</option
                        >
                      </select>
                    </div>
                    <div class="form form-group col">
                      <label for="formtindakan" class="top"
                        >Jenis Anestesi</label
                      >
                      <input
                        id="formtindakan"
                        class="bottom form-control"
                        v-model="dataAll.operasi.jenisanestesi"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form form-group col">
                      <label for="formtindakan" class="top">Tindakan</label>
                      <textarea
                        id="formtindakan"
                        class="bottom form-control"
                        v-model="dataAll.operasi.tindakan"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <button
                      class="btn btn-default"
                      @click="formOperasi = false"
                      v-if="formOperasi"
                    >
                      Batal
                    </button>
                    <button
                      class="btn btn-default"
                      @click="formOperasi = true"
                      v-else
                    >
                      Operasi
                    </button>
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
    pasien_id: null,
    pasien: {
      id: null,
      norm: ""
    },
    tglmasuk: "",
    tglkeluar: "",
    kelas_id: null,
    kelas: {
      id: null,
      desription: ""
    },
    bangsal_id: null,
    bangsal: {
      id: null,
      description: ""
    },
    kamar_id: null,
    dokter_id: null,
    dokter: {
      id: null,
      namadokter: "",
      nohp: ""
    },
    jeniskasus: null,
    tindakan: "",
    caramasuk: null,
    ketpulang: null,
    carabayar: null,
    idoperasi: null,
    operasi: {
      dokter_id: null,
      perawat_id: null,
      tgloperasi: "",
      dokteranestesi_id: null,
      jenisanestesi: "",
      tindakan: ""
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
    },
    dataPerawat: {
      type: Array
    },
    dataDokterAnestesi: {
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
      isUserModal: false,
      formOperasi: false
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
            if (self.dataAll.tglmasuk !== null) {
              self.dataAll.tglmasuk = self.dataAll.tglmasuk.replace(" ", "T");
            } else {
              self.dataAll.tglmasuk = "";
            }
            if (self.dataAll.tglkeluar !== null) {
              self.dataAll.tglkeluar = self.dataAll.tglkeluar.replace(" ", "T");
            } else {
              self.dataAll.tglkeluar = "";
            }
            if (resp.data.data.operasi === null) {
              self.dataAll.operasi = {
                iddokter: null,
                idperawat: null,
                tgloperasi: "",
                iddokteranastesi: null,
                jenisanestesi: "",
                tindakan: ""
              };
            }
            if (self.dataAll.operasi.tgloperasi !== null) {
              self.dataAll.operasi.tgloperasi = self.dataAll.operasi.tgloperasi.replace(
                " ",
                "T"
              );
            } else {
              self.dataAll.operasi.tgloperasi = "";
            }
          })
          .catch(error => {
            console.log(error);
            self.reset();
          });
      }
    },
    register(status, id) {
      let self = this;
      let operasi = {
        dokter_id: self.dataAll.operasi.dokter_id,
        perawat_id: self.dataAll.operasi.perawat_id,
        tgloperasi: self.dataAll.operasi.tgloperasi,
        dokteranestesi_id: self.dataAll.operasi.dokteranestesi_id,
        jenisanestesi: self.dataAll.operasi.jenisanestesi,
        tindakan: self.dataAll.operasi.tindakan
      };
      let operasiJson = JSON.stringify(operasi);
      let rawData = {
        tglmasuk: self.dataAll.tglmasuk,
        pasien_id: self.dataAll.pasien_id,
        norm: self.dataAll.pasien.norm,
        tglkeluar: self.dataAll.tglkeluar,
        kelas_id: self.dataAll.kelas_id,
        bangsal_id: self.dataAll.bangsal_id,
        kamar_id: self.dataAll.kamar_id,
        dokter_id: self.dataAll.dokter_id,
        jeniskasus: self.dataAll.jeniskasus,
        tindakan: self.dataAll.tindakan,
        caramasuk: self.dataAll.caramasuk,
        ketpulang: self.dataAll.ketpulang,
        carabayar: self.dataAll.carabayar,
        operasi_id: self.dataAll.operasi_id,
        isoperasi: self.formOperasi === true ? 1 : 0,
        operasi: operasiJson
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
    },
    getDataPasien() {
      let self = this;
      Api.pasien
        .find(self.dataAll.pasien_id)
        .then(resp => {
          if (resp.status === 200) {
            self.dataAll.pasien = resp.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
