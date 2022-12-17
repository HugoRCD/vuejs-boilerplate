import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./assets/style/main.scss";

import clickOutside from "./plugins/directives.js";

import {apolloProvider} from "@/plugins/apollo";

const options = {
  toast: true,
  position: "top-end",
  timer: 1500,
  showConfirmButton: false,
  timerProgressBar: true,
  confirmButtonColor: "var(--accent)",
};

createApp(App)
  .use(i18n)
  .use(store)
  .use(router)
  .use(i18n)
  .use(apolloProvider)
  .use(VueSweetalert2, options)
  .directive("click-outside", clickOutside["click-outside"])
  .mount("#app");
