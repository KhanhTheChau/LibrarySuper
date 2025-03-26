<script setup>
import Toast from 'primevue/toast'
</script>

<template>
  <div class="app" id="app">
    <div class="wrap__app">
      <router-view></router-view>
    </div>

    <!-- <Toast /> -->
    <Toast position="top-right" group="tr" />
    <Toast position="bottom-right" group="br" />
  </div>
</template>

<style scoped>
.app {
  background: #f8f9fa;
}
</style>
