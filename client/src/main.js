import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})


app.use(VueSweetalert2);
window.Swal =  app.config.globalProperties.$swal;
app.use(router)
app.use(pinia)

app.mount('#app')