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
        entries per page</label
      >
    </div>
    <div class="dataTable__feature">
      <button class="me-2" @click="handleOpenAdd()">Add</button>
      <!-- <input class="dataTable-input" placeholder="Search..." type="text" fdprocessedid="k0gxpd" /> -->
    </div>
    <Teleport to="#app">
      <main-modal :isOpen="isOpenModel" :handleClose="handleClose">
        <template #publisherAdd>
          <publisher-add :handleClose="handleClose"></publisher-add>
        </template>
      </main-modal>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import PublisherAdd from './PublisherAdd.vue'
import { usePublisherStore } from '@/stores/publisher.store'

const publiserStore = usePublisherStore()

const isOpenModel = ref(false)
function handleOpenAdd() {
  isOpenModel.value = true
}
function handleClose() {
  isOpenModel.value = false
}
const selected = computed({
  get() {
    return publiserStore.selected
  },
  set(value) {
    publiserStore.setValueSelected(value)
  }
})
</script>

<style>
</style>