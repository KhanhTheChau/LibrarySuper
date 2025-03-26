<template>
  <div class="dBook__wrap p-5">
    <div><h3>Chi tiết Sách</h3></div>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-sm-3 img__dbook" style="height: 40%">
          <img class="img-thumbnail" :src="book.image" />
        </div>
        <div class="col-sm-9">
          <Tabs value="0">
            <TabList>
              <Tab value="0">Sách</Tab>
              <Tab value="1">Tác giả</Tab>
              <Tab value="2">Nhà xuất bản</Tab>
              <Tab value="3">Đánh giá</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="0" class="sroll__fit">
                <table class="table text-start" v-if="book">
                  <tbody>
                    <tr>
                      <th scope="row">#</th>
                      <th>Mã sách</th>
                      <td>{{ book._id }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Tên Sách</th>
                      <td>{{ book.title }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Tác giả</th>
                      <td>{{ book.author ? book.author.name : '' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Nhà xuất bản</th>
                      <td>{{ book.publisher ? book.publisher.name : '' }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Thể loại</th>
                      <td>
                        <span
                          class="me-1 bg-info p-1 rounded"
                          v-for="(genre, index) in book.genre"
                          :key="index"
                          >{{ genre }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Label</th>
                      <td>{{ book.label }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Ngày xuất bản</th>
                      <td>{{ formatDate(book.published_date) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Ngày tạo</th>
                      <td>{{ formatDateHour(book.createAt) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Ngày cập nhật</th>
                      <td>{{ formatDateHour(book.updateAt) }}</td>
                    </tr>

                    <tr>
                      <th scope="row">#</th>
                      <th>Mô tả</th>
                      <td>{{ book.description }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Tồn kho</th>
                      <td>{{ book.stock }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Giá</th>
                      <td>{{ book.price }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Nguồn gốc</th>
                      <td>{{ book.country }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Ngôn ngữ</th>
                      <td>{{ book.language }}</td>
                    </tr>
                  </tbody>
                </table>
                <div v-else>updating...</div>
              </TabPanel>
              <TabPanel value="1" class="sroll__fit">
                <table class="table text-start">
                  <tbody v-if="book.author">
                    <tr>
                      <th scope="row">#</th>
                      <th>Mã tác giả</th>
                      <td>{{ book.author._id }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Tên</th>
                      <td>{{ book.author.name }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Ngày sinh</th>
                      <td>{{ formatDate(book.author.dob) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Mô tả</th>
                      <td>{{ book.author.bio }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>More</th>
                      <td>
                        <a :href="book.author.link">{{ book.author.link }}</a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Ngày tạo</th>
                      <td>{{ formatDateHour(book.author.createAt) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Ngày cập nhật</th>
                      <td>{{ formatDateHour(book.author.updateAt) }}</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    updating...
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel value="2" class="sroll__fit">
                <table class="table text-start">
                  <tbody v-if="book.publisher">
                    <tr>
                      <th scope="row">#</th>
                      <th>Mã nhà xuất bản</th>
                      <td>{{ book.publisher._id }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Tên</th>
                      <td>{{ book.publisher.name }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Địa chỉ</th>
                      <td>{{ book.publisher.location }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Năm thành lập</th>
                      <td>{{ book.publisher.establishedYear }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Email</th>
                      <td>{{ book.publisher.contact.email }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Số điện thoại</th>
                      <td>{{ book.publisher.contact.phone }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Website</th>
                      <td>
                        <a :href="book.publisher.contact.website">{{
                          book.publisher.contact.website
                        }}</a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Ngày tạo</th>
                      <td>{{ formatDateHour(book.publisher.createAt) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Ngày cập nhật</th>
                      <td>{{ formatDateHour(book.publisher.updateAt) }}</td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    updating...
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel value="3" class="sroll__fit">
                <p>Updating...</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { toRefs } from 'vue'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const { book } = toRefs(props)
// const linkImage = computed(() => book.value.image.substring(book.value.image.lastIndexOf('\\') + 1))
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}
function formatDateHour(date) {
  // const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false // Đặt thành `true` nếu bạn muốn định dạng 12 giờ (AM/PM)
  }
  return new Date(date).toLocaleDateString(undefined, options)
}
</script>

<style>
.dBook__wrap {
  width: 80vw;
  height: 80vh;
}

.sroll__fit {
  overflow-y: scroll;
  height: 50vh;
}
.img__dbook {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100em; */
}

.img__dbook img {
  width: 100%;
  /* height: 100%; */
}
</style>