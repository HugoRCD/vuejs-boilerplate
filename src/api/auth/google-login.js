import store from "@/store";
import router from "@/router";
import axios from "@/plugins/axios";

export function googleLogin(response) {
  store.dispatch("loading", true).then();
  const token = response.credential;
  axios
    .post("/auth/google", { token }, { withCredentials: true })
    .then((response) => {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.accessToken;
      const accessToken = response.data.accessToken;
      store.dispatch("insertAccessToken", accessToken).then();
      router.push({ name: "Profile" }).then();
      store.dispatch("loading", false).then();
    })
    .catch(() => {
      store.dispatch("loading", false).then();
    });
}
