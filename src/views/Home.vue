<template>
  <div>
    <div class="row">
      <div class="col">
        <h1 class="display-2">
          Halo, {{ this.$store.getters["getFullname"] }}
        </h1>
        <h1 class="display-4">Selamat datang di aplikasi NXTOffice 4</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
