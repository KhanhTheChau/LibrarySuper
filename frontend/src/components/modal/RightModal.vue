<template>
  <div v-if="isOpen" class="app__model">
    <div class="wrap__model" @click="handleCloseModal()"></div>
    <div class="right__modal" @click.stop>
      <div class="header__model title__line"><h4 class="px-3 pt-3">Thư viện của tôi</h4></div>
      <div class="main__model">
        <ul class="list-unstyled list__options">
          <li class="ps-5 pb-2">
            <button>Đăng nhập</button>
            <button>Đăng ký</button>
          </li>
          <li class="title__line">
            <a href="" class="ps-3 text-decoration-none text-dark fw-bold">Browse</a>
          </li>
          <li class="content__line">
            <a href="" class="ps-3 text-decoration-none text-dark">Browse</a>
          </li>
          <li class="content__line">
            <a href="" class="ps-3 text-decoration-none text-dark">Browse</a>
          </li>
          <li class="content__line">
            <a href="" class="ps-3 text-decoration-none text-dark">Browse</a>
          </li>
          <li class="content__line">
            <a href="" class="ps-3 text-decoration-none text-dark">Browse</a>
          </li>
          <li class="title__line">
            <a href="" class="ps-3 text-decoration-none text-dark fw-bold">Contribute</a>
          </li>
          <li class="title__line">
            <a href="" class="ps-3 text-decoration-none text-dark fw-bold">Resources</a>
          </li>
        </ul>
      </div>
      <hr />
      <div class="footer__model"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean
    },
    handleCloseModal: {
      type: Function
    }
  }
}
</script>

<style scoped>
.wrap__model {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;

  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  animation: fadeln 0.2s;
  opacity: 0.6;
}

.right__modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 25%;
  height: 100%;
  background: #fff;
  border: 1px solid #888;
  /* padding: 20px; */
  color: #000;
  animation: sweep 0.2s;
  z-index: 999;
  /* opacity: 1; */
}

.title__line::after {
  content: '';
  width: 100%;
  margin: 5px auto 0;
  border-bottom: 1px solid #000;
  display: block;
}

.content__line::after {
  content: '';
  width: 100%;
  margin: 10px auto 0;
  border-bottom: 1px solid #dcdcdc;
  display: block;
}

.content__line:hover {
  background: #f8f9fa;
}

@keyframes sweep {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeln {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.6;
  }
}
</style>