<template></template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  book: {
    typeof: Object
  }
})

const router = useRouter()
const handleClickCard = (idBook) => {
  router.push({
    name: 'bookDeital',
    params: {
      id: idBook
    }
  })
}
</script>

<style>
</style>