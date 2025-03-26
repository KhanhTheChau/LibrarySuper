<template>
  <div class="wrap__management container-fluid mt-2">
    <div class="row table__records">
      <div class="col-12">
        <div class="card wrap__card">
          <div class="card-header">
            <h4 class="card-title">Quản lý mượn sách</h4>
          </div>
          <!--end card-header-->
          <div class="card-body">
            <div class="table-responsive">
              <div
                class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns"
              >
                <record-feature
                  :selectedState="selectedState"
                  @update:selectedState="updateSelectedState"
                ></record-feature>
                <record-table :selectedState="selectedState"></record-table>
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
import { ref } from 'vue'
import RecordFeature from './RecordFeature.vue'
import RecordTable from './RecordTable.vue'

const selectedState = ref('All')
const updateSelectedState = (newState) => {
  selectedState.value = newState
}
</script>

<style scoped>
.wrap__card {
  min-height: 200px; /* Đặt min-height nếu muốn card có chiều cao tối thiểu */
  max-height: 90vh; /* Để tránh vượt quá màn hình */
  overflow: auto; /* Thêm cuộn nếu nội dung quá dài */
}
</style>