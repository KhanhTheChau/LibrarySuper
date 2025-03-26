<template>
  <div class="container-fluid the__header">
    <nav
      class="navbar-wrap navbar navbar-expand navbar-light bg-light"
      aria-label="Second navbar example"
    >
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarsExample02">
        <header-search></header-search>
        <header-body></header-body>
        <div class="navbar-right">
          <header-profile v-if="userLogin"></header-profile>
          <header-login v-else></header-login>
        </div>
      </div>
    </nav>
    <hr class="mt-0" />
  </div>
</template>

<script setup>
import HeaderSearch from './HeaderSearch.vue'
import HeaderBody from './HeaderBody.vue'
import HeaderLogin from './HeaderLogin.vue'
import HeaderProfile from './HeaderProfile.vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '../../stores/user.store'

const userStore = useUserStore()
const userLogin = ref(null)
onMounted(async () => {
  userLogin.value = await userStore.fetchUser(true)
})
</script>

<style>


.btn-header-bar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #ebedf2;
  transition: all 0.5s;
}

.btn-search-header {
  border: 1px solid #ebedf2;
}

.input-search-header:hover,
.btn-header-bar:hover {
  border: 1px solid #000;
}
</style>