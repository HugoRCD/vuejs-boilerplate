import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./assets/style/main.scss";
import axios from "./plugins/axios";
import vue3GoogleLogin from "vue3-google-login";

const options = {
  toast: true,
  position: "top-end",
  timer: 1500,
  showConfirmButton: false,
  timerProgressBar: true,
  confirmButtonColor: "var(--accent)",
};

const app = createApp(App);
app.use(store);
app.use(router);
app.use(i18n);
app.use(VueSweetalert2, options);
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});
app.config.globalProperties.$http = axios;
app.mount("#app");
