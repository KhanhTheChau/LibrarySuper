<template>
  <div class="wrap__not__found bg-light text-dark">
    <div>
      <div class="icon__not__found"><i class="fa fa-sad-tear"></i></div>
      <div>
        <h3>{{ errorTitle }}</h3>
      </div>
      <div>
        <p>{{ errorDetail }}</p>
      </div>
      <div class="undo__btn__wrap">
        <router-link class="text-decoration-none p-2 fw-bold undo__btn" :to="{ name: 'home' }"
          >Quay lại trang chủ<i class="fa fa-undo"></i
        ></router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const errorTitle = ref('Oops! Sorry page does not found')
const errorDetail = ref('404! Page Not Found')
</script>

<style scoped>
.wrap__not__found {
  height: 100vh;
  text-align: center;
  background: #f8f9fa;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.undo__btn__wrap {
  border: 2px solid #ccc;
  border-radius: 10px;
  width: 50%;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
  color: #000;
  transition: all 0.5s;
}

.undo__btn {
  color: #000;
}

.undo__btn__wrap:hover {
  border: 2px solid #000;
}

.icon__not__found {
  font-size: 50px;
}
</style>