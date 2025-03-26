<script setup>
import TheCarousel from '../../components/carousel/TheCarousel.vue'
import ShowBook from '../../components/book/ShowBook.vue'
// import GenreBook from '../../components/book/GenreBook.vue'
import { ref } from 'vue'


const label1 = ref('Classic')
const label2 = ref('Trending')
const label3 = ref('SGK')
// const genre1 = ref('SGK')
</script>


<template>
  <main>
    <!-- <button v-on:click="count1++">{{ count2 }} {{count1}}</button> -->
    <the-carousel></the-carousel>
    <show-book :label="label2"></show-book>
    <show-book :label="label1"></show-book>
    <show-book :label="label3"></show-book>
    <!-- <genre-book :genre="genre1"></genre-book> -->
  </main>
</template>

<style>
</style>
