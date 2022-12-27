import axios from "axios";
import store from "@/store";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("accessToken");

let isRefreshing = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      const response = await axios.post(
        "/auth/refresh",
        {},
        { withCredentials: true },
      );
      if (response.status === 200) {
        store.commit("setAccessToken", response.data.accessToken);
        error.config.headers["Authorization"] =
          "Bearer " + response.data.accessToken;
        isRefreshing = false;
        return axios.request(error.config);
      }
    }
    isRefreshing = false;
    return error;
  },
);
export default axios;
