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
                  <div class="form form-group col-4">
                    <label for="formnamapasien" class="top">Nomer RM</label>
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
                        >{{ data.id }} - {{ data.norm }}</option
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
                  <div class="form form-group col-4">
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
                  <div class="form form-group col-4">
                    <label for="formmasuk" class="top">Jenis Kasus</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formmasuk"
                      v-model="dataAll.jeniskasus"
                    >
                      <option value="1">Baru</option>
                      <option value="2">Lama</option>
                    </select>
                  </div>
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
        Api.rawatinap
          .find(this.editId)
          .then(resp => {
            this.dataAll = resp.data.data;
            if (this.dataAll.tglmasuk !== null) {
              this.dataAll.tglmasuk = this.dataAll.tglmasuk.replace(" ", "T");
            } else {
              this.dataAll.tglmasuk = "";
            }
            if (this.dataAll.tglkeluar !== null) {
              this.dataAll.tglkeluar = this.dataAll.tglkeluar.replace(" ", "T");
            } else {
              this.dataAll.tglkeluar = "";
            }
            if (resp.data.data.operasi === null) {
              this.dataAll.operasi = {
                iddokter: null,
                idperawat: null,
                tgloperasi: "",
                iddokteranastesi: null,
                jenisanestesi: "",
                tindakan: ""
              };
            }
            if (this.dataAll.operasi.tgloperasi !== null) {
              this.dataAll.operasi.tgloperasi = this.dataAll.operasi.tgloperasi.replace(
                " ",
                "T"
              );
            } else {
              this.dataAll.operasi.tgloperasi = "";
            }
          })
          .catch(error => {
            console.log(error);
            this.reset();
          });
      }
    },
    register(status, id) {
      let operasi = {
        dokter_id: this.dataAll.operasi.dokter_id,
        perawat_id: this.dataAll.operasi.perawat_id,
        tgloperasi: this.dataAll.operasi.tgloperasi.replace("T", " "),
        dokteranestesi_id: this.dataAll.operasi.dokteranestesi_id,
        jenisanestesi: this.dataAll.operasi.jenisanestesi,
        tindakan: this.dataAll.operasi.tindakan
      };
      let operasiJson = JSON.stringify(operasi);
      let rawData = {
        tglmasuk: this.dataAll.tglmasuk.replace("T", " "),
        pasien_id: this.dataAll.pasien_id,
        norm: this.dataAll.pasien.norm,
        tglkeluar: this.dataAll.tglkeluar.replace("T", " "),
        kelas_id: this.dataAll.kelas_id,
        bangsal_id: this.dataAll.bangsal_id,
        kamar_id: this.dataAll.kamar_id,
        dokter_id: this.dataAll.dokter_id,
        jeniskasus: this.dataAll.jeniskasus,
        tindakan: this.dataAll.tindakan,
        caramasuk: this.dataAll.caramasuk,
        ketpulang: this.dataAll.ketpulang,
        carabayar: this.dataAll.carabayar,
        operasi_id: this.dataAll.operasi_id,
        isoperasi: this.formOperasi === true ? 1 : 0,
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
        Api.rawatinap
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
      Api.rawatinap
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
    },
    getDataPasien() {
      Api.pasien
        .find(this.dataAll.pasien_id)
        .then(resp => {
          if (resp.status === 200) {
            this.dataAll.pasien = resp.data.data;
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
