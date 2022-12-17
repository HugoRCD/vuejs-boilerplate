import {createStore} from "vuex";

const getDefaultState = () => {
  return {
    accessToken: "",
    user: {},
  };
};

export default createStore({
  state: {
    isLoading: false,
    accessToken: "",
    user: {},
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
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
      commit("setAccessToken", payload.accessToken);
    },
    logout: ({commit}) => {
      localStorage.removeItem("accessToken");
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
      return !!state.accessToken;
    },
    user(state) {
      return state.user;
    }
  },
});