import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import BootstrapVue3 from "bootstrap-vue-3";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import App from './App.vue';
import router from './router';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router);
});

app.use(router);
app.use(pinia);

app.use(BootstrapVue3);


app.mount('#app');
