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
