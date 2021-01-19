<template>
  <div>
    <span
      v-bind:style="{ color: data.warna || data.statuskelengkapan.warna }"
      >{{ data.description || data.statuskelengkapan.description }}</span
    >
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
@import "../../assets/styles/abstracts/_variables";
</style>
