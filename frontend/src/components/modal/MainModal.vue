<template>
  <div class="wrap__model" v-if="isOpen">
    <div class="overlay__model" @click="handleClose()"></div>
    <div class="app__model" @click.stop>
      <div class="close__Model" @click="handleClose()">
        <i class="fa fa-times"></i>
      </div>
      <div>
        <slot name="bookDetail"></slot>
        <slot name="bookAdd"></slot>
        <slot name="bookEdit"></slot>

        <slot name="authorDetail"></slot>
        <slot name="authorAdd"></slot>
        <slot name="authorEdit"></slot>

        <slot name="publisherDetail"></slot>
        <slot name="publisherAdd"></slot>
        <slot name="publisherEdit"></slot>

        <slot name="userDetail"></slot>
        <slot name="userAdd"></slot>
        <slot name="userEdit"></slot>

        <slot name="viewAvt"></slot>
        <slot name="editProfile"></slot>

        <slot name="reviewModal"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean
  },
  handleClose: {
    type: Function
  }
})
</script>

<style scoped>
.overlay__model {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6) !important;
  z-index: 10;
}

.app__model {
  background-color: #fff;
  position: fixed;
  top: 50%; /* Đặt top là 50% */
  left: 50%; /* Đặt left là 50% */
  transform: translate(-50%, -50%); /* Dịch chuyển phần tử về giữa */
  z-index: 100;
  /* width: 80vw; */
  /* height: 80vh; */
}

.close__Model {
  position: absolute;
  right: 12px;
  top: 10px;
  border: 1px solid #ccc;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>