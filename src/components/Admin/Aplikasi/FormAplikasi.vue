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
            <div class="modal-body text-center" v-if="dataAll === null">
              <b-spinner></b-spinner>
            </div>
            <div class="modal-body" v-else>
              <info-modal
                v-if="info.isModal"
                :title="info.text"
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
                  <div class="form form-group col">
                    <label for="formName" class="top">Nama Aplikasi</label>
                    <input
                      id="formName"
                      class="bottom form-control"
                      v-model="dataAll.name"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formDesc" class="top">Description</label>
                    <input
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.description"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formPath" class="top">path</label>
                    <input
                      id="formPath"
                      class="bottom form-control"
                      v-model="dataAll.path"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div v-if="editId === 0" class="modal-footer">
              <button class="btn btn-default" v-on:click="reset()">
                <i class="fas fa-eraser"></i> Reset
              </button>
              <button class="btn btn-default" v-on:click="submit(register)">
                <i class="fas fa-save"></i> Simpan
              </button>
            </div>
            <div v-if="editId !== 0" class="modal-footer">
              <button class="btn btn-default" v-on:click="isDeleteModal = true">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button
                class="btn btn-default"
                v-on:click="submit(update, editId)"
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
    name: "",
    description: "",
    path: ""
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
      info: {
        text: null,
        isModal: null
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
      this.dataAll = initData();
    },
    checkEdit() {
      if (this.editId !== 0) {
        Api.application
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
    submit(status, id) {
      let rawData = {
        id: this.dataAll.id,
        name: this.dataAll.name,
        description: this.dataAll.description,
        path: this.dataAll.path
      };
      if (status === "register") {
        Api.application
          .register(rawData)
          .then(resp => {
            if (resp.status === 200) {
              this.success = true;
              this.info.text = "Data berhasil di update";
              this.info.isModal = true;
            } else {
              this.success = false;
              this.info.text = "Data gagal di update";
              this.info.isModal = true;
            }
          })
          .catch(err => {
            this.success = false;
            this.info.text = "Data gagal di update";
            this.info.isModal = true;
            console.log(err);
          });
      } else {
        Api.application
          .update(id, rawData)
          .then(resp => {
            if (resp.status === 200) {
              this.success = true;
              this.info.text = "Data berhasil di update";
              this.info.isModal = true;
            } else {
              this.success = false;
              this.info.text = "Data gagal di update";
              this.info.isModal = true;
            }
          })
          .catch(err => {
            this.success = false;
            this.info.text = "Data gagal di update";
            this.info.isModal = true;
            console.log(err);
          });
      }
    },
    deleteData() {
      Api.application
        .delete(this.dataAll.id)
        .then(resp => {
          if (resp.status === 204) {
            this.success = true;
            this.deleted = true;
            this.isDeleteModal = false;
            this.$emit("modal-closed");
          }
        })
        .catch(err => {
          console.log(err);
          this.success = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.pull-right {
  margin: 8px 10px 0 0;
}
</style>
