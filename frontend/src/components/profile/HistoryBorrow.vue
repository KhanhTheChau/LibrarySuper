<template>
  <div class="card">
    <TreeTable :value="nodes" tableStyle="min-width: 50rem">
      <Column field="index" header="Index" style="width: 5%"></Column>
      <Column field="title" header="Title" style="width: 20%"></Column>
      <Column field="author" header="Author" style="width: 13%"></Column>
      <Column field="publisher" header="Publisher" style="width: 13%"></Column>
      <Column field="quantity" header="Quantity" style="width: 6%"></Column>
      <Column field="dateBorrowed" header="Date Borrow" style="width: 15%"></Column>
      <Column field="dateApproved" header="Date Approve" style="width: 15%"></Column>
      <Column field="dueDate" header="Date Return" style="width: 15%"></Column>
    </TreeTable>
  </div>
</template>

<script setup>
import TreeTable from 'primevue/treetable'
import Column from 'primevue/column'
import { ref, onMounted } from 'vue'
import { useTrackStore } from '../../stores/track.store'

const trackStore = useTrackStore()
const nodes = ref([])

onMounted(async () => {
  await trackStore.fetchBorrowedBooks()
  nodes.value = formatNodes(trackStore.getBorrowedBooks)
})

// Hàm định dạng ngày tháng
function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  return new Date(date).toLocaleDateString(undefined, options)
}

// Hàm định dạng dữ liệu cho TreeTable
function formatNodes(records) {
  return records.map((record, index) => ({
    key: record._id,
    data: {
      index: index + 1,
      title: record.book.title,
      author: record.book.author.name || 'Updating author...',
      publisher: record.book.publisher.name || 'Unknown Publisher',
      quantity: `${record.quantity} / ${record.book.stock}`,
      dateBorrowed: formatDate(record.dateBorrowed),
      dateApproved: formatDate(record.dateApproved),
      dueDate: formatDate(record.dueDate)
    },
    children: []
  }))
}
</script>

<style scoped>
/* Thêm dấu ba chấm cho nội dung dài */
.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.p-treetable-tbody tr:hover {
  background-color: #ccc !important;
}

/* Responsive styles */
@media (max-width: 992px) {
  .card {
    width: 90vw;
  }
}

@media (max-width: 768px) {
  .card {
    padding: 0 10px;
  }
  .p-column-title {
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .p-column-title {
    font-size: 12px;
    padding: 5px;
  }
}

@media (max-width: 290px) {
  .p-column-title {
    font-size: 10px;
  }
}
</style>