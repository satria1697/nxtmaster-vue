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
                  <div class="form form-group col">
                    <label for="formAkses" class="top">ID Rawat Inap</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.idranap"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataRanap"
                        :key="data.id"
                        >{{ data.id }} - {{ data.idpasien }}</option
                      >
                    </select>
                  </div>
                  <div class="form form-group col-6">
                    <label for="formDesc" class="top">Tanggal Input</label>
                    <input
                      type="datetime-local"
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.tglinput"
                      @change="setTempoDate()"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formAkses" class="top">Dokter</label>
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
                  <div class="form form-group col">
                    <label for="formAkses" class="top">Perawat</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.idperawat"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataPerawat"
                        :key="data.id"
                        >{{ data.id }} - {{ data.namaperawat }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="row">
                  <vue-list-picker
                    :left-items="dataFormulir"
                    :right-items="confirmedFormulir"
                    title-left="Formulir Tersedia"
                    title-right="Formulir Terpilih"
                    content-key="id"
                    content-attr="description"
                    class="akses col"
                    button-class="btn btn-default btn-sm"
                    min-height="150px"
                    height="150px"
                    :titleCentered="false"
                    title-class="vue-picker-title-class"
                  />
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formAkses" class="top">Status</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formAkses"
                      v-model="dataAll.idstatus"
                    >
                      <option
                        :style="{ color: data.warna }"
                        :value="data.id"
                        v-for="data in dataStatus"
                        :key="data.id"
                        >{{ data.id }} - {{ data.description }}</option
                      >
                    </select>
                  </div>
                  <div class="form form-group col-4">
                    <label for="formDesc" class="top">Jatuh Tempo</label>
                    <input
                      type="datetime-local"
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.jatuhtempo"
                    />
                  </div>
                  <div class="form form-group col-4">
                    <label for="formDesc" class="top">Tanggal Lengkap</label>
                    <input
                      type="datetime-local"
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.tgllengkap"
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
    idranap: null,
    tglinput: "",
    iddokter: null,
    idperawat: null,
    idstatus: 4,
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
    dataStatus: {
      type: Array
    },
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
      confirmedFormulir: []
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
        Api.analisisrawatinap
          .find(self.editId)
          .then(resp => {
            self.dataAll = resp.data.data;
            // self.getDataFormulir();
            // console.log(self.dataAll.tglinput);
            if (self.dataAll.tglinput !== null) {
              self.dataAll.tglinput = self.dataAll.tglinput.replace(" ", "T");
            } else {
              self.dataAll.tglinput = "";
            }
            console.log(self.dataAll.jatuhtempo);
            if (self.dataAll.jatuhtempo !== null) {
              self.dataAll.jatuhtempo = self.dataAll.jatuhtempo.replace(
                " ",
                "T"
              );
            } else {
              self.dataAll.jatuhtempo = "";
            }
            if (self.dataAll.tgllengkap !== null) {
              self.dataAll.tgllengkap = self.dataAll.tgllengkap.replace(
                " ",
                "T"
              );
            } else {
              self.dataAll.tgllengkap = "";
            }
            self.dataAll.formulir.forEach(data => {
              self.confirmedFormulir.push(data);
            });
            self.dataFormulir = self.dataFormulir.filter(
              data => !self.confirmedFormulir.find(({ id }) => data.id === id)
            );
          })
          .catch(error => {
            console.log(error);
            self.reset();
          });
      }
    },
    register(status, id) {
      let self = this;
      let jsonFormulir = JSON.stringify(self.confirmedFormulir);
      let rawData = {
        idranap: self.dataAll.idranap,
        tglinput: self.dataAll.tglinput,
        iddokter: self.dataAll.iddokter,
        idperawat: self.dataAll.idperawat,
        idstatus: self.dataAll.idstatus,
        jatuhtempo: self.dataAll.jatuhtempo,
        tgllengkap: self.dataAll.tgllengkap,
        formulir: jsonFormulir
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
        Api.analisisrawatinap
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
      Api.analisisrawatinap
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
    setTempoDate() {
      let self = this;
      let date = new Date(self.dataAll.tglinput);
      let unixNewDate = (date.getTime() / 1000 + 24 * 60 * 60) * 1000;
      let newDate = new Date(unixNewDate);
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1;
      let day = newDate.getDay();
      let hour = newDate.getHours();
      let minute = newDate.getMinutes();
      if (day < 10) {
        day = "0" + day;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      let literallyNewDate =
        year + "-" + month + "-" + day + "T" + hour + ":" + minute;
      // console.log(year + "/" + month + "/" + day + " " + hour + ":" + minute);
      self.dataAll.jatuhtempo = literallyNewDate;
    },
    getDataFormulir() {
      let self = this;
      let params = {
        analisisid: self.editId
      }
      Api.analisisformulir
        .filter(params)
        .then(resp => {
          self.confirmedFormulir = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
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
