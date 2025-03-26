<template>
  <div class="dataTable__container">
    <table class="table dataTable__table" id="datatable_1">
      <thead class="thead-light">
        <tr>
          <th data-sortable="" v-for="header in headers" :key="header">
            <a href="#" class="dataTable-sorter">{{ header }}</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="record in paginatedRecords"
          :key="record._id"
          @click="handleClickRecord(record._id)"
          :class="{ activeRecord: activeRecordId === record._id }"
        >
          <td>{{ record._id }}</td>
          <td>{{ record.book.title }}</td>
          <td v-if="record.book.author">{{ record.book.author.name }}</td>
          <td v-else-if="!record.book.author.name">updating...</td>
          <td>{{ record.reader.firstName + ' ' + record.reader.lastName }}</td>
          <td>{{ record.reader.address }}</td>
          <td>{{ record.reader.email }}</td>
          <td>{{ record.quantity }}</td>
          <td>{{ record.state }}</td>
        </tr>
      </tbody>
    </table>
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
</template>

<script setup>
import { useRecordStore } from '@/stores/record.store'
import { computed, onMounted, reactive, ref, toRefs } from 'vue'

const recordStore = useRecordStore()

const props = defineProps({
  selectedState: {
    type: String
  }
})

const { selectedState } = toRefs(props)

const headers = reactive([
  '_Id',
  'Tên sách',
  'Tác giả',
  'Độc giả',
  'Địa chỉ',
  'Email',
  'Số lượng',
  'Trạng thái'
])
onMounted(async () => {
  await recordStore.fetchRecords()
})
const records = computed(() => recordStore.getRecordByState(selectedState.value))

const activeRecordId = ref(null)

const handleClickRecord = (recordID) => {
  activeRecordId.value = recordID
  recordStore.setRecord(recordID)
}

// paginatedRecords
const totalRecords = computed(() => records.value.length)
const pageSize = ref(6) // Số lượng bản ghi mỗi trang
const currentPage = ref(1) // Trang hiện tại
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return records.value.slice(start, end)
})
</script>

<style scoped>
.activeRecord td {
  background-color: #e8e8e8; /* Màu nền cho hàng đang hoạt động */
}

.activePage a {
  border-color: #000;
}
</style>