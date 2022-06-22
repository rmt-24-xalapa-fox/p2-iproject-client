import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import VueSweetalert2 from "vue-sweetalert2";

const app = createApp(App);
const pinia = createPinia();

app.use(createPinia());
app.use(router);
app.use(BootstrapVue3);
app.use(VueSweetalert2);

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.mount("#app");
