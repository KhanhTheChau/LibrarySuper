<template>
  <div class="wrapp__borrow col-12">
    <div class="borrow__btn">
      <borrow-button></borrow-button>
    </div>
  </div>
</template>

<script setup>
import BorrowButton from './BorrowButton.vue'
</script>

<style scoped>
.borrow__btn {
  width: 30vh;
}
</style>