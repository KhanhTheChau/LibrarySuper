<template>
  <div class="card edition__about col-12 col-lg-8 p-4">
    <TabView>
      <TabPanel header="Tổng quan">
        <book-about :book="bookDetail"></book-about>
      </TabPanel>
      <TabPanel header="Tác giả">
        <author-book :author="bookDetail.author"></author-book>
      </TabPanel>
      <TabPanel header="Đánh giá ">
        <review-book :bookID="bookDetail._id"></review-book>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import BookAbout from './BookAbout.vue'
import AuthorBook from './AuthorBook.vue'
import ReviewBook from './ReviewBook.vue'
defineProps({
  bookDetail: {
    type: Object
  }
})
</script>

<style scoped>
.edition__about {
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.5s;
}

/* .edition__about:hover {
  cursor: pointer;
  border-color: #000;
} */
</style>
  