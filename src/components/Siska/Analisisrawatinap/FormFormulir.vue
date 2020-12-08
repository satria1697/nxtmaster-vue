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
                <div
                  class="row"
                  v-for="(data, index) in formulirData"
                  :key="data.id"
                >
                  <div class="col">
                    <h5>{{ data.description }}</h5>
                    <!--                    <div-->
                    <!--                      class="row"-->
                    <!--                      v-for="(datas, indexs) in data.formulirdata"-->
                    <!--                      :key="datas.id"-->
                    <!--                    >-->
                    <!--                      <div class="col-2">-->
                    <!--                        {{ datas.description }}-->
                    <!--                      </div>-->
                    <!--                      <div class="col-10">-->
                    <!--                        <div-->
                    <!--                          class="form-check form-check-inline"-->
                    <!--                          v-for="dataz in dataStatus"-->
                    <!--                          :key="dataz.id"-->
                    <!--                        >-->
                    <!--                          <input-->
                    <!--                            class="form-check-input"-->
                    <!--                            type="radio"-->
                    <!--                            :name="'inlineCheckboxOptions' + index + indexs"-->
                    <!--                            :id="'inlineCheckbox' + index + indexs"-->
                    <!--                            :value="dataz.id"-->
                    <!--                            v-model="checkedbox[index].value[indexs].value"-->
                    <!--                            v-on:change="-->
                    <!--                              checkedbox[index].value[indexs].nilai =-->
                    <!--                                dataz.nilai-->
                    <!--                            "-->
                    <!--                          />-->
                    <!--                          <label-->
                    <!--                            class="form-check-label"-->
                    <!--                            :style="{ color: dataz.warna }"-->
                    <!--                            :for="'inlineCheckbox' + index + indexs"-->
                    <!--                            >{{ dataz.description }}</label-->
                    <!--                          >-->
                    <!--                        </div>-->
                    <!--                      </div>-->
                    <!--                    </div>-->

                    <table class="table table-responsive-md table-striped mb-4">
                      <thead>
                        <tr>
                          <th style="width: 38%">Deskripsi</th>
                          <th
                            v-for="dataz in dataStatus"
                            :key="dataz.id"
                            :style="{ color: dataz.warna }"
                            style="width: 20%"
                          >
                            {{ dataz.description }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(datas, indexs) in data.formulirdata"
                          :key="datas.id"
                        >
                          <td>{{ datas.description }}</td>
                          <td v-for="dataz in dataStatus" :key="dataz.id">
                            <input
                              class="form-check-input"
                              type="radio"
                              :name="'inlineCheckboxOptions' + index + indexs"
                              :value="dataz.id"
                              v-model="checkedbox[index].value[indexs].value"
                              v-on:change="
                                checkedbox[index].value[indexs].nilai =
                                  dataz.nilai
                              "
                              style="margin: 0 auto"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!edit" class="modal-footer">
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
            <div v-else class="modal-footer">
              <button
                class="btn btn-default float-left"
                v-on:click="isDeleteModal = true"
              >
                <i class="fas fa-trash"></i> Delete
              </button>
              <button
                class="btn btn-default"
                v-on:click="register('update', dataFormulir.id)"
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
// import FormFormulirData from './FormFormulirData.vue';

function initialDataAll() {
  return {
    // description: ""
  };
}

export default {
  // components: { FormFormulirData },
  props: {
    title: {
      type: String
    },
    editId: {
      type: Number
    },
    dataFormulir: {
      type: Object
    },
    dataStatus: {
      type: Array
    }
  },
  data() {
    // let self = this;
    return {
      dataAll: initialDataAll(),
      berhasil: true,
      uploaded: false,
      updated: false,
      deleted: false,
      isDeleteModal: false,
      textTitle: "",
      isUserModal: false,
      isFormulirDataModal: false,
      editFormulirId: null,
      checkedbox: [],
      formulirData: [],
      needForm: [],
      totalData: 0,
      edit: false
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
    self.dataFormulir.formulir.forEach(data => {
      self.needForm.push(data.id);
    });
    self.getData(self.needForm);
    self.checkEdit(self.needForm);
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
    checkEdit(form) {
      let self = this;
      let jsonForm = JSON.stringify(form);
      const params = {
        formulirid: jsonForm,
        column: "keyid"
      };
      Api.analisisdata
        .find(self.dataFormulir.id, params)
        .then(resp => {
          if (resp.status === 200) {
            self.edit = true;
            self.dataAll = resp.data.data;
            self.checkedbox = resp.data.data;
          }
        })
        .catch(error => {
          console.log(error);
          self.reset();
        });
    },
    getData(form) {
      let self = this;
      let jsonForm = JSON.stringify(form);
      const params = {
        formulirid: jsonForm
        // column: "keyid"
      };
      Api.formulir
        .filterdata(params)
        .then(resp => {
          resp.data.data.forEach(data => {
            self.checkedbox.push({
              id: data.id,
              value: []
            });
            for (let idx = 0; idx < data.formulirdata.length; idx++) {
              self.checkedbox[self.totalData].value.push({
                id: data.formulirdata[idx].id,
                value: self.dataStatus.length,
                nilai: 0
              });
            }
            self.formulirData.push(resp.data.data);
            self.totalData += 1;
          });
          self.formulirData = resp.data.data;
        })
        .catch(error => {
          console.log(error);
          self.reset();
        });
    },
    register(status, id) {
      let self = this;
      const jsonchecked = JSON.stringify(self.checkedbox);
      let rawData = {
        id: self.dataFormulir.id,
        perawat_id: self.dataFormulir.perawat_id,
        dokter_id: self.dataFormulir.dokter_id,
        checkeddata: jsonchecked
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (status === "submit") {
        Api.analisisdata
          .register(formData)
          .then(resp => {
            if (resp.data.status === "success") {
              self.textTitle = "Data berhasil disimpan";
              self.berhasil = true;
              self.isUserModal = true;
              self.edit = true;
              // self.reset();
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
        Api.analisisdata
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
    },
    changeFormulirDataModal(id) {
      let self = this;
      if (self.isFormulirDataModal === false) {
        self.editFormulirId = id;
        self.isFormulirDataModal = true;
      } else {
        // self.init();
        // self.getData(self.filter);
        self.isFormulirDataModal = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  &-dialog {
    max-width: 75vw;
  }
}
  .table {
    td {
    padding: 0.5rem;
    }
    th {
      padding: 0.5rem;
    }
  }
</style>
