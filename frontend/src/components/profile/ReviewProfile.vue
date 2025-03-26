<template>
  <div v-if="reviews" class="container">
    <div v-for="review in reviews" :key="review._id" class="row mb-3 px-1 py-3 card__review">
      <div>
        Bạn đã bình luận về Sách 
        <strong>{{ review.book.title }}</strong>
        [{{ review.book.author.name }}]
      </div>

      <div class="d-flex">
        <div class="me-1 star__wrap">
          <i v-for="n in review.star" :key="n" class="fa fa-star"></i>
        </div>
        <span class="fst-italic">{{ formatDate(review.createdAt) }}</span>
      </div>
      <div class="">"{{ review.comment }}"</div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center">
    <div class="mt-5">
      <div class="fs-1 d-flex justify-content-center mb-2">
        <i class="fa fa-exclamation-circle"></i>
      </div>
      <div class="fs-5 d-flex justify-content-center">Không có bình luận nào có sẵn tại thời điểm này.</div>
    </div>
  </div>
</template>

<script setup>
import { useReviewStore } from '../../stores/review.store'
import { computed, onMounted } from 'vue'

const reviewStore = useReviewStore()
onMounted(async () => {
  await reviewStore.fetchReviewUserAction()
})
const reviews = computed(() => reviewStore.getReviewUser)

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.star__wrap {
  color: #e85c0d;
}

.card__review {
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 70vw;
  background-color: #fff;
}
</style>