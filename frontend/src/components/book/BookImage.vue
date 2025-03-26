<template>
  <div class="col-12 col-lg-3 mb-3 mb-lg-0">
    <div class="wrapp__image">
      <div class="img__book d-flex justify-content-center mb-2">
        <img alt="" :src="imageBook" class="img-thumbnail" />
      </div>
      <div class="btn__borrow">
        <borrow-button :bookId="bookId"></borrow-button>
        <review-button :bookId="bookId"></review-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BorrowButton from './BorrowButton.vue'
import ReviewButton from './ReviewButton.vue'

defineProps({
  imageBook: {
    type: String
  },
  bookId: {
    type: String
  }
})
</script>

<style scoped>
.wrapp__image {
  width: 100%;
}

.wrapp__image img {
  width: 100%;
}

/* Tablet styles (<= 992px) */
@media (max-width: 992px) {
  .wrapp__image img {
    height: 60vh;
    width: auto;
  }

  .btn__borrow {
    width: 40vw;
    margin: auto;
  }
}

/* Mobile styles (<= 768px) */
@media (max-width: 768px) {
  .btn__borrow {
    width: 52vw;
    margin: auto;
  }
}

/* Small mobile styles (<= 576px) */
@media (max-width: 576px) {
  .btn__borrow {
    width: 90vw;
    margin: auto;
  }
}

@media (max-width: 392px) {
  .btn__borrow {
    width: 80vw;
    margin: auto;
  }
}
</style>