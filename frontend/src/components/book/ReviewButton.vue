<template>
  <button class="btn btn-success w-100 text-light" @click="handleOpenModal()">
    Viết đánh giá
  </button>
  
  <Teleport to="#app">
    <main-modal :isOpen="isOpenModel" :handleClose="handleCloseModal">
      <template #reviewModal>
        <review-modal :bookId="props.bookId" :handleClose="handleCloseModal"></review-modal>
      </template>
    </main-modal>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import ReviewModal from './ReviewModal.vue'
const props = defineProps({
  bookId: String
})

const isOpenModel = ref(false)
function handleOpenModal() {
  isOpenModel.value = true
}
function handleCloseModal() {
  isOpenModel.value = false
}
</script>