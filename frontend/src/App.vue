<template>
  <div>
    <TheHeader />
    <router-view></router-view>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from './components/header/TheHeader.vue';
import TheFooter from './components/footer/TheFooter.vue';
</script>