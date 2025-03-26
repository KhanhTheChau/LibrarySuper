<template>
  <div v-if="reviews && reviews.length > 0" class="">
    <div class="card__review d-flex mb-3" v-for="review in reviews" :key="review._id">
      <div v-if="review.reader && review" class="d-flex">
        <div class="avatar__user" v-if="review.reader.image">
          <img
            v-if="review.reader.image"
            :src="review.reader.image"
            alt="avatar_reader"
            class="me-2"
          />
        </div>
        <div
          class="content__review"
          v-if="review.reader.firstName && review.reader.lastName && review.comment && review.star"
        >
          <div>
            <strong>{{ review.reader.firstName + ' ' + review.reader.lastName }}</strong
            >:
            {{ review.comment }}
          </div>
          <div class="d-flex">
            <div class="me-1 star__wrap">
              <i v-for="n in review.star" :key="n" class="fa fa-star"></i>
            </div>
            <span class="fst-italic">[{{ formatDate(review.createdAt) }}]</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center">
    <div class="mt-5">
      <div class="fs-1 d-flex justify-content-center mb-2">
        <i class="fa fa-exclamation-circle"></i>
      </div>
      <div class="fs-5 d-flex justify-content-center">Hiện tại không có bình luận nào.</div>
    </div>
  </div>
</template>

<script setup>
import { useReviewStore } from '../../stores/review.store'
import { computed, onMounted } from 'vue'

const props = defineProps({
  bookID: String
})
const reviewStore = useReviewStore()
onMounted(async () => {
  if (props.bookID) {
    await reviewStore.fetchReviewBookAction(props.bookID)
  }
})

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}
const reviews = computed(() => reviewStore.getReviewBook || [])
</script>

<style scoped>
.avatar__user img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid #000;
}

.star__wrap {
  color: #f09319;
}
</style>