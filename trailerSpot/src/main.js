import "./index.css";
import * as Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { createPinia } from "pinia";
import router from "./router";

const app = Vue.createApp(App);
app.use(VueToast);
app.use(VueAxios, axios);
app.use(router);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = Vue.markRaw(router);
});

app.use(pinia);

app.mount("#app");
