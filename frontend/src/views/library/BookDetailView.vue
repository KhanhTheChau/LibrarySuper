<script setup>
import EditionAbout from '../../components/book/EditionAbout.vue'
import BookImage from '../../components/book/BookImage.vue'
import { useBookStore } from '../../stores/book.store'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute() // Sử dụng useRoute thay vì useRouter
const bookStore = useBookStore()
const isLoading = ref(false)
const error = ref(null)

const bookDetail = computed(() => bookStore.book)

const fetchBookDetail = async (id) => {
  if (!id) return

  try {
    isLoading.value = true
    error.value = null
    await bookStore.getBookAction(id)
  } catch (err) {
    error.value = err.message || 'Failed to load book details'
    console.log('Error fetching book:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchBookDetail(route.params.id)
})

// Watch route.params.id thay vì route.currentRoute._value.params.id
watch(
  () => route.params.id,
  async (newId) => {
    await fetchBookDetail(newId)
  }
)
</script>

<template>
  <div class="container">
    <!-- Loading state -->
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Content -->
    <div v-else-if="bookDetail" class="wrap__book__detail row justify-content-center">
      <book-image :imageBook="bookDetail.image" :bookId="bookDetail._id" />
      <edition-about :bookDetail="bookDetail" />
    </div>

    <!-- No data state -->
    <div v-else class="text-center py-5">
      <p>Không có thông tin chi tiết về cuốn sách</p>
    </div>
  </div>
</template>

<style scoped>
.wrap__book__detail {
  padding: 20px 0;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.alert {
  margin: 20px 0;
}
</style>