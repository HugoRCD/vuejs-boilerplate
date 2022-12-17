import axios from "axios";
import store from "@/store";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = "Bearer " + store.state.token;

let isRefreshing = false;

axios.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !isRefreshing) {
    isRefreshing = true;
    const response = await axios.post("/auth/refresh", {}, {withCredentials: true});
    if (response.status === 200) {
      store.commit("setAccessToken", response.data.accessToken);
      error.config.headers["Authorization"] = "Bearer " + response.data.accessToken;
      return axios.request(error.config);
    }
  }
  isRefreshing = false;
  return error;
});
export default axios;