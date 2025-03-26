<script setup>
import { useRouter } from 'vue-router'
import BorrowButton from './BorrowButton.vue'

const router = useRouter()
defineProps({
  book: Object
})

const handleClickCard = (idBook) => {
  router.push({
    name: 'bookDetail',
    params: {
      id: idBook
    }
  })
}
</script>

<template>
  <div class="m-2 d-flex item-hover">
    <div class="mx-auto">
      <div class="relative mx-auto wrap__img mb-3">
        <img
          :src="book.image"
          :alt="book.title"
          class="rounded img-thumbnail"
          @click="handleClickCard(book._id)"
        />
      </div>
      <borrow-button :bookId="book._id"></borrow-button>
    </div>
  </div>
</template>

<style scoped>
.book__card__wrap {
  border: 1px solid #ccc;
  border-radius: 8px;
}

.wrap__img img {
  height: 300px;
  width: 200px;
}
</style>