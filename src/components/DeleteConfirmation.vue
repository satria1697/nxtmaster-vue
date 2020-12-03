<template>
  <transition class="modal" tabindex="-1" role="dialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-centered">
          <login-confirmation
            v-if="isLoginConfirmedModal"
            @login="loginConfirmed"
          />
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
              <button
                class="btn btn-default"
                @click="deleteYes()"
                ref="btndelete"
              >
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
import loginConfirmation from "./Admin/LoginConfirmation.vue";
export default {
  components: {
    "login-confirmation": loginConfirmation
  },
  props: {
    data: {}
  },
  data() {
    return {
      isConfirmed: false,
      isLoginConfirmedModal: false
    };
  },
  mounted() {
    let self = this;
    self.$refs.btndelete.focus();
  },
  methods: {
    closeModal() {
      let self = this;
      if (self.isConfirmed === true) {
        self.isConfirmed = false;
      }
      self.$emit("modal-closed");
    },
    deleteYes() {
      let self = this;
      if (self.isConfirmed === true) {
        self.closeModal();
        self.$emit("delete-data", self.data);
      } else {
        self.isLoginConfirmedModal = true;
      }
    },
    loginConfirmed(payload) {
      let self = this;
      self.isConfirmed = payload ? true : false;
      self.isLoginConfirmedModal = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
