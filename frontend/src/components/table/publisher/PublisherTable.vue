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
        <tr v-for="pub in paginatedPublishers" :key="pub._id">
          <td>{{ pub._id }}</td>
          <td>{{ pub.name }}</td>
          <td>{{ pub.location }}</td>
          <td>{{ pub.establishedYear }}</td>
          <td>{{ formatDateHour(pub.createAt) }}</td>
          <td>{{ formatDateHour(pub.updateAt) }}</td>
          <td>
            <button @click="handleOpenDetail(pub)">Chi tiết</button>
            <button @click="handleDelete(pub._id)">Xóa</button>
            <button @click="handleOpenEdit(pub)">Sửa</button>
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
      <template #publisherDetail>
        <publisher-detail :publisher="selectedPublisher"></publisher-detail>
      </template>
    </main-modal>
    <main-modal :isOpen="isOpenEdit" :handleClose="handleClose">
      <template #publisherEdit>
        <publisher-edit :publisher="selectedPublisher" :handleClose="handleClose"></publisher-edit>
      </template>
    </main-modal>
  </Teleport>
</template>

<script setup>
import { usePublisherStore } from '@/stores/publisher.store'
import PublisherDetail from './PublisherDetail.vue'
import PublisherEdit from './PublisherEdit.vue'
import { computed, reactive, ref } from 'vue'

const publisherStore = usePublisherStore()
const publishers = computed(() => publisherStore.publishers || [])
defineProps({
  // publisher: Array,
  handleDelete: Function
})

const headers = reactive(['_Id', 'Tên', 'Địa chỉ', 'Năm thành lập', 'Ngày tạo', 'Ngày cập nhật'])

const isOpenDetail = ref(false)
const isOpenEdit = ref(false)
const selectedPublisher = ref(null)

function handleOpenDetail(publisher) {
  isOpenDetail.value = true
  selectedPublisher.value = publisher
}

function handleClose() {
  isOpenDetail.value = false
  isOpenEdit.value = false
}

function handleOpenEdit(publisher) {
  isOpenEdit.value = true
  selectedPublisher.value = publisher
}

function formatDateHour(date) {
  // const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Đặt thành `true` nếu bạn muốn định dạng 12 giờ (AM/PM)
  }
  return new Date(date).toLocaleDateString(undefined, options)
}

// paginatedRecords
const totalRecords = computed(() => publishers.value.length)
// const pageSize = ref(10) // Số lượng bản ghi mỗi trang
const pageSize = computed(() => {
  return publisherStore.selected
}) // Số lượng bản ghi mỗi trang
const currentPage = ref(1) // Trang hiện tại
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

const paginatedPublishers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return publishers.value.slice(start, end)
})
</script>

<style>
</style>