import { createApp, markRaw } from '../node_modules/vue/dist/vue'
import { createPinia } from '../node_modules/pinia/dist/pinia'
import VueSweetalert2 from '../node_modules/vue-sweetalert2/dist/index';
import '../node_modules/sweetalert2/dist/sweetalert2'
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