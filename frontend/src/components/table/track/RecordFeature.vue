<template>
  <div class="dataTable__top d-flex justify-content-between">
    <div class="dataTable__dropdown">
      <label
        ><select class="dataTable__selector" v-model="selected">
          <option disabled>State</option>
          <option value="All" selected>All</option>
          <option value="Waiting">Waiting</option>
          <option value="Approved">Approved</option>
          <option value="Borrowed">Borrowed</option>
        </select>
        entries per page</label
      >
    </div>
    <!-- <div class="dataTable__feature">
      <input class="dataTable-input" placeholder="Search..." type="text" fdprocessedid="k0gxpd" />
      <button class="me-2">Search</button>
    </div> -->
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  selectedState: {
    type: String
  }
})

// Định nghĩa emit
const emit = defineEmits(['update:selectedState'])

// Tạo một ref cho selected state và khởi tạo với giá trị từ props
const selected = ref(props.selectedState)

// Theo dõi sự thay đổi của selected để phát sự kiện
watch(selected, (newValue) => {
  emit('update:selectedState', newValue)
})

// Theo dõi sự thay đổi của props.selectedState để đồng bộ giá trị
watch(
  () => props.selectedState,
  (newValue) => {
    selected.value = newValue
  }
)
</script>

<style>
</style>