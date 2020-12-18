<template>
  <div>
    <div class="pointer-event col-1" @click="click(data.id)">
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
@import "src/style/abstracts/_variables";
.fa-edit {
  font-size: 1rem;
  color: $theme;
}
</style>
