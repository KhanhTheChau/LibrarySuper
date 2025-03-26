<template>
  <div class="container">
    <div class="product-cards justify-content-around">
      <div
        v-for="product in paginatedProducts"
        :key="product.code"
        class="m-2 d-flex item-hover product-card"
      >
        <book-card :book="product"></book-card>
      </div>
    </div>

    <Paginator
      :first="first"
      :rows="rows"
      :totalRecords="totalRecords"
      :rowsPerPageOptions="[10, 20, 30]"
      @page="onPageChange"
      class="my-4"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Paginator from 'primevue/paginator'
import { useBookStore } from '../../stores/book.store'
import BookCard from '../../components/book/BookCard.vue'
const bookStore = useBookStore()
onMounted(async () => {
  await bookStore.fetchBookAction()
})

const products = computed(() => bookStore.books)

const first = ref(0) // Chỉ mục phần tử đầu tiên của trang hiện tại
const rows = ref(10) // Số sản phẩm trên mỗi trang

// Tính tổng số sản phẩm
const totalRecords = computed(() => products.value.length)

// Lấy danh sách sản phẩm hiện tại theo trang
const paginatedProducts = computed(() => {
  const start = first.value
  const end = start + rows.value // Không cần Math.min vì Paginator đã giới hạn trang
  return products.value.slice(start, end)
})

// Hàm xử lý sự kiện chuyển trang
const onPageChange = (event) => {
  first.value = event.first // Cập nhật chỉ mục phần tử đầu tiên
  rows.value = event.rows // Cập nhật số sản phẩm mỗi trang
}
</script>

<style scoped>
.product-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  /* padding: 16px; */
  text-align: center;
}

.item-hover {
  transition: transform 0.2s;
}

.item-hover:hover {
  /* transform: scale(1.05); */
  border-color: #000;
}
</style>
