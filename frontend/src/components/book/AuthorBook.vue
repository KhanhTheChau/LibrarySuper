<template>
  <div class="wrap__author d-flex" v-if="author">
    <div class="info__author">
      <div>
        <h4>Tác giả: {{ author.name }}</h4>
      </div>
      <div>
        <p>Ngày sinh: {{ formatDate(author.dob) }}</p>
      </div>
      <div>
        <p>{{ author.bio }}</p>
      </div>
      <div>
        <a :href="author.link">Thông tin trên website</a>
      </div>
    </div>
    <div class="image__author">
      <img :src="author.image" :alt="author.name" />
    </div>
  </div>
  <div v-else>Đang cập nhật...</div>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  author: Object
})
const { author } = toRefs(props)

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}
</script>

<style>
.image__author img {
  height: 45vh;
}

/* Tablet styles (<= 992px) */
@media (max-width: 992px) {
  .wrap__author {
    flex-direction: column;
  }

  .image__author img {
    margin-top: 10px;
  }
}
</style>