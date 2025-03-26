<template>
  <div class="product__card d-flex mb-1 mx-0 p-2" @click="handleClickProduct(book)">
    <div class="produt__img me-3">
      <img :src="book.book.image" alt="" @click="handleClickCard(book.book._id)" />
    </div>
    <div class="product__content">
      <div class="product__title">
        <p class="fw-bold me-2 mb-0">{{ book.book.title }}</p>
        <span>({{ formatDate(book.book.published_date) }})</span>
      </div>
      <div class="product__genre">
        <span class="genre__label me-1 px-1" v-for="genre in book.book.genre" :key="genre">{{
          genre
        }}</span>
      </div>
      <div class="product__author fst-italic">
        <p class="mb-0" v-if="book.book.author">{{ book.book.author.name }}</p>
        <p class="mb-0" v-else>Đang cập nhật tác giả ...</p>
      </div>
      <div class="product__des">
        <p class="mb-1">{{ book.book.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useTrackStore } from '../../stores/track.store'

const trackStore = useTrackStore()

defineProps({
  book: {
    type: Object
  }
})

const router = useRouter()
const handleClickCard = (idBook) => {
  router.push({
    name: 'bookDetail',
    params: {
      id: idBook
    }
  })
}

const handleClickProduct = async (record) => {
  console.log(record)
  trackStore.setRecord(record)
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.produt__img img {
  width: 8vw;
}

.product__card {
  width: 100%;
  border: 1px solid #ccc;
}

.genre__label {
  background-color: #e8e8e8;
}

.product__des p {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Số dòng bạn muốn giới hạn */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product__title p {
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Số dòng bạn muốn giới hạn */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 22px;
}

/* active */
.activeCard {
  background-color: #e9e9e9;
}

/* Responsive */

/* Tablet styles (<= 992px) */
@media (max-width: 992px) {
}

/* Mobile styles (<= 768px) */
@media (max-width: 768px) {
  .product__des,
  .produt__img {
    display: none !important;
  }

  .product__title p {
    font-size: 16px !important;
  }

  .product__genre,
  .product__author,
  .product__title span {
    font-size: 12px !important;
  }
}

/* Small mobile styles (<= 576px) */
@media (max-width: 576px) {
  .product__des,
  .produt__img {
    display: none !important;
  }

  .product__title p {
    font-size: 14px !important;
  }

  .product__genre,
  .product__author,
  .product__title span {
    font-size: 12px !important;
  }
}

@media (max-width: 290px) {
}
</style>