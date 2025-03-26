<template>
  <div
    class="avatar__user col-12 col-sm-4 me-4 d-flex justify-content-center"
    v-if="user && user.image"
  >
    <div class="wrap__avt">
      <div class="position__wrap">
        <img class="img-thumbnail" :src="user.image" alt="" @click="handleViewAvatar()" />
        <!-- Nút để chọn và tải lên ảnh đại diện -->
        <button class="btn__changeImage" @click="triggerFileSelect">
          <i class="fa fa-crop-alt"></i>
        </button>
      </div>

      <!-- Form ẩn để gửi file, yêu cầu của Multer -->
      <form
        ref="uploadForm"
        class="d-none"
        enctype="multipart/form-data"
        @submit.prevent="handleSubmit"
      >
        <input type="file" name="avatar" ref="fileInput" @change="handleFileUpload" />
      </form>
    </div>
    <Teleport to="#app">
      <main-modal :isOpen="isOpen" :handleClose="handleClose">
        <template #viewAvt>
          <view-avatar :pathAvt="user.image"></view-avatar>
        </template>
      </main-modal>
    </Teleport>
  </div>
</template>

<script setup>
import ViewAvatar from './ViewAvatar.vue'
import { useUserStore } from '../../stores/user.store'
import { computed, ref } from 'vue'

const userStore = useUserStore()
const user = computed(() => {
  return userStore.getUser
})

const imagePath = ref(null)

const triggerFileSelect = () => {
  const fileInput = document.querySelector("input[type='file']")
  fileInput.click()
}

const handleFileUpload = (event) => {
  imagePath.value = event.target.files[0]
  if (imagePath.value) {
    handleSubmit()
  }
}

// Hàm gửi form ẩn với file đã chọn
const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('image', imagePath.value)

  // Gửi formData đến API
  try {
    await userStore.editAvatar(user.value._id, formData)
    // alert('Avatar updated successfully!')
  } catch (error) {
    console.log('Error uploading avatar:', error)
    alert('Failed to update avatar.')
  }
}

//
const isOpen = ref(false)
function handleViewAvatar() {
  isOpen.value = true
}
function handleClose() {
  isOpen.value = false
}
</script>


<style scoped>
.wrap__avt {
  position: relative;
}

.avatar__user img {
  border-radius: 50%;
  width: 40vh;
  transition: all 0.5s;
}

.avatar__user img:hover {
  border-color: #000;
}

.position__wrap {
  position: relative;
}

.btn__changeImage {
  position: absolute;
  bottom: 0;
  right: 7%;
  border-radius: 52%;
  width: 60px;
  height: 60px;
  font-size: 28px;
  border-color: #fff;
  transition: all 0.5s;
}

.btn__changeImage:hover {
  border-color: #000;
}

/* Tablet styles (<= 992px) */
@media (max-width: 992px) {
  .btn__changeImage {
    font-size: 24px;
  }
}

/* Mobile styles (<= 768px) */
@media (max-width: 768px) {
  .btn__changeImage {
    width: 45px;
    height: 45px;
    font-size: 22px;
  }
}

/* Small mobile styles (<= 576px) */
@media (max-width: 576px) {
  .btn__changeImage {
    width: 58px;
    height: 58px;
    font-size: 22px;
  }

  .avatar__user img {
    width: 50vw;
  }
}

@media (max-width: 290px) {
  .btn__changeImage {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }
}
</style>