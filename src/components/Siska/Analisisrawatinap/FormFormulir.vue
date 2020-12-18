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
    //
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
    this.dataFormulir.formulir.forEach(data => {
      this.needForm.push(data.id);
    });
    this.getData(this.needForm);
    this.checkEdit(this.needForm);
  },
  methods: {
    closeModal() {
      this.$emit("get-data");
      this.$emit("modal-closed");
    },
    reset() {
      this.dataAll = initialDataAll();
    },
    checkEdit(form) {
      let jsonForm = JSON.stringify(form);
      const params = {
        formulirid: jsonForm,
        column: "keyid"
      };
      Api.analisisdata
        .find(this.dataFormulir.id, params)
        .then(resp => {
          if (resp.status === 200) {
            this.edit = true;
            this.dataAll = resp.data.data;
            this.checkedbox = resp.data.data;
          }
        })
        .catch(error => {
          console.log(error);
          this.reset();
        });
    },
    getData(form) {
      let jsonForm = JSON.stringify(form);
      const params = {
        formulirid: jsonForm
        // column: "keyid"
      };
      Api.formulir
        .filterdata(params)
        .then(resp => {
          resp.data.data.forEach(data => {
            this.checkedbox.push({
              id: data.id,
              value: []
            });
            for (let idx = 0; idx < data.formulirdata.length; idx++) {
              this.checkedbox[this.totalData].value.push({
                id: data.formulirdata[idx].id,
                value: this.dataStatus.length,
                nilai: 0
              });
            }
            this.formulirData.push(resp.data.data);
            this.totalData += 1;
          });
          this.formulirData = resp.data.data;
        })
        .catch(error => {
          console.log(error);
          this.reset();
        });
    },
    register(status, id) {
      const jsonchecked = JSON.stringify(this.checkedbox);
      let rawData = {
        id: this.dataFormulir.id,
        perawat_id: this.dataFormulir.perawat_id,
        dokter_id: this.dataFormulir.dokter_id,
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
              this.textTitle = "Data berhasil disimpan";
              this.berhasil = true;
              this.isUserModal = true;
              this.edit = true;
              // this.reset();
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
        Api.analisisdata
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
      Api.formulir
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
    changeFormulirDataModal(id) {
      if (this.isFormulirDataModal === false) {
        this.editFormulirId = id;
        this.isFormulirDataModal = true;
      } else {
        // this.init();
        // this.getData(this.filter);
        this.isFormulirDataModal = false;
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
