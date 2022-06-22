import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vueKanban from 'vue-kanban'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vueKanban)

app.mount('#app')
