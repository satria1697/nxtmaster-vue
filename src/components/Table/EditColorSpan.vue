<template>
  <div>
    <span v-bind:style="{ color: data.warna }">{{ data.description }}</span>
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
</style>
