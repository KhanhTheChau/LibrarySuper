import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Import PrimeVue và kiểu CSS cơ bản
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

import ToastService from 'primevue/toastservice'

// app model
import RightModal from './components/modal/RightModal.vue'
import MainModal from './components/modal/MainModal.vue'
import HeaderModal from './components/modal/HeaderModal.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

// primeVue
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark'
    }
  }
})
app.use(ToastService)

app.use(router)
app.component('right-modal', RightModal)
app.component('main-modal', MainModal)
app.component('header-modal', HeaderModal)

app.mount('#app')
