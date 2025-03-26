<template>
  <div class="container wrap__form my-5">
    <!-- <div class="container wrap__form my-5 col-md-6 col-lg-4"> -->
    <h3 class="text-center">Thay đổi mật khẩu</h3>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="currentPass" class="form-label fw-bold">Mật khẩu hiện tại</label>
        <input
          type="password"
          id="currentPass"
          class="form-control"
          aria-describedby="passwordHelpBlock"
          v-model="passwordData.currentPassword"
        />
      </div>
      <div>
        <label for="newPass" class="form-label fw-bold">Mật khẩu mới</label>
        <input
          type="password"
          id="newPass"
          class="form-control"
          aria-describedby="passwordHelpBlock"
          v-model="passwordData.newPassword"
        />
      </div>
      <div>
        <label for="confirmPass" class="form-label fw-bold">Xác nhận mật khẩu</label>
        <input
          type="password"
          id="confirmPass"
          class="form-control"
          aria-describedby="passwordHelpBlock"
          v-model="passwordData.confirmPassword"
        />
      </div>
      <div class="wrap__submit__btn mt-4 text-center">
        <button class="submit__btn text-light" type="submit">Xác nhận thay đổi</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useAuthStore } from '../../stores/auth.store'
import { useUserStore } from '../../stores/user.store'
import { getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()

const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const handleSubmit = async () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    proxy.$toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'New password and confirm password do not match.',
      life: 3000
    })
    return
  }

  try {
    const response = await userStore.changePassword(passwordData)
    if (response.status === 200) {
      proxy.$toast.add({
        severity: 'contrast',
        group: 'tr',
        summary: 'Success',
        detail: 'Password changed successfully!',
        life: 3000
      })
    }
    authStore.logOutAction()
    router.push({ name: 'login' })
  } catch (error) {
    proxy.$toast.add({
      severity: 'error',
      summary: 'Error',
      group: 'tr',
      detail: 'Failed to change password. Please try again.',
      life: 3000
    })
  }
}
</script>

<style scoped>
.wrap__form {
  width: 30vw;
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

/* Tablet styles (<= 992px) */
@media (max-width: 992px) {
  .wrap__form {
    width: 45vw;
  }
}

/* Mobile styles (<= 768px) */
@media (max-width: 768px) {
  .wrap__form {
    width: 60vw;
  }
}

/* Small mobile styles (<= 576px) */
@media (max-width: 576px) {
  .wrap__form {
    width: 80vw;
  }
}

@media (max-width: 290px) {
}
</style>