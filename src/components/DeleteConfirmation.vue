<template>
  <transition class="modal" tabindex="-1" role="dialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <span class="font-weight-bold">
                Apakah anda yakin akan menghapus entry dengan ID {{ data.id }}?
              </span>
            </div>
            <div class="modal-footer">
              <button class="btn btn-default" @click="closeModal()">
                <i class="fas fa-times"></i> Cancel
              </button>
              <button class="btn btn-default" @click="deleteYes()">
                <i class="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import store from "@/store";
export default {
  props: {
    data: {}
  },
  methods: {
    closeModal() {
      let self = this;
      if (store.state.isConfirmed === true) {
        store.commit("confirmedChange");
      }
      self.$emit("modal-closed");
    },
    deleteYes() {
      let self = this;
      if (store.state.isConfirmed === true) {
        store.commit("confirmedChange");
        self.$emit("delete-data");
        self.closeModal();
      } else {
        store.commit("loginConfirmedChange");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-content {
  max-width: 400px;
  margin-top: 150px;
}
</style>
