<template>
  <div class="wrap__books">
    <hr />
    <div class="title-carousel">
      <h5 class="ms-5">{{ labelText }}</h5>
    </div>
    <Carousel :value="books" :numVisible="5" :numScroll="5" :responsiveOptions="responsiveOptions">
      <template #item="slotProps">
        <book-card :book="slotProps.data"></book-card>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Carousel from 'primevue/carousel'
import { useBookStore } from '../../stores/book.store'
import BookCard from './BookCard.vue'

const bookStore = useBookStore()

onMounted(async () => {
  await bookStore.fetchBookAction()
})

const props = defineProps({
  label: String
})

const labelText = computed(() => {
  if (props.label === 'SGK') return 'Sách giáo khoa'
  if (props.label === 'Trending') return 'Xu hướng'
  if (props.label === 'Classic') return 'Kinh điển'
  return props.label
})

const books = computed(() => bookStore.showBooks(props.label))
console.log(books.value)
const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }
])
</script>

<style>
/* Thêm các style nếu cần */
</style>
