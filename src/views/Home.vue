<template>
  <div
    class="detail"
    :class="{ closeSideMain: this.$store.state.sideBarClose }"
  >
    <h1 class="display-2">Halo, {{ this.$store.getters["getFullname"] }}</h1>
    <h1 class="display-4">Selamat datang di aplikasi NXTOffice 4</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
