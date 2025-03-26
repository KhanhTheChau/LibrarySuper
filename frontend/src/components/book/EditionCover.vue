<script setup>
import BorrowButton from './BorrowButton.vue'
defineProps({
  bookDetail: {
    type: Object
  }
})
</script>

<template>
  <div class="edition__cover col-3 me-3">
    <div class="card__book">
      <div class="img__book d-flex justify-content-center">
        <img alt="" :src="bookDetail.image" class="img-thumbnail" />
      </div>
      <div class="rating__review mt-2">
        <form class="star__raiting w-80 m-auto">
          <input
            type="submit"
            value="1"
            name="rating"
            class="star-1 opacity-0 p-0 m-0 input__star"
            id="star-1"
          />
          <label class="star star-1" property="" for="star-1"><i class="fa fa-splotch"></i></label>
          <input
            type="submit"
            value="1"
            name="rating"
            class="star-2 opacity-0 p-0 m-0 input__star"
            id="star-2"
          />
          <label class="star star-2" property="" for="star-2"><i class="fa fa-splotch"></i></label>
          <input
            type="submit"
            value="1"
            name="rating"
            class="star-3 opacity-0 p-0 m-0 input__star"
            id="star-3"
          />
          <label class="star star-3" property="" for="star-3"><i class="fa fa-splotch"></i></label>
          <input
            type="submit"
            value="1"
            name="rating"
            class="star-4 opacity-0 p-0 m-0 input__star"
            id="star-4"
          />
          <label class="star star-4" property="" for="star-4"><i class="fa fa-splotch"></i></label>
          <input
            type="submit"
            value="1"
            name="rating"
            class="star-5 opacity-0 p-0 m-0 input__star"
            id="star-5"
          />
          <label class="star star-5" property="" for="star-5"><i class="fa fa-splotch"></i></label>
        </form>
      </div>
      <div class="wrap__btn__ec preview__book mt-2">
        <button class="btn__ec border-0 w-100 p-2 fw-bold">Preview</button>
      </div>

      <borrow-button :bookId="bookDetail._id"></borrow-button>

      <div class="model__link d-flex justify-content-around mt-3">
        <div class="text-center wrap__mdlink">
          <button class="btn__mdlink"><i class="fa fa-book"></i></button>
          <p class="title__btn__mdlink">preview</p>
        </div>
        <div class="text-center wrap__mdlink">
          <button class="btn__mdlink"><i class="fa fa-comment"></i></button>
          <p class="title__btn__mdlink">cmt</p>
        </div>
        <div class="text-center wrap__mdlink">
          <button class="btn__mdlink"><i class="fa fa-share-alt"></i></button>
          <p class="title__btn__mdlink">share</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rating__review {
  display: flex;
  flex-direction: column;
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

.star:hover,
.star__raiting:hover .star {
  color: #000000;
}

.star:hover ~ .star {
  color: gray; /* Màu vàng khi hover */
}

.edition__cover {
  border: 2px solid #ccc;
  border-radius: 8px;
  /* width: 20%; */
  padding: 20px;
  height: 100%;
  transition: all 1s;
}

.edition__cover:hover {
  border-color: #000;
}

.card__book {
  width: 100%;
}

.title__btn__mdlink {
  font-size: 12px;
  line-height: 12px;
  margin: 0;
}

.btn__mdlink {
  background: none;
  color: #000;
  border: none;
}

.wrap__mdlink {
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  width: 55px;
  height: 55px;
  transition: 0.75s;
}

.wrap__mdlink:hover {
  background: #000;
  color: #fff;
  border-color: #000;
  cursor: pointer;
}
.wrap__mdlink:hover i {
  color: #fff;
}

.card__book .img__book img {
  border: 1px solid #ccc;
  border-radius: 1px;
  width: 80%;
}
/* .card__book .img__book img:hover {
  border-color: #000;
  cursor: pointer;
} */
.wrap__btn__ec,
.wrap__btn__ec .btn__ec {
  background: none;
  color: #000;
  border-radius: 8px;
  transition: all 0.75s;
}
.borrow__book {
  background: #61bc85;
  border: 2px solid #61bc85;
}

.preview__book {
  border: 2px solid #ccc;
}

.wrap__btn__ec:hover,
.wrap__btn__ec:hover .btn__ec {
  background: #000;
  color: #fff;
  border-color: #000;
}
</style>