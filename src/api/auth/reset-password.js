import store from "@/store";
import router from "@/router";
import axios from "@/plugins/axios";

export async function resetPassword(token, password) {
  store.dispatch("loading", true).then();
  const response = await axios.post("/reset-password/" + token, {
    password: password,
  });
  if (response.status === 200) {
    store.dispatch("loading", false).then();
    router.push({ name: "AppLogin" }).then();
  } else {
    store.dispatch("loading", false).then();
  }
}
