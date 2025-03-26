<template>
  <div class="wrap__author container-fluid my-3">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Tác giả</h4>
          </div>
          <!--end card-header-->
          <div class="card-body">
            <div class="table-responsive">
              <div
                class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns"
              >
                <author-feature></author-feature>
                <author-table :authors="authorList" :handleDelete="handleDelete"></author-table>
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
import AuthorFeature from '@/components/table/author/AuthorFeature.vue'
import AuthorTable from '@/components/table/author/AuthorTable.vue'
import { useAuthorStore } from '@/stores/author.store'
import { computed, getCurrentInstance, onMounted } from 'vue'

const authorStore = useAuthorStore()

onMounted(async () => {
  await authorStore.fetchAuthorAction()
})

const authorList = computed(() => authorStore.authors)

const { proxy } = getCurrentInstance()
function handleDelete(id) {
  try {
    const res = authorStore.deleteAuthorAction(id)
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

  <style>
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

@media (max-width: 992px) {
  .wrap__author {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>
