<template>
  <div class="container">
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

<script setup>
import TheHeader from '@/components/header/TheHeader.vue'
import TheFooter from '@/components/footer/TheFooter.vue'
</script>

<style>
</style>