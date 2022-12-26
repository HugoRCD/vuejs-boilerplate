import store from "@/store";
import router from "@/router";
import axios from "@/plugins/axios";

export async function sendForgotPassword(email) {
  store.dispatch("loading", true).then();
  const response = await axios.post("/reset-password", { email: email });
  if (response.status === 201) {
    store.dispatch("loading", false).then();
    router.push({ name: "AppLogin" }).then();
  } else {
    store.dispatch("loading", false).then();
  }
}
