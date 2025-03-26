<template>
  <nav
    class="py-3 navbar-wrap navbar navbar-expand navbar-light bg-light wrap__header"
    aria-label="Second navbar example"
  >
    <div class="container- ">
      <div class="collapse navbar-collapse justify-content-end" id="navbarsExample02">
        <div class="navbar-right">
          <ul class="navbar-nav me-auto">
            <li
              class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2"
            >
              <a class="nav-link nav__link" aria-current="page" href="#" @click="handleSignOut"
                ><i class="fa fa-sign-out-alt" @click="handleSignOut"></i
              ></a>
            </li>
            <li
              class="nav-item btn-header-bar d-flex justify-content-center align-items-center ms-2"
            >
              <router-link
                class="nav__link w-100 text-center text-decoration-none text-dark"
                :to="{ name: 'home' }"
                ><i class="fa fa-book"></i
              ></router-link>
            </li>
            <li
              class="nav-item btn-header-bar justify-content-center align-items-center ms-2 modal__header"
            >
              <a class="nav-link nav__link" href="#" @click="handleOpenModal()"
                ><i class="pi pi-bars"></i
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <Teleport to="#app">
    <header-modal :isOpen="isOpenModel" :handleClose="handleCloseModal">
      <template #sidebarDrop>
        <sidebar-drop :handleClose="handleCloseModal"></sidebar-drop>
      </template>
    </header-modal>
  </Teleport>
</template>

<script setup>
import SidebarDrop from '../sidebar/SidebarDrop.vue'
import { useAuthStore } from '../../stores/auth.store'
import { getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const authStore = useAuthStore()
const router = useRouter()

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

const isOpenModel = ref(false)
function handleOpenModal() {
  isOpenModel.value = !isOpenModel.value
}

function handleCloseModal() {
  isOpenModel.value = false
}
</script>

<style scoped>
.btn-header-bar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #ebedf2;
  color: #000;
}
.wrap__header {
  border-bottom: 1px solid #ccc;
}

ul li:hover {
  border: 1px solid #000;
}

@media (min-width: 992px) {
  .modal__header {
    display: none !important;
  }
}
</style>