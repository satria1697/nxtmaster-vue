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
                    <label class="top">Nama Aplikasi</label>
                    <v-select
                      :options="dataApp"
                      label="description"
                      v-model="dataAll.application"
                    ></v-select>
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formName" class="top">Nama Modul</label>
                    <input
                      id="formName"
                      class="bottom form-control"
                      v-model="dataAll.name"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label class="top">Description</label>
                    <input
                      class="bottom form-control"
                      v-model="dataAll.description"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="form form-group col">
                    <label for="formDesc" class="top">path</label>
                    <input
                      id="formDesc"
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
              <button class="btn btn-default" v-on:click="submit('register')">
                <i class="fas fa-save"></i> Simpan
              </button>
            </div>
            <div v-if="editId !== 0" class="modal-footer">
              <button class="btn btn-default" v-on:click="isDeleteModal = true">
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
import formMixin from "../../../mixins/formMixin";
import api from "../../../api/const";

function initData() {
  return {
    id: null,
    applicationid: "",
    application: null,
    name: "",
    description: "",
    path: ""
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
    },
    dataApp: {
      type: Array
    }
  },
  data() {
    return {
      url: {
        getId: api.modul.GetId,
        register: api.modul.Register,
        update: api.modul.Update,
        delete: api.modul.Delete
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
        applicationid: this.dataAll.application.id,
        name: this.dataAll.name,
        description: this.dataAll.description,
        path: this.dataAll.path
      };
      this.postData(status, id, data);
    }
  }
};
</script>

<style lang="scss" scoped></style>
