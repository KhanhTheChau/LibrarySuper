<template>
  <div class="dataTable__top d-flex justify-content-between">
    <div class="dataTable__dropdown">
      <label
        ><select class="dataTable__selector" v-model="selected">
          <option value="6">5</option>
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
      <main-modal :isOpen="isOpenModel" :handleClose="handleClose">
        <template #bookAdd>
          <book-add :handleClose="handleClose"></book-add>
        </template>
      </main-modal>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BookAdd from './BookAdd.vue'
import { useBookStore } from '@/stores/book.store'

const bookStore = useBookStore()

// model
const isOpenModel = ref(false)
function handleOpenAdd() {
  isOpenModel.value = true
}
function handleClose() {
  isOpenModel.value = false
}

//  computed property with getter and setter
const selected = computed({
  get() {
    return bookStore.selected
  },
  set(value) {
    bookStore.setValueSelected(value)
  }
})
</script>

<style>
</style>