import "./assets/global.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import store from "./store";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
  },
});

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(store);

app.mount("#app");
