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
                <div class="col">
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th>data</th>
                        <th>
                          Kelengkapan berkas
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(data, index) in formulirData" :key="data.id">
                        <td class="pointer-event" v-on:click="rowBoom(data)">
                          {{ data.description }}
                        </td>
                        <td class="row">
                          <div
                            class="form-check form-check-inline col-2"
                            v-for="(datas, indexs) in dataStatus"
                            :key="datas.id"
                          >
                            <input
                              class="form-check-input"
                              type="radio"
                              :name="'inlineRadioOptions' + index"
                              :id="'inlineRadio' + indexs"
                              :value="datas.id"
                              v-model="checkedbox[index].value"
                            />
                            <label
                              class="form-check-label"
                              :style="{ color: datas.warna }"
                              :for="'inlineRadio' + indexs"
                              >{{ datas.description }}</label
                            >
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
    description: ""
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
    dataStatus: {
      type: Array
    },
    formulirId: {
      type: Number
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
      formulirData: [],
      checkedbox: []
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
        Api.formulir
          .find(this.editId)
          .then(resp => {
            // console.log(resp.data.data[0].formulirdata);
            for (let idx = 0; idx < resp.data.data.formulirdata.length; idx++) {
              this.checkedbox.push({
                value: 4
              });
            }
            this.dataAll = resp.data.data;
            this.formulirData = this.dataAll.formulirdata;
          })
          .catch(error => {
            console.log(error);
            this.reset();
          });
      }
    },
    register(status, id) {
      let rawData = {
        description: this.dataAll.description
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (status === "submit") {
        Api.formulir
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
        Api.formulir
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
      if (this.isFormulirModal === false) {
        this.editFormulirId = id;
        this.isFormulirModal = true;
      } else {
        // this.init();
        // this.getData(this.filter);
        this.isFormulirModal = false;
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
</style>
