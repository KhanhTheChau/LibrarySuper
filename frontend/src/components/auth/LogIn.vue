<template>
  <div class="container wrap__form my-5">
    <!-- <div class="container wrap__form my-5 col-md-6 col-lg-4"> -->
    <h3 class="text-center">Log In</h3>
    <form @submit.prevent="handleLogin">
      <div class="">
        <label for="emailAddress" class="form-label fw-bold">Email Address</label>
        <input
          type="email"
          class="form-control"
          id="emailAddress"
          v-model="user.email"
          ref="emailInput"
        />
      </div>
      <div>
        <label for="pwrd" class="form-label fw-bold">Password</label>
        <input
          type="password"
          id="pwrd"
          class="form-control"
          aria-describedby="passwordHelpBlock"
          v-model="user.password"
          ref="passwordInput"
        />
      </div>
      <div class="wrap__submit__btn mt-4 text-center">
        <button class="submit__btn text-light" type="submit">Log In</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useAuthStore } from '../../stores/auth.store'
import { getCurrentInstance, reactive, ref } from 'vue'
const storeAuth = useAuthStore()
const { proxy } = getCurrentInstance()

const user = reactive({
  email: '',
  password: ''
})

const emailInput = ref(null)
const passwordInput = ref(null)

const handleLogin = async () => {
  if (user.email === '') {
    proxy.$toast.add({
      severity: 'error',
      group: 'tr',
      summary: 'error',
      detail: 'Please enter your email address.',
      life: 3000
    })
    emailInput.value.focus()
    return
  }

  if (user.password === '') {
    proxy.$toast.add({
      severity: 'error',
      group: 'tr',
      summary: 'error',
      detail: 'Please enter your password.',
      life: 3000
    })
    passwordInput.value.focus()
    return
  }

  try {
    const statusUser = await storeAuth.logInAction(user)
    console.log(statusUser)
    if (statusUser === 200) {
      proxy.$toast.add({
        severity: 'contrast',
        group: 'br',
        summary: 'Success',
        detail: 'Log in successfully',
        life: 3000
      })
    }
  } catch (error) {
    console.log(error.message)
    proxy.$toast.add({
      severity: 'error',
      summary: 'Error',
      group: 'tr',
      detail: 'Account or password is incorrect',
      life: 3000
    })
  }
}
</script>

<style scoped>
.wrap__form {
  width: 28vw;
  padding: 30px;
  border: 1px solid #000;
  border-radius: 4px;
}

.form-control {
  transition: all 0.75s;
}
.form-control:hover {
  border-color: #000;
}

.submit__btn {
  width: 100%;
  height: 2.5rem;
  background-color: #0376b8;
  color: #fff;
  border-radius: 8px;
  border: none;
}

.submit__btn:hover {
  background: #013654;
  /* border: #000; */
}

/* Responsive Design */
@media (max-width: 992px) {
  .wrap__form {
    width: 45vw;
  }
}

@media (max-width: 768px) {
  .wrap__form {
    width: 60vw;
  }
}

@media (max-width: 576px) {
  .wrap__form {
    width: 90vw;
  }
}
</style>