import store from "@/store";
import router from "@/router";
import axios from "@/plugins/axios";

export function login(user) {
  store.dispatch("loading", true).then();
  axios
    .post("/auth/login", user, { withCredentials: true })
    .then((response) => {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.accessToken;
      const accessToken = response.data.accessToken;
      store.dispatch("insertAccessToken", accessToken).then();
      store.dispatch("loading", false).then();
      router.push({ name: "Profile" }).then();
    })
    .catch(() => {
      store.dispatch("loading", false).then();
    });
}
