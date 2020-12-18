<template>
  <transition class="modal" tabindex="-1" role="dialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-centered container-md">
          <div class="modal-content">
            <div class="modal-body">
              <span
                class="font-weight-bold"
                :class="{
                  'text-danger': textDanger,
                  'text-success': textSuccess
                }"
              >
                {{ title }}
              </span>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-info"
                v-on:click="closeModal()"
                @keyup.enter="closeModal()"
                ref="btnok"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// import router from "../router";
// import store from "../store";
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    textDanger: {
      type: Boolean
    },
    textSuccess: {
      type: Boolean
    }
  },
  mounted() {
    this.$refs.btnok.focus();
  },
  methods: {
    closeModal() {
      this.$emit("modal-closed");
    }
  }
};
</script>

<style lang="scss" scoped></style>
