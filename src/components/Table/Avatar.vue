<template>
  <img v-if="data.avatar === null" :src="blankAvatar" />
  <img v-else :src="data.avatar" />
</template>

<script>
import blankAvatar from "../../assets/image/table/blank_avatar.png";

export default {
  props: {
    data: {}
  },
  data() {
    return {
      blankAvatar
    };
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 20px;
  height: 20px;
}
</style>
