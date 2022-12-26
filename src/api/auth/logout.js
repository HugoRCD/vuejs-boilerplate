import store from "@/store";
import router from "@/router";
import axios from "@/plugins/axios";

export async function logout() {
  store.dispatch("loading", true).then();
  const response = await axios.post("/auth/logout");
  if (response.status === 200) {
    store.dispatch("logout").then();
    localStorage.removeItem("accessToken");
    store.dispatch("loading", false).then();
    router.push({ name: "Home" }).then();
  } else {
    store.dispatch("loading", false).then();
  }
}
