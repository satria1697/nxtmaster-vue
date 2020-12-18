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
                  <div class="form form-group col-4">
                    <label for="formNRM" class="top">Nomer Rekam Medis</label>
                    <input
                      id="formNRM"
                      class="bottom form-control"
                      v-model="dataAll.norm"
                    />
                  </div>
                  <div class="form form-group col-4">
                    <label for="formjk" class="top">Jenis Kelamin</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formjk"
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
                  <div class="form form-group col-3">
                    <label for="formTmptl" class="top">Tempat Lahir</label>
                    <input
                      id="formTmptl"
                      class="bottom form-control"
                      v-model="dataAll.tempatlahir"
                    />
                  </div>
                  <div class="form form-group col-3">
                    <label for="formtgll" class="top">Tanggal Lahir</label>
                    <input
                      type="date"
                      id="formtgll"
                      class="bottom form-control"
                      v-model="dataAll.tanggallahir"
                      v-on:change="getUsia()"
                    />
                  </div>
                  <div class="form form-group col-6">
                    <label for="formusia" class="top top-disabled">Usia</label>
                    <input
                      id="formusia"
                      class="bottom form-control"
                      v-model="dataAll.usiafront"
                      disabled
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formalamat" class="top">Alamat</label>
                    <input
                      id="formalamat"
                      class="bottom form-control"
                      v-model="dataAll.alamat"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formasuransi" class="top">Asuransi</label>
                    <input
                      id="formasuransi"
                      class="bottom form-control"
                      v-model="dataAll.asuransi"
                    />
                  </div>
                  <div class="form form-group col">
                    <label
                      for="formnoperserta"
                      class="top"
                      :class="{ 'top-disabled': dataAll.asuransi === '' }"
                      >Nomer Perserta</label
                    >
                    <input
                      id="formnoperserta"
                      class="bottom form-control"
                      v-model="dataAll.nopeserta"
                      :disabled="dataAll.asuransi === ''"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formagama" class="top">Agama</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formagama"
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
                    <label for="formpendidikan" class="top"
                      >Pendidikan Terakhir</label
                    >
                    <select
                      class="form-control bottom custom-select"
                      id="formpendidikan"
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
                    <label for="formpekerjaan" class="top">Pekerjaan</label>
                    <select
                      class="form-control bottom custom-select"
                      id="formpekerjaan"
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
                    <label for="formpj" class="top">Penganggung Jawab</label>
                    <input
                      id="formpj"
                      class="bottom form-control"
                      v-model="dataAll.penanggungjawab"
                    />
                  </div>
                  <div class="form form-group col">
                    <label for="fomhppj" class="top">Nomer Hp</label>
                    <input
                      id="fomhppj"
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
    usiafront: "",
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
        Api.pasien
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
        norm: this.dataAll.norm,
        namapasien: this.dataAll.namapasien,
        tempatlahir: this.dataAll.tempatlahir,
        tanggallahir: this.dataAll.tanggallahir,
        usia: this.dataAll.usia,
        jeniskelamin: this.dataAll.jeniskelamin,
        agama: this.dataAll.agama,
        alamat: this.dataAll.alamat,
        idwilayah: this.dataAll.idwilayah,
        pendidikan: this.dataAll.pendidikan,
        pekerjaan: this.dataAll.pekerjaan,
        nohp: this.dataAll.nohp,
        asuransi: this.dataAll.asuransi,
        nopeserta: this.dataAll.nopeserta,
        penanggungjawab: this.dataAll.penanggungjawab
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
        Api.pasien
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
      Api.pasien
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
    getUsia() {
      var now = new Date();
      var yearNow = now.getYear();
      var monthNow = now.getMonth();
      var dateNow = now.getDate();

      let date = new Date(this.dataAll.tanggallahir);
      var yearDob = date.getYear();
      var monthDob = date.getMonth();
      var dateDob = date.getDate();

      let yearAge = yearNow - yearDob;

      if (monthNow >= monthDob) var monthAge = monthNow - monthDob;
      else {
        yearAge--;
        monthAge = 12 + monthNow - monthDob;
      }

      if (dateNow >= dateDob) var dateAge = dateNow - dateDob;
      else {
        monthAge--;
        dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
          monthAge = 11;
          yearAge--;
        }
      }

      const age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
      };
      this.dataAll.usia = age.years + "." + age.months + "." + age.days;
      this.dataAll.usiafront =
        age.years + " tahun " + age.months + " bulan " + age.days + " hari ";
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
