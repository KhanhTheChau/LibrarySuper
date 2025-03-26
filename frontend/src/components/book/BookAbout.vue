<template>
  <div class="wrap__book">
    <div class="title__book">
      <h3 class="m-0 d-inline-block me-1">{{ book.title }}</h3>
      <span>({{ formattedDate }})</span>
      <div class="info__book fst-italic d-flex">
        <div class="author__book me-2">
          <p v-if="book.author">Tác giả: {{ book.author.name }}</p>
          <p v-else>Tác giả: Not updated</p>
        </div>
        <span class="me-2">|</span>
        <div class="publisher__book me-2">
          <p v-if="book.publisher">Nhà xuất bản: {{ book.publisher.name }}</p>
          <p v-else>Nhà xuất bản: Not updated</p>
        </div>
        <span class="me-2">|</span>
        <div class="language__book">
          <p>Ngôn ngữ: {{ book.language }}</p>
        </div>
      </div>
    </div>
    <div class="rating__book d-flex me-1" v-if="book && book.ratings">
      <rate-book
        :bookStar="book.ratings.average"
        :reviewsCount="book.ratings.reviews_count"
      ></rate-book>
    </div>

    <div class="genres__book d-flex align-self-end">
      <div class="">
        <span class="label__genre me-1 px-1" v-for="genre in book.genre" :key="genre">{{
          genre
        }}</span>
      </div>
    </div>

    <div class="detail__book">
      <p>{{ book.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import RateBook from './RateBook.vue'

const props = defineProps({
  book: {
    type: Object,
    default: () => ({})
  }
})

const { book } = toRefs(props)

const formattedDate = computed(() => {
  const date = new Date(book.value.published_date)
  return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
})
</script>

<style scoped>
/* .title__book h3 {
  padding-right: 8px;
  border-right: 2px solid #ccc;
} */

.info__book div p {
  font-size: 1rem;
  margin: 0;
}

.detail__book {
  font-size: 1rem;
}

.label__genre {
  background: #e8e8e8;
}

.btn__borrow {
  width: 15vw;
}
</style>