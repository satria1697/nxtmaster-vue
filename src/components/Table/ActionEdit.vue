<template>
  <div>
    <div class="pointer col-1" @click="click(data.id)">
      <i class="fas fa-edit"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {},
    name: {},
    click: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/abstracts/_variables";
.fa-edit {
  color: $theme;
}
</style>
