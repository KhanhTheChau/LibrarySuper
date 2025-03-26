<template>
  <div class="dataTable__top d-flex justify-content-between">
    <div class="dataTable__dropdown">
      <label
        ><select class="dataTable__selector" v-model="selected">
          <option value="5">5</option>
          <option value="10" selected="">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">50</option>
        </select>
        mục trên mỗi trang</label
      >
    </div>
    <div class="dataTable__feature">
      <button class="me-2" @click="handleOpenAdd()">Thêm</button>
      <!-- <input class="dataTable-input" placeholder="Search..." type="text" fdprocessedid="k0gxpd" /> -->
    </div>
    <Teleport to="#app">
      <main-modal :isOpen="isOpenModel" :handleClose="handleClose">
        <template #authorAdd>
          <author-add :handleClose="handleClose"></author-add>
        </template>
      </main-modal>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AuthorAdd from './AuthorAdd.vue'
import { useAuthorStore } from '@/stores/author.store'
const authorStore = useAuthorStore()
// model
const isOpenModel = ref(false)
function handleOpenAdd() {
  isOpenModel.value = true
}
function handleClose() {
  isOpenModel.value = false
}

const selected = computed({
  get() {
    return authorStore.selected
  },
  set(value) {
    authorStore.setValueSelected(value)
  }
})
</script>

<style>
</style>