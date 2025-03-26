<template>
  <div class="wrap__avt">
    <img class="img-thumbnail" :src="pathAvt" alt="avt" />
  </div>
</template>

<script setup>
defineProps({
  pathAvt: String
})
</script>

<style scoped>
.wrap__avt img {
  max-height: 80vh;
}
</style>