<template>
  <div>
    <delete-confirmation
      v-if="isModal"
      @modal-closed="changeModal"
      @delete-data="deleteData"
      :data="data"
    >
    </delete-confirmation>
    <div class="pointer-event col-1" @click="changeModal()">
      <i class="fas fa-trash"></i>
    </div>
  </div>
</template>

<script>
// import store from "../../store";
import DeleteConfirmation from "../DeleteConfirmation.vue";

export default {
  props: {
    data: {},
    name: {},
    click: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    "delete-confirmation": DeleteConfirmation
  },
  data() {
    return {
      isModal: false,
      id: this.data.id
    };
  },
  methods: {
    changeModal() {
      this.isModal = this.isModal === false;
    },
    deleteData() {
      this.click(this.id);
      this.changeModal();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/abstracts/_variables";
.fa-trash {
  font-size: 1rem;
  color: $theme;
}
</style>
