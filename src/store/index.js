import {createStore} from "vuex";

const getDefaultState = () => {
  return {
    accessToken: "",
    refreshToken: "",
    user: {},
  };
};

export default createStore({
  state: {
    isLoading: false,
    accessToken: "",
    refreshToken: "",
    user: {},
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    setRefreshToken: (state, refreshToken) => {
      state.refreshToken = refreshToken;
    },
    setUser: (state, user) => {
      state.user = user;
    },
    reset: (state) => {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    login: ({commit}, payload) => {
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("refreshToken", payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(payload.user));
      commit("setAccessToken", payload.accessToken);
      commit("setRefreshToken", payload.refreshToken);
      commit("setUser", payload.user);
    },
    logout: ({commit}) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      commit("reset", "");
    },
    loading: ({commit}, payload) => {
      commit("setLoading", payload);
    },
    insertUser: ({commit}, user) => {
      localStorage.setItem("user", JSON.stringify(user));
      commit("setUser", user);
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    isLoggedIn(state) {
      return !!(state.accessToken && state.refreshToken);
    },
    user(state) {
      return state.user;
    }
  },
});