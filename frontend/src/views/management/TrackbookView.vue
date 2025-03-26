<template>
  <div>
    <record-show></record-show>
    <record-management></record-management>
  </div>
</template>

<script setup>
import RecordManagement from '@/components/table/track/RecordManagement.vue'
import RecordShow from '@/components/table/track/RecordShow.vue'
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

.card-title {
  font-size: 1rem;
}
</style>
