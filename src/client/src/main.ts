import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/";

import Toast, { type PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./app.css";

const app = createApp(App);

app.use(createPinia());
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 6000,
} satisfies PluginOptions);
app.use(router);

app.mount("#app");
