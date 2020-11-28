<template>
  <div>
    <div class="btn btn-sm btn-default" @click="click(data)">{{ name }}</div>
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
