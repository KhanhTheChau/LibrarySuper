<template>
  <div class="dataTable__top d-flex justify-content-between">
    <div class="dataTable__dropdown">
      <label
        ><select class="dataTable__selector" v-model="selected">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">50</option>
        </select>
        entries per page</label
      >
    </div>
    <div class="dataTable__feature">
      <button class="me-2" @click="handleOpenAdd()">Add</button>
      <!-- <input class="dataTable-input" placeholder="Search..." type="text" fdprocessedid="k0gxpd" /> -->
    </div>
    <Teleport to="#app">
      <main-modal :isOpen="isOpenModal" :handleClose="handleClose">
        <template #userAdd>
          <user-add :handleClose="handleClose"></user-add>
        </template>
      </main-modal>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import UserAdd from './UserAdd.vue'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()
// model
const isOpenModal = ref(false)
function handleOpenAdd() {
  isOpenModal.value = true
}
function handleClose() {
  isOpenModal.value = false
}

const selected = computed({
  get() {
    return userStore.selected
  },
  set(value) {
    userStore.setValueSelected(value)
  }
})
</script>

<style>
</style>