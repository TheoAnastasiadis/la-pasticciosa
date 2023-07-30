import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/";

import "./css/variables/index.scss";

import { Inkline, components } from "@inkline/inkline";
import "@inkline/inkline/css/index.scss";
import "@inkline/inkline/css/utilities.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Inkline, { components });

app.mount("#app");
