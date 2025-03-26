<script setup>
import TheFooter from '../components/footer/TheFooter.vue'
import TheHeader from '../components/header/TheHeader.vue'
</script>

<template>
  <div class="wrap__auth container">
    <header>
      <the-header></the-header>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <the-footer></the-footer>
    </footer>
  </div>
</template>


<style scoped>
</style>