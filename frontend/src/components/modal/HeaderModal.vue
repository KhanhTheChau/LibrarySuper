<template>
  <div class="wrap__model" v-if="isOpen">
    <div class="overlay__model" @click="handleClose()"></div>
    <div class="app__model" @click.stop>
      <slot name="headerDrop"></slot>
      <slot name="sidebarDrop"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean
  },
  handleClose: {
    type: Function
  }
})
</script>

<style scoped>
.overlay__model {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.app__model {
  background-color: #f8f9fa;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid #ccc;
  animation: slideDown 0.5s ease;
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>