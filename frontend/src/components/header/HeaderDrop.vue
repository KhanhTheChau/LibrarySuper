<template>
  <div>
    <div class="navbar__body">
      <ul class="navbar-nav me-auto">
        <li class="nav-item d-flex justify-content-center align-items-center">
          <router-link
            class="nav-link w-100 text-center"
            :to="{ name: 'home' }"
            :class="{ active: $route.name === 'home' }"
            @click="handleClose()"
            >Trang chủ</router-link
          >
        </li>
        <li class="nav-item d-flex justify-content-center align-items-center">
          <router-link
            class="nav-link w-100 text-center"
            :to="{ name: 'about-us' }"
            :class="{ active: $route.name === 'about-us' }"
            @click="handleClose()"
            >Giới thiệu</router-link
          >
        </li>
        <li class="nav-item d-flex justify-content-center align-items-center">
          <router-link
            class="nav-link w-100 text-center"
            :to="{ name: 'my-book' }"
            :class="{ active: $route.name === 'my-book' }"
            @click="handleClose()"
            >Sách của tôi</router-link
          >
        </li>
        <li class="nav-item d-flex justify-content-center align-items-center">
          <router-link
            class="nav-link w-100 text-center"
            :to="{ name: 'books' }"
            :class="{ active: $route.name === 'books' }"
            @click="handleClose()"
            >Sách</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  handleClose: {
    type: Function
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
</style>