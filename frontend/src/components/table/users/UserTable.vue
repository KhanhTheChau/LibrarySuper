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
        <tr v-for="user in paginatedUser" :key="user._id">
          <td>{{ user._id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="handleOpenDetail(user)">Detail</button>
            <button @click="handleDelete(user._id)">Delete</button>
          </td>
          <Teleport to="#app">
            <main-modal :isOpen="isOpenDetail" :handleClose="handleClose">
              <template #userDetail>
                <user-detail :user="selectedUser"></user-detail>
              </template>
            </main-modal>
          </Teleport>
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
import { useUserStore } from '@/stores/user.store'
import UserDetail from './UserDetail.vue'
import { computed, reactive, ref } from 'vue'
const userStore = useUserStore()

const users = computed(() => userStore.users || [])

defineProps({
  // users: Array,
  handleDelete: Function
})
// const { users, handleDelete } = toRefs(props)

const headers = reactive([
  'Mã độc giả',
  'Họ lót',
  'Tên',
  'Giới tính',
  'Email',
  'Số điện thoại',
  'Địa chỉ',
  'Vai trò'
])
const isOpenDetail = ref(false)
const isOpenEdit = ref(false)
const selectedUser = ref(null)
// methods

function handleOpenDetail(author) {
  isOpenDetail.value = true
  selectedUser.value = author
}

function handleClose() {
  isOpenDetail.value = false
  isOpenEdit.value = false
}

// paginatedRecords
const totalRecords = computed(() => users.value.length)
// const pageSize = ref(10) // Số lượng bản ghi mỗi trang
const pageSize = computed(() => userStore.selected || 10)
const currentPage = ref(1) // Trang hiện tại
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

const paginatedUser = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return users.value.slice(start, end)
})
</script>

<style>
</style>