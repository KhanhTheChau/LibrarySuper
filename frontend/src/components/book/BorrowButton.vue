<script setup>
import { useTrackStore } from '../../stores/track.store'
import { toRefs } from 'vue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const props = defineProps({
  bookId: {
    type: String
  }
})

const trackStore = useTrackStore()
const { bookId } = toRefs(props)
const handleBorrow = async () => {
  const res = await trackStore.createBorrowAction(bookId.value)
  if (res) {
    toast.add({
      severity: 'contrast',
      summary: 'Success',
      group: 'tr',
      detail: 'Book added successfully',
      life: 3000
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      group: 'tr',
      detail: 'The book is already in the cart.',
      life: 3000
    })
  }
}
</script>
<template>
  <button class="btn btn-dark w-100 mb-1" @click="handleBorrow">Mượn sách</button>
</template>


<style>
</style>