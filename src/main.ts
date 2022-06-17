import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import New3sUI from "../packages";

createApp(App).use(New3sUI).use(router).mount("#app");
