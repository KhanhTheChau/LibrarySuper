<template>
  <ul class="navbar-nav me-auto">
    <li class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2">
      <a class="nav-link active" aria-current="page" href="#"
        ><i class="fa fa-sign-out-alt" @click="handleSignOut"></i
      ></a>
    </li>
    <li class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2">
      <router-link class="nav-link p-0" :to="{ name: 'profile-user' }"
        ><img :src="user.image" class="img-fluid avatar__user" alt=""
      /></router-link>
    </li>
    <li
      class="nav-item btn-header-bar justify-content-center align-items-center ms-2 modal__header"
    >
      <a class="nav-link" href="#" @click="handleOpenModal()"><i class="pi pi-bars"></i></a>
    </li>
  </ul>
  <Teleport to="#app">
    <header-modal :isOpen="isOpenModel" :handleClose="handleCloseModal">
      <template #headerDrop>
        <header-drop :handleClose="handleCloseModal"></header-drop>
      </template>
    </header-modal>
  </Teleport>
</template>

<script setup>
import HeaderDrop from './HeaderDrop.vue'
import { useAuthStore } from '../../stores/auth.store'
import { computed, getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const { proxy } = getCurrentInstance()
const router = useRouter()
const isOpenModel = ref(false)
import { useUserStore } from '../../stores/user.store'

const userStore = useUserStore()
const user = computed(() => {
  return userStore.getUser
})

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
  isOpenModel.value = !isOpenModel.value
}

function handleCloseModal() {
  isOpenModel.value = false
}
</script>

<style scoped>
.avatar__user {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.modal__header {
  display: flex;
}

@media (min-width: 992px) {
  .modal__header {
    display: none !important;
  }
}
</style>