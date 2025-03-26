<template>
  <div class="wrap__book container-fluid my-3">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Sách</h4>
          </div>
          <!--end card-header-->
          <div class="card-body">
            <div class="table-responsive">
              <div
                class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns"
              >
                <book-feature></book-feature>
                <book-table :bookList="bookList" :handleDeleteBook="handleDeleteBook"></book-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end col -->
    </div>
  </div>
</template>

<script setup>
import BookFeature from '@/components/table/book/BookFeature.vue'
import BookTable from '@/components/table/book/BookTable.vue'
import { useBookStore } from '@/stores/book.store'
import { computed, getCurrentInstance, onMounted } from 'vue'

const bookStore = useBookStore()

onMounted(async () => {
  await bookStore.fetchBookAction()
})

const bookList = computed(() => bookStore.books)
const { proxy } = getCurrentInstance()

function handleDeleteBook(id) {
  try {
    const res = bookStore.deleteBookAction(id)
    if (res) {
      proxy.$toast.add({
        severity: 'contrast',
        summary: 'Deleted',
        group: 'tr',
        detail: 'Delete successfully',
        life: 3000
      })
    }
  } catch (error) {
    proxy.$toast.add({
      severity: 'error',
      summary: 'Error',
      group: 'tr',
      detail: 'delete failed',
      life: 3000
    })
  }
}
</script>

<style scoped>
@media (max-width: 992px) {
  .wrap__book {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>