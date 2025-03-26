<template>
  <div class="p-4 form__wrap">
    <div class="addForm__title">
      <h3>Add User</h3>
      <hr />
    </div>
    <div class="">
      <form class="" enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="add__form">
          <div class="mb-3 mx-2">
            <label for="fnUser" class="form-label fw-bold">Họ lót</label>
            <input type="text" id="fnUser" class="form-control" v-model="dataUser.firstName" />
          </div>

          <div class="mb-3 mx-2">
            <label for="lnUser" class="form-label fw-bold">Tên</label>
            <input type="text" class="form-control" id="lnUser" v-model="dataUser.lastName" />
          </div>
          <div class="mb-3 mx-2">
            <label for="email" class="form-label fw-bold">Email</label>
            <input type="email" id="email" class="form-control" v-model="dataUser.email" />
          </div>
          <div class="mb-3 mx-2">
            <label for="phone" class="form-label fw-bold">Số điện thoại</label>
            <input type="text" class="form-control" id="phone" v-model="dataUser.phone" />
          </div>
          <div class="mb-3 mx-2">
            <label for="pwd" class="form-label fw-bold">Password</label>
            <input type="password" class="form-control" v-model="dataUser.password" id="pwd" />
          </div>

          <div class="mb-3 mx-2">
            <label for="addressUser" class="form-label fw-bold">Địa chỉ</label>
            <input type="text" class="form-control" id="addressUser" v-model="dataUser.address" />
          </div>
          <div class="gender__form mb-2">
            <label for="" class="form-label me-3 fw-bold fw-bold">Giới tính: </label>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="genderOptions"
                id="inlineRadio1"
                value="Male"
                checked
                v-model="dataUser.gender"
              />
              <label class="form-check-label" for="inlineRadio1 ">Nam</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="genderOptions"
                id="inlineRadio2"
                value="Female"
                v-model="dataUser.gender"
              />
              <label class="form-check-label" for="inlineRadio2">Nữ</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="genderOptions"
                id="inlineRadio2"
                value="Other"
                v-model="dataUser.gender"
              />
              <label class="form-check-label" for="inlineRadio2">Khác</label>
            </div>
          </div>
          <div class="mb-3 mx-2">
            <label for="dobUser" class="form-label fw-bold">Ngày sinh</label>
            <input type="date" class="form-control" id="dobUser" v-model="dataUser.dateOfBirth" />
          </div>

          <div class="mb-3 mx-2 d-flex flex-column">
            <label for="bioUser" class="form-label fw-bold">Giới thiệu</label>
            <textarea
              id="detailBook"
              name="detailBook"
              rows="4"
              cols="50"
              v-model="dataUser.bio"
            ></textarea>
          </div>
          <div class="gender__form mb-2">
            <label for="" class="form-label me-3 fw-bold">Vai trò: </label>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="roleOptions"
                id="inlineRadio2"
                value="reader"
                v-model="dataUser.role"
                checked
              />
              <label class="form-check-label" for="inlineRadio2">Reader</label>
            </div>

            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="roleOptions"
                id="inlineRadio1"
                value="admin"
                v-model="dataUser.role"
              />
              <label class="form-check-label" for="inlineRadio1">Admin</label>
            </div>
          </div>

          <div class="form__admin" v-if="dataUser.role === 'admin'">
            <div class="mb-3 mx-2">
              <label for="lnUser" class="form-label fw-bold">Ngày tuyển</label>
              <input type="date" class="form-control" id="lnUser" v-model="dataUser.hireDate" />
            </div>

            <div class="mb-3 mx-2">
              <label for="lnUser" class="form-label fw-bold">Lương</label>
              <input
                type="number"
                class="form-control"
                id="lnUser"
                v-model="dataUser.salary"
                min="0"
              />
            </div>
            <div class="mb-3 mx-2">
              <label for="lnUser" class="form-label fw-bold">Chức vụ</label>
              <input type="text" class="form-control" id="lnUser" v-model="dataUser.position" />
            </div>
          </div>

          <!-- <div class="mb-3 mx-2">
            <label for="avtUser" class="form-label">Avatar</label>
            <input type="file" name="avatar" id="avtUser" @change="handleFileUpload" />
          </div> -->
        </div>
        <button type="submit" class="btn btn-primary mt-4 submit__form">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user.store'
import { getCurrentInstance, reactive } from 'vue'
const instance = getCurrentInstance()
const proxy = instance?.proxy

const props = defineProps({
  handleClose: Function
})

const dataUser = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  address: '',
  gender: 'Male',
  dateOfBirth: '',
  bio: '',
  role: 'reader',
  phone: '',
  hireDate: '',
  salary: '',
  position: ''
})

const userStore = useUserStore()

const handleSubmit = async () => {
  const statusCode = await userStore.createUserAction(dataUser)
  if (statusCode === 201) {
    proxy?.$toast?.add({
      severity: 'contrast',
      group: 'tr',
      summary: 'Success',
      detail: 'Add new user successfully',
      life: 3000
    })
    props.handleClose()
  }
}
</script>

<style scoped>
.form__wrap {
  height: 80vh;
  width: 40vw;
}

.add__form {
  height: 55vh;
  overflow-y: scroll;
}

.submit__form {
  float: right;
}
</style>