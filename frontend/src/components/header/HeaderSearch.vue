<template>
  <div class="navbar-left d-flex align-items-center">
    <div class="logo-wrap">
      <router-link :to="{ name: 'home' }">
        <img
          class="me-2"
          width="80px"
          height="80px"
          src="/src/assets/images/logo/logo-librazone.png"
          alt="Logo"
        />
      </router-link>
    </div>

    <form role="search" class="search__form" @submit.prevent="handleClickSearch">
      <div class="">
        <input
          class="form-control input-search-header"
          type="search"
          placeholder="Tìm kiếm sách..."
          aria-label="Search"
          v-model.trim="inputSearch"
        />
      </div>

      <button
        class="btn-search-header btn-header-bar ms-3 p-2 d-flex justify-content-center align-items-center text-dark"
        type="submit"
        :disabled="!inputSearch.trim()"
      >
        <i class="fa fa-search"></i>
      </button>

      <!-- propose__search -->
      <div class="propose__search" v-if="inputSearch.trim() && books.length > 0">
        <ul class="py-1">
          <li
            class="item__search my-1"
            v-for="(book, index) in books.slice(0, 7)"
            :key="book._id || index"
          >
            <div
              class="d-flex text-decoration-none text-dark"
              @click="handleClickCard(book._id)"
              role="button"
            >
              <img :src="book.image" alt="" class="img-thumbnail" />
              <span class="info__item w-100">
                <div class="book-title w-100 fw-bold">{{ book.title }}</div>
                <div class="book-author w-100 fst-italic">
                  {{ book.author?.name || 'Not updated' }}
                </div>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useBookStore } from '../../stores/book.store'
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const bookStore = useBookStore()
const router = useRouter()
const route = useRoute()
const inputSearch = ref('')

// Debounce search
let searchTimeout
watch(inputSearch, (newValue) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (newValue.trim()) {
      bookStore.searchBookAction(newValue.trim())
    }
  }, 300)
})

const books = computed(() => bookStore.searchBooks)

const handleClickCard = async (idBook) => {
  if (!idBook) return
  await router.push({
    name: 'bookDetail',
    params: { id: idBook }
  })
  inputSearch.value = ''
}

const handleClickSearch = async (event) => {
  event.preventDefault()
  const searchTerm = inputSearch.value.trim()

  if (!searchTerm) return

  try {
    await router.push({
      name: 'books',
      query: {
        search: searchTerm,
        page: 1 // Reset về trang 1 khi search mới
      }
    })

    // Nếu đang ở trang books, cần gọi API search
    if (route.name === 'books') {
      await bookStore.searchBookAction(searchTerm)
    }

    // Clear search suggest
    inputSearch.value = ''
  } catch (error) {
    console.log('Search error:', error)
  }
}
</script>

<style scoped>
.search__form {
  position: relative;
}

.propose__search {
  position: absolute;
  z-index: 10;
  background-color: #e8e8e8;
  left: 0;
  top: 6vh;
  width: 150%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

ul {
  padding: 0 7px;
  margin: 0;
  text-align: left;
}

li {
  list-style: none;
  padding: 7px;
  margin: 0;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}

li:hover {
  border-color: #000;
  background-color: rgba(0, 0, 0, 0.05);
}

.img-thumbnail {
  width: 40px;
  min-width: 40px;
  height: 60px;
  min-height: 60px;
  background-color: #ededed;
  margin-right: 10px;
  object-fit: cover;
}

.search__form {
  display: flex;
}

/* Add responsive styles */
@media (max-width: 576px) {
  .search__form {
    display: none !important;
  }
}

.btn-search-header:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>