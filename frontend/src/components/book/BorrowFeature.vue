<template>
  <div class="">
    <button class="w-100" @click="handleConfirm">Xác nhận</button>
  </div>
</template>

<script setup>
import { useTrackStore } from '../../stores/track.store'
import { useToast } from 'primevue/usetoast'
import { toRefs } from 'vue'

const toast = useToast()
const props = defineProps({
  trackId: String,
  quantity: Number
})
const trackStore = useTrackStore()
const { trackId, quantity } = toRefs(props)
const handleConfirm = async () => {
  try {
    const res = await trackStore.confirmBorrowBook(trackId.value, quantity.value)
    if (res) {
      toast.add({
        severity: 'contrast',
        summary: 'Success',
        group: 'tr',
        detail: 'The book is waiting approval.',
        life: 3000
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        group: 'tr',
        detail: 'Exceeded quantity',
        life: 3000
      })
    }
  } catch (error) {
    console.log(error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      group: 'tr',
      detail: 'Exceeded quantity',
      life: 3000
    })
  }
}
</script>

<style>
</style>