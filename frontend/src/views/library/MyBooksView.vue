
<template>
  <div class="row" v-if="orderBooks || waitingBooks || approvedBooks">
    <div class="col-12 col-sm-8 p-1">
      <Tabs value="0">
        <TabList class="mb-3 tab__list">
          <Tab value="0">Đặt hàng</Tab>
          <Tab value="1">Chờ duyệt</Tab>
          <Tab value="2">Đang mượn</Tab>
        </TabList>

        <TabPanels class="tab__panels">
          <TabPanel value="0">
            <div class="wrap__mybook" v-if="orderBooks.length > 0">
              <div class="products">
                <div
                  class="product__wrap d-flex mb-2"
                  v-for="book in orderBooks"
                  :key="book._id"
                  @click="handleSetActiveCard(book._id)"
                  :class="{ activeCard: activeCardBook === book._id }"
                >
                  <list-book :book="book"></list-book>
                </div>
              </div>
            </div>
            <div class="wrap__mybook p-5" v-else>
              <empty-bookcart></empty-bookcart>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div class="wrap__mybook" v-if="waitingBooks.length > 0">
              <div class="products">
                <div
                  class="product__wrap d-flex mb-2"
                  v-for="book in waitingBooks"
                  :key="book._id"
                  @click="handleSetActiveCard(book._id)"
                  :class="{ activeCard: activeCardBook === book._id }"
                >
                  <list-book :book="book"></list-book>
                </div>
              </div>
            </div>
            <div class="wrap__mybook p-5" v-else>
              <empty-bookcart></empty-bookcart>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div class="wrap__mybook" v-if="approvedBooks.length > 0">
              <div class="products">
                <div
                  class="product__wrap d-flex mb-2"
                  v-for="book in approvedBooks"
                  :key="book._id"
                  @click="handleSetActiveCard(book._id)"
                  :class="{ activeCard: activeCardBook === book._id }"
                >
                  <list-book :book="book"></list-book>
                </div>
              </div>
            </div>
            <div class="wrap__mybook p-5" v-else>
              <empty-bookcart></empty-bookcart>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <div class="col-12 col-sm-4">
      <div>
        <card-feature></card-feature>
      </div>
    </div>
  </div>
  <div v-else>Thêm sách để hiển thị</div>
</template>

<script setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import ListBook from '../../components/book/ListBook.vue'
import CardFeature from '../../components/book/CardFeature.vue'
import EmptyBookcart from '../../components/notification/EmptyBookcart.vue'
import { useTrackStore } from '../../stores/track.store'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const trackStore = useTrackStore()
const router = useRouter()
const instance = getCurrentInstance()

const proxy = instance?.proxy
onMounted(async () => {
  const books = await trackStore.fetchBorrowedBooks()
  if (!books) {
    proxy?.$toast?.add({
      severity: 'contrast',
      group: 'tr',
      summary: 'Notification',
      detail:
        "Don't miss out on your next great read. Add this book to your cart and start your journey today!",
      life: 3000
    })
    router.push({ name: 'books' })
  }
})

const orderBooks = computed(() => trackStore.orderBooks)
const waitingBooks = computed(() => trackStore.waitingBooks)
const approvedBooks = computed(() => trackStore.approvedBooks)

const activeCardBook = ref(null)

// Method to set the active card
const handleSetActiveCard = (recordID) => {
  activeCardBook.value = recordID
}
</script>

<style scoped>
.tab__list {
  background: red !important;
}

.tab__panels {
  border: 1px solid #ccc;
}

.products {
  height: 60vh;
  overflow-y: scroll;
}

.card__detail div {
  background: #fff;
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
}

/* active */
.activeCard .product__card {
  background-color: #e9e9e9;
}

/* Tablet styles (<= 992px) */
@media (max-width: 992px) {
}

/* Mobile styles (<= 768px) */
@media (max-width: 768px) {
  .product__wrap {
  }
}

/* @media (max-width: 700) {
  .product__wrap {
    width: 50vw;
  }
} */

/* Small mobile styles (<= 576px) */
@media (max-width: 576px) {
  .tab__list {
    width: 80vw;
    margin: 0 auto;
    font-size: 12px;
  }
  .tab__list Tab {
    font-size: 8px;
  }
  .product__wrap {
    flex-direction: column; /* Đặt các sản phẩm theo cột thay vì hàng ngang */
    width: 85vw;
  }
}

@media (max-width: 290px) {
  .tab__list {
    width: 80vw;
    margin: 0 auto;
    font-size: 8px;
  }
  .tab__list Tab {
    font-size: 8px;
  }
  .product__wrap {
    width: 70vw;
    flex-direction: column; /* Đặt các sản phẩm theo cột thay vì hàng ngang */
  }
}
</style>
    