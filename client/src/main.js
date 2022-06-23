import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
app.use(vue3GoogleLogin, {
    clientId: '879839274202-2gfd21q2jl5475ucqbsotj2215mb7le5.apps.googleusercontent.com'
  })

app.use(createPinia())
app.use(router)

app.mount('#app')
