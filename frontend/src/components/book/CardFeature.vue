<template>
  <div class="container">
    <div class="book__show mt-4" v-if="record">
      <div class="img__book">
        <img :src="record.book.image" alt="" />
        <div class="ms-1">
          <div class="content__book">
            <div class="title__book">
              <p class="fs-3 fw-bold mb-0">{{ record.book.title }}</p>
              <span>({{ formatDate(record.book.published_date) }})</span>
            </div>
            <div class="fst-italic">
              <p v-if="record.author" class="mb-0">{{ record.author.name }}</p>
              <p v-else class="mb-0">Updating author...</p>
            </div>
            <div class="stock__book">
              <p><strong>Tồn kho:</strong> {{ record.book.stock }}</p>
            </div>
            <div class="quantity__book" v-if="record.state === 'Order'">
              <p :class="record.book.stock < quantity ? 'text-danger' : ''">
                <strong>Số lượng:</strong> {{ quantity }}
              </p>
            </div>
            <div class="quantity__book" v-else>
              <p><strong>Số lượng:</strong> {{ record.quantity }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="product__feature mt-3 mx-2 d-flex" v-if="record.state === 'Order'">
        <div class="px-0 me-2 mb-2 input__quantity">
          <input type="number" placeholder="Quantity..." v-model="quantity" min="1" />
        </div>
        <div class="px-0 me-2 mb-2 confirm__book">
          <borrow-feature :trackId="record._id" :quantity="quantity"></borrow-feature>
        </div>
        <div class="px-0 me-2 cancel__book">
          <div class="">
            <button class="w-100" @click="handleCancel(record._id)">Hủy</button>
          </div>
        </div>
      </div>

      <div class="product__feature mt-3 mx-2 d-flex" v-else-if="record.state === 'Waiting'">
        <div><strong class="me-2">State:</strong> {{ record.state }}</div>

        <div class="ms-3" v-if="record.state === 'Waiting'">
          <button class="w-100" @click="handleCancel(record._id)">Hủy</button>
        </div>
      </div>

      <div class="ms-1" v-else>
        <div><strong class="">Due:</strong> {{ formatDate(record.dueDate) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRecordStore } from '../../stores/record.store'
import BorrowFeature from './BorrowFeature.vue'
import { useTrackStore } from '../../stores/track.store'
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const trackStore = useTrackStore()
const recordStore = useRecordStore()
const record = computed(() => trackStore.record)

const handleCancel = async (recordID) => {
  try {
    await recordStore.cancelRecord(recordID)
    await trackStore.fetchBorrowedBooks()
    trackStore.record = null
    toast.add({
      severity: 'contrast',
      summary: 'Success',
      group: 'tr',
      detail: 'Book canceled successfully',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'contrast',
      summary: 'Success',
      group: 'tr',
      detail: 'Failed to cancel book. Please try again.',
      life: 3000
    })
    console.log(error)
  }
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

const quantity = ref(1)
</script>

<style scoped>
.book__show .img__book img {
  width: 15vw;
}

.sort__book {
  height: 20vh;
}

.cancel__book,
.confirm__book {
  width: 100px;
}
.input__quantity input {
  width: 150px;
}

/* legend */

/*  */
.floating-box {
  position: relative;
  border: 1px solid #ccc;
}

.floating-label {
  position: absolute;
  top: -10px; /* Điều chỉnh vị trí */
  left: 15px; /* Điều chỉnh vị trí */
  background: white; /* Nền trắng để che đi phần khung viền */
  padding: 0 5px;
  font-size: 0.9rem;
  color: #666;
  font-weight: bold;
}

p {
  margin: 0;
}

/* Responsive */

/* Tablet styles (<= 992px) */
@media (max-width: 992px) {
  .book__show .img__book img {
    width: 100%;
  }

  .product__feature {
    flex-direction: column;
  }

  .title__book p {
    font-size: 22px !important;
  }

  .title__book span {
    font-size: 18px !important;
  }
}

/* Mobile styles (<= 768px) */
@media (max-width: 768px) {
  .input__quantity input {
    width: 100px;
  }

  .title__book p {
    font-size: 18px !important;
  }

  .title__book span {
    font-size: 16px !important;
  }
}

/* Small mobile styles (<= 576px) */
@media (max-width: 576px) {
  .book__show {
    width: 100% !important;
  }
  .img__book {
    display: flex;
    justify-content: center; /* Căn giữa theo chiều ngang */
    flex-direction: column;
  }
  .book__show .img__book img {
    width: 80vw;
    margin: 5px auto 20px !important;
  }
}

@media (max-width: 290px) {
}
</style>