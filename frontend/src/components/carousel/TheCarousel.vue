<template>
  <div>
    <div class="title-carousel">
      <h5 class="ms-5">Chào mừng bạn đến với LIBRAZONE - Thế giới sách tuyệt vời!</h5>
    </div>
    <Carousel
      :value="activities"
      :numVisible="3"
      :numScroll="3"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <div
          class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4 d-flex item-hover"
        >
          <div class="mb-4 me-2">
            <div class="relative mx-auto">
              <img
                :src="slotProps.data.img"
                :alt="slotProps.data.name"
                class="w-full rounded"
                width="100px"
              />
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div class="mb-2 font-me ium fw-bolder">{{ slotProps.data.name }}</div>
            <div class="mt-0 font-semibold text-xl">{{ slotProps.data.description }}</div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Carousel from 'primevue/carousel'

// Dữ liệu trong Composition API
const activities = ref([
  {
    name: 'Thử nghiệm tìm kiếm toàn văn',
    description: 'Khám phá khả năng tìm kiếm toàn văn để tìm kiếm sách nhanh chóng hơn.',
    img: '/src/assets/images/carousel/fulltext.png'
  },
  {
    name: 'Theo dõi sách yêu thích',
    description: 'Học cách theo dõi và lưu giữ những cuốn sách bạn yêu thích.',
    img: '/src/assets/images/carousel/track.png'
  },
  {
    name: 'Khám phá Thư viện ảo',
    description: 'Trải nghiệm thư viện ảo và tìm kiếm sách theo sở thích của bạn.',
    img: '/src/assets/images/carousel/library_explorer.png'
  },
  {
    name: 'Đặt mục tiêu đọc sách hàng năm',
    description: 'Hướng dẫn thiết lập mục tiêu đọc sách hàng năm và theo dõi những gì bạn đã đọc.',
    img: '/src/assets/images/carousel/reading_goal.svg'
  },
  {
    name: 'Mượn sách trực tuyến',
    description: 'Khám phá cách mượn sách từ thư viện trực tuyến một cách dễ dàng.',
    img: '/src/assets/images/carousel/read.png'
  },

  {
    name: 'Trở thành Thủ thư mở',
    description: 'Học cách trở thành một thủ thư mở và góp phần vào cộng đồng đọc sách.',
    img: '/src/assets/images/carousel/librarian.png'
  },
  {
    name: 'Tình nguyện tại Thư viện Mở',
    description: 'Tham gia vào các hoạt động tình nguyện tại Thư viện Mở để hỗ trợ cộng đồng.',
    img: '/src/assets/images/carousel/volunteer.png'
  },
  {
    name: 'Gửi phản hồi cho chúng tôi',
    description: 'Chia sẻ ý kiến của bạn để giúp cải thiện trải nghiệm người dùng.',
    img: '/src/assets/images/carousel/feedback.png'
  }
])

const responsiveOptions = ref([
  {
    breakpoint: '2024px ',
    numVisible: 3,
    numScroll: 3
  },
  {
    breakpoint: '1200px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1
  }
])
</script>

<style scoped>
/* Thêm các style nếu cần */
.item-hover:hover {
  /* border: 1px solid #000; */
  background: #f2f2f2;
  cursor: pointer;
}
</style>
