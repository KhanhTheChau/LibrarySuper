<template>
  <div class="dBook__wrap p-5">
    <div><h3>Detail Book</h3></div>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-sm-3 img__dbook" style="height: 40%">
          <img class="img-thumbnail" :src="publisher.image" alt="" />
        </div>
        <div class="col-sm-9">
          <Tabs value="0">
            <TabList>
              <Tab value="0">Tổng quan</Tab>
              <Tab value="1">Sách</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="0" class="sroll__fit">
                <table class="table text-start">
                  <tbody>
                    <tr>
                      <th scope="row">#</th>
                      <th>_id</th>
                      <td>{{ publisher._id }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Tên</th>
                      <td>{{ publisher.name }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Địa chỉ</th>
                      <td>{{ publisher.location }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Năm thành lập</th>
                      <td>{{ publisher.establishedYear }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Email</th>
                      <td>
                        <a :href="publisher.contact.email">{{ publisher.contact.email }}</a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Website</th>
                      <td>
                        <a :href="publisher.contact.website">{{ publisher.contact.website }}</a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Số điện thoại</th>
                      <td>
                        <a :href="publisher.contact.phone">{{ publisher.contact.phone }}</a>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">#</th>
                      <th>Ngày tạo</th>
                      <td>{{ formatDateHour(publisher.createAt) }}</td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <th>Ngày cập nhật</th>
                      <td>{{ formatDateHour(publisher.updateAt) }}</td>
                    </tr>
                  </tbody>
                </table>
              </TabPanel>
              <TabPanel value="1" class="sroll__fit">
                <table class="table text-start">
                  Đang cập nhật...
                </table>
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
  publisher: {
    type: Object,
    required: true
  }
})
const { publisher } = toRefs(props)
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
</style>