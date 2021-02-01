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
                v-if="info.modal"
                :title="info.text"
                :success="success"
                @modal-closed="info.modal = false"
              />
              <delete-modal
                :data="dataAll"
                v-if="isDeleteModal"
                @modal-closed="isDeleteModal = false"
                @delete-data="deleteData"
              />
              <div class="container-fluid">
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
              </div>
            </div>
            <div v-if="editId === 0" class="modal-footer">
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
            <div v-if="editId !== 0" class="modal-footer">
              <button
                class="btn btn-default float-left"
                v-on:click="isDeleteModal = true"
              >
                <i class="fas fa-trash"></i> Delete
              </button>
              <button
                class="btn btn-default"
                v-on:click="submit('update', dataAll.id)"
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
import formMixin from "../../../mixins/formMixin";
import api from "../../../api/const";

function initData() {
  return {
    id: 0,
    description: "",
    active: false
  };
}

export default {
  mixins: [formMixin],
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
      url: {
        getId: api.akses.GetId,
        register: api.akses.Register,
        update: api.akses.Update,
        delete: api.akses.Delete
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.checkEdit();
    },
    reset() {
      this.dataAll = initData();
    },
    checkEdit() {
      if (this.editId !== 0) {
        this.getData(this.editId);
      } else {
        this.dataAll = initData();
      }
    },
    submit(status, id) {
      let data = {
        description: this.dataAll.description,
        active: this.dataAll.active === true ? 1 : 0
      };
      this.postData(status, id, data);
    }
  }
};
</script>

<style lang="scss" scoped></style>
