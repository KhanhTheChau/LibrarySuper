<template>
  <div class="card flex justify-center wrap__bc">
    <Breadcrumb class="custom__bc" :home="home" :model="items" />
  </div>
</template>

<script setup>
import Breadcrumb from 'primevue/breadcrumb'

import { ref } from 'vue'

const home = ref({
  icon: 'pi pi-home'
})
const items = ref([
  // { label: 'Electronics' },
  // { label: 'Computer' },
  // { label: 'Accessories' },
  // { label: 'Keyboard' },
  // { label: 'Wireless' }
])
</script>

<style scoped>
.wrap__bc {
  border: none;
}

.custom__bc {
  background-color: #f8f9fa;
}
</style>