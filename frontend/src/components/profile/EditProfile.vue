<template>
  <div class="p-4 form__wrap">
    <div class="addForm__title">
      <h3>Edit Profile</h3>
      <hr />
    </div>
    <div class="from_edit">
      <form class="" enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="add__form">
          <div class="mb-3 mx-2">
            <label for="firstName" class="form-label fw-bold">Họ lót</label>
            <input type="text" class="form-control" id="firstName" v-model="dataUser.firstName" />
          </div>
          <div class="mb-3 mx-2">
            <label for="lastName" class="form-label fw-bold">Tên</label>
            <input type="text" class="form-control" id="lastName" v-model="dataUser.lastName" />
          </div>
          <div class="mb-3 mx-2">
            <label for="numberPhone" class="form-label fw-bold">Số điện thoại</label>
            <input type="text" class="form-control" id="numberPhone" v-model="dataUser.phone" />
          </div>
          <div class="mb-3 mx-2">
            <label class="form-label fw-bold">Giới tính</label>
            <div class="form-check">
              <input
                type="radio"
                id="gender-male"
                class="form-check-input"
                name="gender"
                value="Male"
                v-model="dataUser.gender"
              />
              <label for="gender-male" class="form-check-label">Nam</label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                id="gender-female"
                class="form-check-input"
                name="gender"
                value="Female"
                v-model="dataUser.gender"
              />
              <label for="gender-female" class="form-check-label">Nữ</label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                id="gender-order"
                class="form-check-input"
                name="gender"
                value="Other"
                v-model="dataUser.gender"
              />
              <label for="gender-female" class="form-check-label">Khác</label>
            </div>
          </div>
          <div class="mb-3 mx-2">
            <label for="dob" class="form-label fw-bold">Ngày sinh</label>
            <input type="date" class="form-control" id="dob" v-model="dataUser.dateOfBirth" />
          </div>
          <div class="mb-3 mx-2 d-flex flex-column">
            <label for="bio" class="form-label fw-bold">Giới thiệu</label>
            <textarea id="bio" name="bio" rows="4" cols="50" v-model="dataUser.bio"></textarea>
          </div>
          <div class="mb-3 mx-2">
            <label for="addressUser" class="form-label fw-bold">Địa chỉ</label>
            <input type="text" class="form-control" id="addressUser" v-model="dataUser.address" />
          </div>
        </div>
        <button type="submit" class="btn btn-dark mt-4 submit__form">Xác nhận</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../../stores/user.store'
import { computed, getCurrentInstance, reactive } from 'vue'

const { proxy } = getCurrentInstance()

const userStore = useUserStore()
const user = computed(() => userStore.getUser)

const props = defineProps({
  handleClose: Function
})

const dataUser = reactive({
  firstName: user.value.firstName,
  lastName: user.value.lastName,
  gender: user.value.gender,
  dateOfBirth: user.value.dateOfBirth,
  bio: user.value.bio,
  address: user.value.address,
  phone: user.value.phone
})

const handleSubmit = async () => {
  try {
    const formData = new FormData()
    for (const key in dataUser) {
      formData.append(key, dataUser[key])
    }
    const res = await userStore.editProfileUser(user.value._id, formData)

    if (res) {
      proxy.$toast.add({
        severity: 'contrast',
        group: 'tr',
        summary: 'Success',
        detail: 'Profile updated successfully!',
        life: 3000
      })
    }
    props.handleClose()
  } catch (error) {
    console.log('Error adding book:', error)
    proxy.$toast.add({
      severity: 'error',
      summary: 'Error',
      group: 'tr',
      detail: 'Failed to update profile. Please try again.',
      life: 3000
    })
  }
}
</script>

<style scoped>
.form__wrap .from_edit {
  max-height: 80vh;
  width: 40vw;
  overflow-y: scroll;
}

/* Tablet styles (<= 992px) */
@media (max-width: 992px) {
  .form__wrap .from_edit {
    width: 60vw;
  }
}

/* Mobile styles (<= 768px) */
@media (max-width: 768px) {
  .form__wrap .from_edit {
    width: 65vw;
  }
}

/* Small mobile styles (<= 576px) */
@media (max-width: 576px) {
  .form__wrap .from_edit {
    width: 75vw;
  }
}

@media (max-width: 290px) {
}
</style>