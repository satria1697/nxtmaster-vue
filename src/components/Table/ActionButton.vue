<template>
  <div>
    <div class="btn btn-sm btn-theme" @click="click(data.id)">{{ name }}</div>
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
