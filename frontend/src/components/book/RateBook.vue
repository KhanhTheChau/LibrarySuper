<template>
  <div class="rating__review">
    <div class="star__rating w-80 m-auto d-flex">
      <div class="star" :class="{ active: bookStar >= 1 }"><i class="fa fa-splotch"></i></div>
      <div class="star" :class="{ active: bookStar >= 2 }"><i class="fa fa-splotch"></i></div>
      <div class="star" :class="{ active: bookStar >= 3 }"><i class="fa fa-splotch"></i></div>
      <div class="star" :class="{ active: bookStar >= 4 }"><i class="fa fa-splotch"></i></div>
      <div class="star" :class="{ active: bookStar >= 5 }"><i class="fa fa-splotch"></i></div>
    </div>

    <div class="reviews__count ms-1">({{ reviewsCount }} Đánh giá)</div>
  </div>
</template>

<script setup>
defineProps({
  bookStar: Number,
  reviewsCount: Number
})
</script>

<style scoped>
.rating__review {
  display: flex;
  /* flex-direction: column; */
}

.star {
  position: relative;
  cursor: pointer;
  font-size: 20px;
  color: gray; /* Màu mặc định cho các ngôi sao */
  transition: color 0.3s ease; /* Hiệu ứng chuyển màu mượt mà */
  padding: 2px;
}

.input__star {
  position: absolute;
}

.active {
  color: #000000;
}
</style>