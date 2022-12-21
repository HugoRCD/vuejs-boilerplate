import store from "@/store";
import axios from "@/plugins/axios";

export function updateUser(id, user) {
  store.dispatch("loading", true).then();
  axios
    .patch("/user/" + id, user)
    .then((response) => {
      store.dispatch("loading", false).then();
      return response.data.user;
    })
    .catch(() => {
      store.dispatch("loading", false).then();
      return null;
    });
}
