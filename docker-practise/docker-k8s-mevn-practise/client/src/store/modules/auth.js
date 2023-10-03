import axios from "./../../utils/axios";
import { clearSession, setSession } from "../../utils/auth";

export default {
  state: {
    isLoggedIn: false,
    authToken: null,
    user: null,
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    login(state, payload) {
      state.isLoggedIn = true;
      state.authToken = payload.token;
    },
    logout(state) {
      clearSession();
      state.isLoggedIn = false;
      state.authToken = null;
      state.user = null;
    },
    setUser(state, payload) {
      state.user = payload.user;
    },
  },
  actions: {
    async login(context, payload) {
      try {
        const response = await axios.post("/user/login", payload);
        const data = await response.data;
        if (data.success && data.token) {
          context.commit("login", {
            token: data.token,
          });
          setSession(data.token);
        }
      } catch (error) {
        console.log("ERROR", error.response.data);
        alert(error.response.data.message);
      }
    },
    async signUp(context, payload) {
      try {
        const response = await axios.post("/signUp", payload);
        const data = await response.data;
        if (data.success && data.token) {
          context.commit("login", {
            token: data.token,
          });
          setSession(data.token);
        }
      } catch (error) {
        console.log("ERROR", error.response.data);
      }
    },
    async getUser(context) {
      try {
        const response = await axios.post("/user/me");
        const data = await response.data;
        if (data.success && data.user) {
          context.commit("setUser", {
            user: data.user,
          });
        }
      } catch (error) {
        console.log("ERROR", error.response.data);
        if (error && error?.response && error?.response?.data) {
          if (error.response.data.message === "Token expired") {
            context.commit("logout");
          }
        }
      }
    },
  },
};
