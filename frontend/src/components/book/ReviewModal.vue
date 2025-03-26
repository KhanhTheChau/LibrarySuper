<template>
  <div class="form__wrap p-5">
    <div class="rating__review">
      <form class="star__raiting w-80 m-auto" @submit.prevent="submitReview">
        <textarea
          v-model="comment"
          placeholder="Enter your comment..."
          class="comment-input mt-3"
        ></textarea>

        <div class="wrap__button mt-1">
          <div>
            <input
              type="radio"
              v-model="star"
              value="1"
              name="rating"
              class="star-1 opacity-0 p-0 m-0 input__star"
              id="star-1"
            />
            <label :class="{ active: star >= 1 }" class="star star-1" property="" for="star-1"
              ><i class="fa fa-splotch"></i
            ></label>
            <input
              type="radio"
              v-model="star"
              value="2"
              name="rating"
              class="star-2 opacity-0 p-0 m-0 input__star"
              id="star-2"
            />
            <label :class="{ active: star >= 2 }" class="star star-2" property="" for="star-2"
              ><i class="fa fa-splotch"></i
            ></label>
            <input
              type="radio"
              v-model="star"
              value="3"
              name="rating"
              class="star-3 opacity-0 p-0 m-0 input__star"
              id="star-3"
            />
            <label :class="{ active: star >= 3 }" class="star star-3" property="" for="star-3"
              ><i class="fa fa-splotch"></i
            ></label>
            <input
              type="radio"
              v-model="star"
              value="4"
              name="rating"
              class="star-4 opacity-0 p-0 m-0 input__star"
              id="star-4"
            />
            <label :class="{ active: star >= 4 }" class="star star-4" property="" for="star-4"
              ><i class="fa fa-splotch"></i
            ></label>
            <input
              type="radio"
              v-model="star"
              value="5"
              name="rating"
              class="star-5 opacity-0 p-0 m-0 input__star"
              id="star-5"
            />
            <label :class="{ active: star >= 5 }" class="star star-5" property="" for="star-5"
              ><i class="fa fa-splotch"></i
            ></label>
          </div>
          <button type="submit" class="submit-btn ms-2 btn btn-dark">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useReviewStore } from '../../stores/review.store'
import { getCurrentInstance, ref } from 'vue'
const { proxy } = getCurrentInstance()

const reviewStore = useReviewStore()
const props = defineProps({
  bookId: String,
  handleClose: Function
})
const star = ref(0)
const comment = ref('')

async function submitReview() {
  if (star.value === 0) {
    proxy.$toast.add({
      severity: 'error',
      group: 'tr',
      summary: 'Success',
      detail: 'You have not selected the number of stars!',
      life: 3000
    })
    return
  }

  if (!comment.value.trim()) {
    proxy.$toast.add({
      severity: 'error',
      group: 'tr',
      summary: 'Success',
      detail: 'Comments cannot be empty!',
      life: 3000
    })
    return
  }
  const payload = {
    bookID: props.bookId,
    comment: comment.value,
    star: star.value
  }
  const response = await reviewStore.createReviewAction(payload)
  if (response === 201) {
    proxy.$toast.add({
      severity: 'contrast',
      group: 'tr',
      summary: 'Success',
      detail: 'You have successfully commented!',
      life: 3000
    })
  } else {
    proxy.$toast.add({
      severity: 'error',
      group: 'tr',
      summary: 'Success',
      detail: 'You have already commented on this book!',
      life: 3000
    })
  }
  props.handleClose()
}
</script>

<style scoped>
.form__wrap {
  width: 50vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

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

.active {
  color: #000000;
}

/* .star:hover,
.star__raiting:hover .star {
  color: #000000;
}

.star:hover ~ .star {
  color: gray;
} */

/* .comment-input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
} */

.comment-input {
  width: 40vw; /* Chiếm toàn bộ chiều rộng của container */
  max-width: 49vw; /* Đặt chiều rộng tối đa */
  min-width: 20vw; /* Đặt chiều rộng tối thiểu */
  height: auto;
  min-height: 150px; /* Chiều cao tối thiểu */
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical; /* Cho phép người dùng thay đổi kích thước theo chiều dọc */
  box-sizing: border-box; /* Đảm bảo padding không ảnh hưởng tới chiều rộng */
}

.wrap__button {
  display: flex;
  justify-content: flex-end;
}

/* Responsive cho màn hình nhỏ */
@media (max-width: 600px) {
  .form__wrap {
    width: 100%;
    padding: 15px;
  }

  .wrap__button {
    flex-direction: column;
  }

  .wrap__button button {
    margin-left: 0 !important;
    margin-top: 10px !important;
  }

  .star {
    font-size: 14px;
  }

  .comment-input {
    font-size: 12px;
    /* width: 50vw;    */
  }

  .submit-btn {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>