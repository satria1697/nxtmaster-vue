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
                v-if="berhasil && uploaded"
                title="Data berhasil diunggah."
                :textSuccess="true"
                @modal-closed="closeModal"
              />
              <user-modal
                v-if="berhasil && updated"
                title="Data berhasil diperbaharui."
                :textSuccess="true"
                @modal-closed="closeModal"
              />
              <user-modal
                v-if="berhasil && deleted"
                title="Data berhasil dihapus."
                :textSuccess="true"
                @modal-closed="closeModal"
              />
              <user-modal
                v-if="!berhasil"
                title="Terdapat Kesalahan Data"
                :textDanger="true"
                @modal-closed="berhasil = true"
              />
              <delete-modal
                :data="dataAll"
                v-if="isDeleteModal"
                @modal-closed="isDeleteModal = false"
                @delete-data="deleteData"
              />
              <form class="container-fluid">
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
            <div v-if="editId === null" class="modal-footer">
              <button class="btn btn-default" v-on:click="reset()">
                <i class="fas fa-eraser"></i> Reset
              </button>
              <button class="btn btn-default" v-on:click="submit()">
                <i class="fas fa-save"></i> Simpan
              </button>
            </div>
            <div v-if="editId !== null" class="modal-footer">
              <button class="btn btn-default" v-on:click="isDeleteModal = true">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button class="btn btn-default" v-on:click="update(editId)">
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
      dataAll: {
        id: null,
        name: "",
        description: "",
        path: ""
      },
      berhasil: true,
      uploaded: false,
      updated: false,
      deleted: false,
      isDeleteModal: false
    };
  },
  mounted() {
    this.checkEdit();
  },
  methods: {
    closeModal() {
      this.reset();
      this.$emit("get-data");
      this.$emit("modal-closed");
    },
    reset() {
      this.dataAll.id = null;
      this.dataAll.description = "";
      this.editId = null;
    },
    checkEdit() {
      if (this.editId !== null) {
        Api.application
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
    submit() {
      let rawData = {
        id: this.dataAll.id,
        name: this.dataAll.name,
        description: this.dataAll.description,
        path: this.dataAll.path
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      Api.application
        .register(formData)
        .then(resp => {
          if (resp.data.status === "success") {
            this.reset();
            this.berhasil = true;
            this.uploaded = true;
          } else {
            this.berhasil = false;
          }
        })
        .catch(err => {
          console.log(err.response);
          this.berhasil = false;
        });
    },
    update(id) {
      let rawData = {
        id: this.dataAll.id,
        name: this.dataAll.name,
        description: this.dataAll.description,
        path: this.dataAll.path
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      Api.application
        .update(id, formData)
        .then(resp => {
          if (resp.status === "error") {
            this.berhasil = false;
          } else {
            this.berhasil = true;
            this.updated = true;
          }
        })
        .catch(err => {
          this.berhasil = false;
          console.log(err);
        });
    },
    deleteData() {
      Api.application
        .delete(this.dataAll.id)
        .then(resp => {
          console.log(resp);
          this.berhasil = true;
          this.deleted = true;
          this.isDeleteModal = false;
          this.$emit("modal-closed");
        })
        .catch(err => {
          console.log(err);
          this.berhasil = false;
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
