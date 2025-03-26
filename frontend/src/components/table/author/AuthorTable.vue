<template>
  <div class="dataTable__container">
    <table class="table dataTable__table table-hover" id="datatable_1">
      <thead class="thead-light">
        <tr>
          <th data-sortable="" v-for="header in headers" :key="header">
            <a href="#" class="dataTable-sorter">{{ header }}</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in paginatedAuthors" :key="author._id">
          <td>{{ author._id }}</td>
          <td>{{ author.name }}</td>
          <td>{{ formatDate(author.dob) }}</td>
          <td>{{ author.link }}</td>
          <td>{{ formatDate(author.createAt) }}</td>
          <td>
            <button @click="handleOpenDetail(author)">Chi tiết</button>
            <button @click="handleDelete(author._id)">Xóa</button>
            <button @click="handleOpenEdit(author)">Chỉnh sửa</button>
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
          <li v-for="page in totalPages" :key="page" :class="{ activePage: currentPage === page }">
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
      <template #authorDetail>
        <author-detail :author="selectedAuthor"></author-detail>
      </template>
    </main-modal>
    <main-modal :isOpen="isOpenEdit" :handleClose="handleClose">
      <template #authorEdit>
        <author-edit :author="selectedAuthor" :handleClose="handleClose"></author-edit>
      </template>
    </main-modal>
  </Teleport>
</template>

<script setup>
import { useAuthorStore } from '@/stores/author.store'
import AuthorDetail from './AuthorDetail.vue'
import AuthorEdit from './AuthorEdit.vue'
import { computed, reactive, ref } from 'vue'
const authorStore = useAuthorStore()
const authors = computed(() => authorStore.authors || [])

defineProps({
  // authors: Array,
  handleDelete: Function
})

const headers = reactive(['_id', 'Name', 'Date of Birth', 'Info', 'Create At'])

const isOpenDetail = ref(false)
const isOpenEdit = ref(false)
const selectedAuthor = ref(null)
// methods

function handleOpenDetail(author) {
  isOpenDetail.value = true
  selectedAuthor.value = author
}

function handleClose() {
  isOpenDetail.value = false
  isOpenEdit.value = false
}

function handleOpenEdit(author) {
  isOpenEdit.value = true
  selectedAuthor.value = author
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

// paginatedRecords
const totalRecords = computed(() => authors.value.length)
// const pageSize = ref(10) // Số lượng bản ghi mỗi trang
const pageSize = computed(() => {
  return authorStore.selected
}) // Số lượng bản ghi mỗi trang
const currentPage = ref(1) // Trang hiện tại
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

const paginatedAuthors = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return authors.value.slice(start, end)
})
</script>

<style>
</style>