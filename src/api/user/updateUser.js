import store from "@/store";
import axios from "@/plugins/axios";

export async function updateUser(id, user) {
  store.dispatch("loading", true).then();
  const response = await axios.patch("/user/" + id, user);
  if (response.status === 200) {
    store.dispatch("loading", false).then();
    return response.data.content.user;
  } else {
    store.dispatch("loading", false).then();
    return user;
  }
}
