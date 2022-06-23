import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faPencilAlt)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);
const pinia = createPinia();

pinia.use(({store}) => {
    store.router = markRaw(router)
});

app.use(createPinia());
app.use(router);

app.mount("#app");
