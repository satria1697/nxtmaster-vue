<template>
  <div>
    <delete-confirmation
      v-if="isModal"
      @modal-closed="changeModal"
      @delete-data="deleteData"
      :data="data"
    >
    </delete-confirmation>
    <div class="pointer col-1" @click="changeModal()">
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
    let self = this;
    return {
      isModal: false,
      id: self.data.id
    };
  },
  methods: {
    changeModal() {
      let self = this;
      if (self.isModal === false) {
        self.isModal = true;
      } else {
        self.isModal = false;
      }
    },
    deleteData() {
      let self = this;
      self.click(self.id);
      self.changeModal();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/abstracts/_variables";
.fa-trash {
  color: $theme;
}
</style>
