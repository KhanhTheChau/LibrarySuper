<template>
  <div>
    <div class="dataTable__container">
      <table class="table dataTable__table table-hover" id="datatable_1">
        <thead class="thead-light">
          <tr>
            <th data-sortable="" v-for="header in headers" :key="header">
              <a href="#" class="dataTable-sorter">{{ header }}</a>
            </th>
          </tr>
        </thead>
        <tbody class="overflow__table">
          <tr v-for="book in paginatedBooks" :key="book._id">
            <td>{{ book._id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author ? book.author.name : '' }}</td>
            <td>{{ book.publisher ? book.publisher.name : '' }}</td>
            <td>{{ book.price }}</td>
            <td>{{ book.stock }}</td>
            <td>{{ book.country }}</td>
            <td>{{ book.language }}</td>
            <td>
              <button @click="handleOpenDetail(book)">Chi tiết</button>
              <button @click="handleDeleteBook(book._id)">Xóa</button>
              <button @click="handleOpenEdit(book)">Sửa</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- feature -->
      <div class="dataTable__bottom d-flex justify-content-between">
        <div class="dataTable-info">
          Showing {{ (currentPage - 1) * pageSize + 1 }} to
          {{ Math.min(currentPage * pageSize, totalRecords) }} of {{ totalRecords }} entries
        </div>
        <nav class="dataTable-pagination">
          <ul class="dataTable-pagination-list list-unstyled d-flex">
            <li
              v-for="page in totalPages"
              :key="page"
              :class="{ activePage: currentPage === page }"
            >
              <a href="#" @click.prevent="currentPage = page">{{ page }}</a>
            </li>
            <li class="pager" v-if="currentPage < totalPages">
              <a href="#" @click.prevent="currentPage++">›</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <Teleport to="#app">
      <main-modal :isOpen="isOpenDetail" :handleClose="handleClose">
        <template #bookDetail>
          <book-detail :book="selectedBook"></book-detail>
        </template>
      </main-modal>
      <main-modal :isOpen="isOpenEdit" :handleClose="handleClose">
        <template #bookEdit>
          <book-edit :book="selectedBook" :handleClose="handleClose"></book-edit>
        </template>
      </main-modal>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import BookDetail from './BookDetail.vue'
import BookEdit from './BookEdit.vue'
import { useBookStore } from '@/stores/book.store'

const bookStore = useBookStore()

const headers = reactive([
  'Mã sách',
  'Tên sách',
  'Tác giả',
  'Ngày xuất bản',
  'Giá',
  'Tồn kho',
  'Nguồn gốc',
  'Ngôn ngữ'
])

const props = defineProps({
  bookList: Array,
  handleDeleteBook: Function
})

const { bookList, handleDeleteBook } = toRefs(props)

const isOpenDetail = ref(false)
const isOpenEdit = ref(false)
const selectedBook = ref(null)
// methods

function handleOpenDetail(book) {
  isOpenDetail.value = true
  selectedBook.value = book
}

function handleClose() {
  isOpenDetail.value = false
  isOpenEdit.value = false
}

function handleOpenEdit(book) {
  isOpenEdit.value = true
  selectedBook.value = book
}

// paginatedRecords
const totalRecords = computed(() => bookList.value.length)
// const pageSize = ref(10) // Số lượng bản ghi mỗi trang
const pageSize = computed(() => {
  return bookStore.selected
}) // Số lượng bản ghi mỗi trang
const currentPage = ref(1) // Trang hiện tại
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return bookList.value.slice(start, end)
})
</script>

<style scoped>
.dataTable-pagination-list li a {
  text-decoration: none;
  color: #000444;
  border: 1px solid #eceff5;
  margin-left: 2px;
  padding: 6px 12px;
}

.dataTable__table thead tr th a {
  text-decoration: none;
  color: #000444;
}

.dataTable__table {
  width: 100%;
  border-collapse: collapse; /* Giúp các đường kẻ của bảng hiển thị đẹp hơn */
}

.dataTable__table tbody {
  /* display: inline-block; */
  /* max-width: 2000px; */
  max-height: 300px; /* Chiều cao tối đa của phần nội dung */
  overflow-y: auto; /* Kích hoạt thanh cuộn dọc */
}
</style>