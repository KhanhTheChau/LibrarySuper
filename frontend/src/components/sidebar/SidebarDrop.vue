<template>
  <div>
    <div class="navbar__body">
      <ul class="navbar-nav me-auto">
        <!-- <li class="nav-item d-flex justify-content-center align-items-center">
          <router-link
            class="nav__link w-100 text-center"
            :class="{ active: $route.name === 'dashboard' }"
            :to="{ name: 'dashboard' }"
            @click="handleClose()"
          >
            <i class="bi bi-house-door me-2"></i> Dashboard
          </router-link>
        </li> -->
        <li class="nav-item d-flex justify-content-center align-items-center">
          <router-link
            class="nav__link w-100 text-center"
            :class="{ active: $route.name === 'borrow-book' }"
            :to="{ name: 'borrow-book' }"
            @click="handleClose()"
          >
            <i class="bi bi-book me-2"></i> Theo dõi
          </router-link>
        </li>
        <li
          
          class="nav-item d-flex justify-content-center align-items-center"
        >
          <router-link
            class="nav__link w-100 text-center"
            :class="{ active: $route.name === 'user-table' }"
            :to="{ name: 'user-table' }"
            @click="handleClose()"
          >
            <i class="bi bi-book me-2"></i> Độc giả
          </router-link>
        </li>
        <li
          
          class="nav-item d-flex justify-content-center align-items-center"
        >
          <router-link
            class="nav__link w-100 text-center"
            :class="{ active: $route.name === 'book-table' }"
            :to="{ name: 'book-table' }"
            @click="handleClose()"
          >
            <i class="bi bi-book me-2"></i> Sách
          </router-link>
        </li>
        <li
          
          class="nav-item d-flex justify-content-center align-items-center"
        >
          <router-link
            class="nav__link w-100 text-center"
            :class="{ active: $route.name === 'author-table' }"
            :to="{ name: 'author-table' }"
            @click="handleClose()"
          >
            <i class="bi bi-book me-2"></i> Tác giả
          </router-link>
        </li>
        <li
          
          class="nav-item d-flex justify-content-center align-items-center"
        >
          <router-link
            class="nav__link w-100 text-center"
            :class="{ active: $route.name === 'publisher-table' }"
            :to="{ name: 'publisher-table' }"
            @click="handleClose()"
          >
            <i class="bi bi-book me-2"></i> Nhà xuất bản
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '../../stores/admin.store'
import { computed, onMounted } from 'vue'

defineProps({
  handleClose: {
    type: Function
  }
})

const adminStore = useAdminStore()

const admin = computed(() => adminStore.getAdmin)

onMounted(async () => {
  if (!admin.value || Object.keys(admin.value).length === 0) {
    await adminStore.fetchAdmin()
  }
})
</script>

<style scoped>
.navbar__body ul li:hover {
  background-color: #ccc;
}

.active {
  background-color: #ccc;
}

.nav__link {
  text-decoration: none;
  color: #000;
  padding: 10px 0;
}
</style>