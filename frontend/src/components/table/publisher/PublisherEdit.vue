<template>
  <div class="p-4 form__wrap">
    <div class="addForm__title">
      <h3>Edit Publisher</h3>
      <hr />
    </div>
    <div class="">
      <form class="" enctype="multipart/form-data" @submit.prevent="handleSubmit">
        <div class="add__form">
          <div class="mb-3 mx-2">
            <label for="titleBook" class="form-label fw-bold">Tên</label>
            <input type="text" class="form-control" id="titleBook" v-model="dataPublisher.name" />
          </div>
          <div class="mb-3 mx-2">
            <label for="languageBook" class="form-label fw-bold">Địa chỉ</label>
            <input type="text" class="form-control" v-model="dataPublisher.location" />
          </div>
          <div class="mb-3 mx-2">
            <label for="languageBook" class="form-label fw-bold">Năm thành lập</label>
            <input type="text" class="form-control" v-model="dataPublisher.establishedYear" />
          </div>

          <div class="mb-3 mx-2">
            <label for="priceBook" class="form-label fw-bold">Email</label>
            <input
              type="text"
              class="form-control"
              id="priceBook"
              v-model="dataPublisher.contact.email"
            />
          </div>
          <div class="mb-3 mx-2">
            <label for="priceBook" class="form-label fw-bold">Số điện thoại</label>
            <input
              type="text"
              class="form-control"
              id="priceBook"
              v-model="dataPublisher.contact.phone"
            />
          </div>
          <div class="mb-3 mx-2">
            <label for="priceBook" class="form-label fw-bold">Website</label>
            <input
              type="text"
              class="form-control"
              id="priceBook"
              v-model="dataPublisher.contact.website"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-dark mt-4 submit__form">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { usePublisherStore } from '@/stores/publisher.store'
import { getCurrentInstance, reactive, toRefs } from 'vue'
const instance = getCurrentInstance()
const proxy = instance?.proxy

const props = defineProps({
  publisher: {
    type: Object,
    required: true
  },
  handleClose: Function
})
const pubStore = usePublisherStore()
const { publisher } = toRefs(props)
const dataPublisher = reactive({
  name: publisher.value.name,
  location: publisher.value.location,
  establishedYear: publisher.value.establishedYear,
  contact: {
    email: publisher.value.contact.email,
    phone: publisher.value.contact.phone,
    website: publisher.value.contact.website
  }
})

const handleSubmit = async () => {
  try {
    const formData = new FormData()
    for (const key in dataPublisher) {
      if (key === 'contact') {
        for (const contactKey in dataPublisher.contact) {
          formData.append(`contact[${contactKey}]`, dataPublisher.contact[contactKey])
        }
      } else {
        formData.append(key, dataPublisher[key])
      }
    }

    const res = await pubStore.updatePublisherAction(publisher.value._id, formData)

    if (res) {
      proxy?.$toast?.add({
        severity: 'contrast',
        group: 'tr',
        summary: 'Success',
        detail: 'Edit publisher successfully',
        life: 3000
      })
      props.handleClose()
    }
  } catch (error) {
    console.log('Error adding book:', error)
    alert('Failed to add book. Please try again.')
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
</style>