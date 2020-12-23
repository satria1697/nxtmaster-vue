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
                  <div class="form form-group col-md-4">
                    <label for="formAkses" class="top">No RM</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.idranap"
                      v-on:change="setTempoDate()"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataRanap"
                        :key="data.id"
                        >{{ data.id }} - {{ data.norm }}</option
                      >
                    </select>
                  </div>
                  <div class="form form-group col-md-4">
                    <label for="tglkeluar" class="top">Tanggal Keluar</label>
                    <input
                      type="datetime-local"
                      id="tglkeluar"
                      class="bottom form-control"
                      v-model="dataAll.ranap.tglkeluar"
                    />
                  </div>
                  <div class="form form-group col-md-4">
                    <label for="formDesc" class="top">Tanggal Input</label>
                    <input
                      type="datetime-local"
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.tglinput"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col-md">
                    <label for="formdokter" class="top">Dokter</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formdokter"
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
                  <div class="form form-group col-md">
                    <label for="formperawat" class="top">Perawat</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formperawat"
                      v-model="dataAll.perawat_id"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataPerawat"
                        :key="data.id"
                        >{{ data.id }} - {{ data.nama }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="row">
                  <vue-list-picker
                    :left-items="dataFormulirAll"
                    :right-items="confirmedFormulir"
                    title-left="Formulir Tersedia"
                    title-right="Formulir Terpilih"
                    content-key="id"
                    content-attr="description"
                    class="akses col"
                    button-class="btn btn-default btn-sm"
                    min-height="150px"
                    height="150px"
                    min-width="100px"
                    :titleCentered="false"
                    title-class="vue-picker-title-class"
                  />
                </div>
                <div class="row">
                  <div class="form form-group col-md-4">
                    <label for="formjatuhtempo" class="top">Jatuh Tempo</label>
                    <input
                      type="datetime-local"
                      id="formjatuhtempo"
                      class="bottom form-control"
                      v-model="dataAll.jatuhtempo"
                    />
                  </div>
                  <div class="form form-group col-md-4">
                    <label for="formtgllengkap" class="top"
                      >Tanggal Lengkap</label
                    >
                    <input
                      type="datetime-local"
                      id="formtgllengkap"
                      class="bottom form-control"
                      v-model="dataAll.tgllengkap"
                      @change="setStatus()"
                    />
                  </div>
                  <div
                    class="form form-group col-md-4"
                    v-if="
                      dataAll.tgllengkap !== '' || dataAll.tgllengkap !== null
                    "
                  >
                    <label for="formtgll" class="top top-disabled"
                      >Status</label
                    >
                    <input
                      id="formtgll"
                      class="bottom form-control"
                      v-model="dataAll.statuskelengkapan.description"
                      :style="{ color: dataAll.statuskelengkapan.warna }"
                      disabled
                    />
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
    </div>
  </transition>
</template>

<script>
import Api from "../../../api";
import moment from "moment";

function initialDataAll() {
  return {
    id: null,
    idranap: null,
    ranap: {
      tglkeluar: ""
    },
    tglinput: "",
    perawat_id: null,
    dokter_id: null,
    idstatus: 0,
    statuskelengkapan: {
      description: "",
      warna: "black"
    },
    jatuhtempo: "",
    tgllengkap: ""
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
    },
    dataDokter: {
      type: Array
    },
    dataPerawat: {
      type: Array
    },
    // dataStatus: {
    //   type: Array
    // },
    dataRanap: {
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
      confirmedFormulir: [],
      dataFormulirAll: []
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
      this.dataFormulirAll = this.dataFormulir;
      this.confirmedFormulir = [];
    },
    checkEdit() {
      if (this.editId !== null) {
        Api.analisisrawatinap
          .find(this.editId)
          .then(resp => {
            this.dataAll = resp.data.data;
            if (this.dataAll.tglinput !== null) {
              this.dataAll.tglinput = this.dataAll.tglinput.replace(" ", "T");
            } else {
              this.dataAll.tglinput = "";
            }
            if (this.dataAll.ranap.tglkeluar !== null) {
              this.dataAll.ranap.tglkeluar = this.dataAll.ranap.tglkeluar.replace(
                " ",
                "T"
              );
            } else {
              this.dataAll.ranap.tglkeluar = "";
            }
            if (this.dataAll.jatuhtempo !== null) {
              this.dataAll.jatuhtempo = this.dataAll.jatuhtempo.replace(
                " ",
                "T"
              );
            } else {
              this.dataAll.jatuhtempo = "";
            }
            if (this.dataAll.tgllengkap !== null) {
              this.dataAll.tgllengkap = this.dataAll.tgllengkap.replace(
                " ",
                "T"
              );
            } else {
              this.dataAll.tgllengkap = "";
            }
            this.dataAll.formulir.forEach(data => {
              this.confirmedFormulir.push(data);
            });
            this.dataFormulirAll = this.dataFormulir.filter(
              data => !this.confirmedFormulir.find(({ id }) => data.id === id)
            );
            this.setTempoDate();
          })
          .catch(error => {
            console.log(error);
            this.reset();
          });
      } else {
        this.dataFormulirAll = this.dataFormulir;
      }
    },
    register(status, id) {
      let jsonFormulir = JSON.stringify(this.confirmedFormulir);
      let rawData = {
        idranap: this.dataAll.idranap,
        tglinput: this.dataAll.tglinput,
        dokter_id: this.dataAll.dokter_id,
        perawat_id: this.dataAll.perawat_id,
        idstatus: this.dataAll.idstatus,
        jatuhtempo: this.dataAll.jatuhtempo,
        tgllengkap: this.dataAll.tgllengkap,
        formulir: jsonFormulir,
        tglkeluar: this.dataAll.ranap.tglkeluar
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (status === "submit") {
        Api.analisisrawatinap
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
        Api.analisisrawatinap
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
      Api.analisisrawatinap
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
    setTempoDate() {
      // console.log(data);
      Api.rawatinap
        .find(this.dataAll.idranap)
        .then(resp => {
          this.dataAll.ranap.tglkeluar = moment(
            resp.data.data.tglkeluar
          ).format("YYYY-MM-DDThh:mm");
          let newdate = moment(this.dataAll.ranap.tglkeluar)
            .add(2, "days")
            .format("YYYY-MM-DDThh:mm");
          this.dataAll.jatuhtempo = newdate;
          this.setStatus();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataFormulir() {
      let params = {
        analisisid: this.editId
      };
      Api.analisisformulir
        .filter(params)
        .then(resp => {
          this.confirmedFormulir = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    setStatus() {
      let a = moment(this.dataAll.ranap.tglkeluar);
      let b = moment(this.dataAll.tgllengkap);
      let duration = moment.duration(b.diff(a));
      let hours = duration.asHours();
      let status = 0;
      if (this.dataAll.tgllengkap === "" || this.dataAll.tgllengkap === null) {
        status = 4;
      } else if (hours <= 24 && hours >= 0) {
        status = 1;
      } else if (hours <= 48 && hours > 24) {
        status = 2;
      } else if (hours > 48) {
        status = 3;
      }
      // console.log(status);
      Api.statuskelengkapan
        .find(status)
        .then(resp => {
          this.dataAll.idstatus = status;
          this.dataAll.statuskelengkapan = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });

      console.log(this.dataAll.idstatus);
    }
  }
};
</script>

<style lang="scss" scoped>
.akses {
  margin-bottom: 10px;
  ::v-deep .list-picker-item {
    border: none;
    padding: 3px;
  }
}
</style>
