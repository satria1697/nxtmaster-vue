<template>
  <transition class="modal" tabindex="-1" role="dialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div
          class="modal-dialog modal-dialog-centered container-md"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header bg-default">
              <span class="font-weight-bold">{{ title }}</span>
              <i
                class="fa fa-window-close pull-right pointer-event"
                aria-hidden="true"
                @click="closeModal"
              ></i>
            </div>
            <div class="modal-body text-center" v-if="dataAll === null">
              <b-spinner></b-spinner>
            </div>
            <div class="modal-body" v-else>
              <info-modal
                v-if="info.isModal"
                :title="textTitle"
                :success="success"
                @modal-closed="info.isModal = false"
              />
              <delete-modal
                :data="dataAll"
                v-if="isDeleteModal"
                @modal-closed="isDeleteModal = false"
                @delete-data="deleteData"
              />
              <form class="container-fluid">
                <div class="row">
                  <div v-if="editId !== 0" class="form form-group col-4">
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
                  <div class="form form-group col-10">
                    <label for="formDesc" class="top">Description</label>
                    <input
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.description"
                    />
                  </div>
                  <div class="form form-group form-check col-2">
                    <input
                      id="formActive"
                      class="form-check-input"
                      type="checkbox"
                      v-model="dataAll.active"
                    />
                    <label for="formActive" class="form-check-label"
                      >Aktif</label
                    >
                  </div>
                </div>
              </form>
            </div>
            <div v-if="editId === 0" class="modal-footer">
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
            <div v-if="editId !== 0" class="modal-footer">
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

function initData() {
  return {
    id: 0,
    description: "",
    active: false
  };
}

export default {
  props: {
    editId: {
      type: Number
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      dataAll: null,
      success: true,
      uploaded: false,
      updated: false,
      deleted: false,
      isDeleteModal: false,
      textTitle: "",
      info: {
        isModal: false
      }
    };
  },
  created() {
    this.eschandler();
  },
  mounted() {
    this.checkEdit();
  },
  methods: {
    eschandler() {
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
    closeModal() {
      this.reset();
      this.$emit("get-data");
      this.$emit("modal-closed");
    },
    reset() {
      this.dataAll.description = "";
      this.dataAll.active = false;
    },
    checkEdit() {
      if (this.editId !== 0) {
        Api.akses
          .find(this.editId)
          .then(resp => {
            this.dataAll = resp.data.data;
          })
          .catch(error => {
            console.log(error);
            this.reset();
          });
      } else {
        this.dataAll = initData();
      }
    },
    register(status, id) {
      let rawData = {
        description: this.dataAll.description,
        active: this.dataAll.active === true ? 1 : 0
      };
      if (status === "submit") {
        Api.akses
          .register(rawData)
          .then(resp => {
            if (resp.data.status === "success") {
              this.textTitle = "Data berhasi disimpan";
              this.success = true;
              this.info.isModal = true;
            } else {
              this.success = false;
            }
          })
          .catch(err => {
            console.log(err);
            this.textTitle = "Data gagal diunggah";
            this.success = false;
            this.info.isModal = true;
          });
      } else {
        Api.akses
          .update(id, rawData)
          .then(resp => {
            if (resp.data.status === "success") {
              this.textTitle = "Data berhasil diperbaharui";
              this.success = true;
              this.info.isModal = true;
            } else {
              this.success = false;
            }
          })
          .catch(err => {
            this.textTitle = "Input data salah, silahkan cek kembali";
            this.success = false;
            this.info.isModal = true;
            console.log(err);
          });
      }
    },
    deleteData(id) {
      Api.akses
        .delete(id)
        .then(resp => {
          console.log(resp);
          this.success = true;
          this.deleted = true;
        })
        .catch(err => {
          console.log(err);
          this.success = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
