<template>
  <div class="container wrap__form my-5">
    <h3 class="text-center">Sign Up</h3>
    <form class="register" @submit.prevent="handleSubmit">
      <div class="name__form">
        <div class="firstName__form mb-2">
          <label for="firstName" class="form-label fw-bold">First Name</label>
          <input type="text" class="form-control" id="firstName" v-model="user.firstName" />
        </div>
        <div class="lastName__form mb-2">
          <label for="lastName" class="form-label fw-bold">Last Name</label>
          <input type="text" class="form-control" id="lastName" v-model="user.lastName" />
        </div>
      </div>
      <div class="gender__form mb-2">
        <label for="" class="form-label me-3 fw-bold">Gender: </label>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="Male"
            checked
            v-model="user.gender"
          />
          <label class="form-check-label" for="inlineRadio1">Male</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="Female"
            v-model="user.gender"
          />
          <label class="form-check-label" for="inlineRadio2">Female</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="Other"
            v-model="user.gender"
          />
          <label class="form-check-label" for="inlineRadio2">Other</label>
        </div>
      </div>

      <div class="form-group mb-2">
        <label for="dateInput " class="fw-bold form-label">Day of birth:</label>
        <input type="date" id="dateInput" class="form-control" v-model="user.dateOfBirth" />
      </div>

      <div class="form-group mb-2">
        <label for="addressInput " class="fw-bold form-label">Address:</label>
        <input type="text" id="addressInput" class="form-control" v-model="user.address" />
      </div>

      <div class="">
        <label for="emailAddress" class="form-label fw-bold">Email Address</label>
        <input type="email" class="form-control" id="emailAddress" v-model="user.email" />
      </div>
      <div>
        <label for="pwrd" class="form-label fw-bold">Password</label>
        <input
          type="password"
          id="pwrd"
          class="form-control"
          aria-describedby="passwordHelpBlock"
          v-model="user.password"
        />
      </div>
      <div>
        <label for="rePwrd" class="form-label fw-bold">Repeat Password</label>
        <input
          type="password"
          id="rePwrd"
          class="form-control"
          aria-describedby="passwordHelpBlock"
          v-model="user.rePassword"
        />
      </div>
      <div class="wrap__submit__btn mt-4 text-center">
        <button class="submit__btn text-light" type="submit">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from 'vue'
import { useAuthStore } from '../../stores/auth.store'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter() // Sử dụng router
    const authStore = useAuthStore()
    const user = reactive({
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      rePassword: '',
      address: '',
      dateOfBirth: '',
      gender: 'Male'
    })

    const { proxy } = getCurrentInstance()

    const handleSubmit = async () => {
      if (user.firstName === '') {
        proxy.$toast.add({
          severity: 'error',
          group: 'tr',
          summary: 'Error',
          detail: 'Please enter your first name.',
          life: 3000
        })
        document.querySelector('#firstName').focus()
        return
      }

      if (user.lastName === '') {
        proxy.$toast.add({
          severity: 'error',
          group: 'tr',
          summary: 'Error',
          detail: 'Please enter your last name.',
          life: 3000
        })
        // Focus trực tiếp vào ô input của lastName
        document.querySelector('#lastName').focus()
        return
      }

      if (user.dateOfBirth === '') {
        proxy.$toast.add({
          severity: 'error',
          group: 'tr',
          summary: 'Error',
          detail: 'Please enter your date.',
          life: 3000
        })
        // Focus trực tiếp vào ô input của lastName
        document.querySelector('#dateInput').focus()
        return
      }

      if (user.address === '') {
        proxy.$toast.add({
          severity: 'error',
          group: 'tr',
          summary: 'Error',
          detail: 'Please enter your address.',
          life: 3000
        })
        // Focus trực tiếp vào ô input của lastName
        document.querySelector('#addressInput').focus()
        return
      }

      if (user.email === '') {
        proxy.$toast.add({
          severity: 'error',
          group: 'tr',
          summary: 'Error',
          detail: 'Please enter your email.',
          life: 3000
        })
        document.querySelector('#emailAddress').focus()
        return
      }

      if (user.password === '') {
        proxy.$toast.add({
          severity: 'error',
          group: 'tr',
          summary: 'Error',
          detail: 'Please enter your password.',
          life: 3000
        })
        document.querySelector('#pwrd').focus()
        return
      }

      if (user.rePassword === '') {
        proxy.$toast.add({
          severity: 'error',
          group: 'tr',
          summary: 'Error',
          detail: 'Please enter your password.',
          life: 3000
        })
        document.querySelector('#rePwrd').focus()
        return
      }

      if (user.password !== user.rePassword) {
        proxy.$toast.add({
          severity: 'error',
          group: 'tr',
          summary: 'Error',
          detail: 'Password does not match',
          life: 3000
        })
        document.querySelector('#pwrd').focus()
        return
      }

      try {
        const reqUser = {
          lastName: user.firstName,
          firstName: user.lastName,
          email: user.email,
          password: user.password,
          address: user.address,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender
        }
        // await storeAuth.signUpActions(reqUser)
        const result = await authStore.signUpAction(reqUser)
        // Sử dụng `getCurrentInstance` để lấy `proxy`

        if (result === 201) {
          proxy.$toast.add({
            severity: 'contrast',
            summary: 'Success',
            group: 'tr',
            detail: 'Registered successfully',
            life: 3000
          })
          router.push({ name: 'login' })
        }
      } catch (error) {
        console.log(error)
        proxy.$toast.add({
          severity: 'error',
          summary: 'Error',
          group: 'tr',
          detail: 'Email already exists',
          life: 3000
        })
      }
    }

    return {
      user,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.wrap__form {
  width: 33vw;
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

  /* .submit__btn {
    font-size: 0.9rem;
    height: 2.2rem;
  } */
}
</style>