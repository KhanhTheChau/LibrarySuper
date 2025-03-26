<template>
  <ul class="navbar-nav me-auto">
    <li class="nav-item d-flex justify-content-center align-items-center ms-2">
      <router-link class="nav-link" :to="{ name: 'login' }"
        ><i class="fa fa-sign-in-alt"></i> Đăng nhập</router-link
      >
    </li>
    <li class="nav-item d-flex justify-content-center align-items-center ms-2">
      <router-link class="nav-link" :to="{ name: 'signup' }"
        ><i class="fa fa-user"></i> Đăng ký</router-link
      >
    </li>
  </ul>

  <Teleport to="#app">
    <right-modal :isOpen="isOpenModel" :handleCloseModal="handleCloseModal"></right-modal>
  </Teleport>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth.store'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const { proxy } = getCurrentInstance()
const router = useRouter()

const isOpenModel = ref(false)

function handleSignOut() {
  authStore.logOutAction()
  proxy.$toast.add({
    severity: 'contrast',
    group: 'br',
    summary: 'Success',
    detail: 'Log out successfully',
    life: 3000
  })
  router.push('/login')
}

function handleOpenModal() {
  isOpenModel.value = true
}

function handleCloseModal() {
  isOpenModel.value = false
}
</script>

<style>
</style>