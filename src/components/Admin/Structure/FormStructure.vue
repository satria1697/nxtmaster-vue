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
                  <div class=" form form-group col-8">
                    <label for="formDesc" class="top">Description</label>
                    <input
                      id="formDesc"
                      class="bottom form-control"
                      v-model="dataAll.description"
                    />
                  </div>
                  <div class="form-group form-check col-3">
                    <input
                      id="formSign"
                      class="form-check-input"
                      type="checkbox"
                      v-model="dataAll.signability"
                    />
                    <label for="formSign" class="form-check-label"
                      >Sign Ability</label
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formStructureLevel" class="top"
                      >Structure Level</label
                    >
                    <select
                      class="form-control bottom"
                      id="formStructureLevel"
                      v-model="dataAll.structurelevelid"
                    >
                      <option
                        :value="data.id"
                        v-for="data in dataSLevel"
                        :key="data.id"
                        >{{ data.description }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formParentId" class="top">Parent ID</label>
                    <select
                      class="form-control bottom"
                      id="formParentId"
                      v-model="dataAll.parentid"
                    >
                      <option
                        v-for="data in dataS"
                        :key="data.id"
                        :value="data.id"
                        >{{ data.id }} - {{ data.description }}</option
                      >
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div v-if="editId === null" class="modal-footer">
              <button class="btn btn-default" v-on:click="reset()">
                <i class="fas fa-eraser"></i> Reset
              </button>
              <button
                class="btn btn-default"
                v-on:click="submit('register', null)"
              >
                <i class="fas fa-save"></i> Simpan
              </button>
            </div>
            <div v-if="editId !== null" class="modal-footer">
              <button class="btn btn-default" v-on:click="deleteData(editId)">
                <i class="fas fa-trash"></i> Delete
              </button>
              <button
                class="btn btn-default"
                v-on:click="submit('update', editId)"
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
        description: "",
        structurelevelid: null,
        parentid: null,
        signability: null
      },
      filter: {
        page: null,
        find: "",
        length: null,
        orderColumn: "",
        orderBy: ""
      },
      berhasil: true,
      uploaded: false,
      updated: false,
      deleted: false,
      isDeleteModal: false,
      dataSLevel: [],
      dataS: []
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
    this.init();
  },
  methods: {
    init() {
      this.checkEdit();
      this.getDataSLevel();
      this.getDataS();
    },
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
        Api.structure
          .find(this.editId)
          .then(resp => {
            this.dataAll = resp.data.data;
            this.dataAll.signability =
              this.dataAll.signability === 1 ? true : false;
          })
          .catch(error => {
            console.log(error);
            this.reset();
          });
      }
    },
    submit(state, id) {
      let signability = this.dataAll.signability === true ? 1 : 0;
      let rawData = {
        description: this.dataAll.description,
        signability: signability,
        structurelevelid: this.dataAll.structurelevelid,
        parentid: this.dataAll.parentid
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      if (state === "register") {
        Api.structure
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
            console.log(err);
            this.berhasil = false;
          });
      } else {
        Api.structure
          .update(id, formData)
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
            console.log(err);
            this.berhasil = false;
          });
      }
    },
    deleteData(id) {
      Api.structure
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
    getDataSLevel(params) {
      Api.structurelevel
        .filter(params)
        .then(resp => {
          this.dataSLevel = resp.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataS(params) {
      Api.structure
        .filter(params)
        .then(resp => {
          this.dataS = resp.data.data;
        })
        .catch(err => {
          console.log(err);
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
