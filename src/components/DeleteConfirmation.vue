<template>
  <transition class="modal" tabindex="-1" role="dialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <span class="font-weight-bold">
                Apakah anda yakin akan menghapus entry ini?
              </span>
            </div>
            <div class="modal-footer">
              <button class="btn btn-seconday" @click="closeModal()">
                Cancel
              </button>
              <button class="btn btn-danger" @click="deleteYes()">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    data: {}
  },
  methods: {
    closeModal() {
      let self = this;
      self.$emit("modal-closed");
    },
    deleteYes() {
      let self = this;
      self.$emit("delete-data");
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
