<template>
  <div class="container">
    <hr />
    <footer class="py-3 mt-4">
      <ul class="nav justify-content-center">
        <li class="nav-item" v-for="(navOptions, index) in navFooter" :key="index">
          <a :href="navOptions.link" target="_blank" class="nav-link px-2 text-body-secondary">{{
            navOptions.name
          }}</a>
        </li>
      </ul>
      <div class="pb-3 border-bottom text-center">
        <a :href="contentAddress.link" target="_blank" class="nav-link px-2 text-body-secondary">{{
          contentAddress.name
        }}</a>
        <p class="text-center text-body-secondary pt-2">{{ contentAuthor.name }}</p>
      </div>
      <p class="text-center text-body-secondary pt-2">{{ contentFooter }}</p>
    </footer>
  </div>
</template>

<script >
import { reactive, ref } from 'vue'
export default {
  setup() {
    const navFooter = reactive([
      {
        name: 'FaceBook',
        link: 'https://www.facebook.com/khanhchau567/?locale=vi_VN'
      },
      {
        name: 'TikTok',
        link: 'https://www.tiktok.com/@melodymagicdaily?lang=vi-VN'
      },
      {
        name: 'YouTube',
        link: 'https://www.youtube.com/'
      },
      {
        name: 'Email',
        link: 'mailto:khanhb2207528@student.ctu.edu.vn'
      },
      {
        name: 'Tel',
        link: 'tel:0000000000'
      }
    ])
    const contentAddress = reactive({
      name: 'Đại Học Cần Thơ, Khu II, Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam',
      link: 'https://www.google.com/maps/place/%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%E1%BA%A7n+Th%C6%A1/@10.0299337,105.768035,17z/data=!3m1!4b1!4m6!3m5!1s0x31a0895a51d60719:0x9d76b0035f6d53d0!8m2!3d10.0299337!4d105.7706153!16s%2Fm%2F02r6wmy?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D'
    })
    const contentAuthor = reactive({
      name: 'khanhb2207528@student.ctu.edu.vn'
    })
    const contentFooter = ref('© 2024 Company, LibraZone, Inc')
    return {
      navFooter,
      contentFooter,
      contentAddress,
      contentAuthor
    }
  }
}
</script>

<style scoped>
.nav-link:hover {
  color: #000 !important;
}

@media (max-width: 576px) {
  footer {
    font-size: 12px;
  }
}
</style>