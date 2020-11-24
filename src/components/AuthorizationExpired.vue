<template>
  <transition class="modal" tabindex="-1" role="dialog">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <h3>Authorization Expired</h3>
            </div>
            <div class="modal-footer">
              <button class="btn btn-info" @click="goTo()">OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import router from "../router";
import store from "../store";

export default {
  mounted() {
    // console.log("ok");
  },
  methods: {
    goTo() {
      store.commit("authenChange");
      store.commit("closeExpired");
      router.push({ name: "login" });
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
