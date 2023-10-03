import axios from "./../../utils/axios";
import { clearSession, setSession } from "../../utils/auth";

export default {
  state: {
    passwords: [],
  },
  getters: {
    passwords(state) {
      return state.passwords;
    },
  },
  mutations: {
    setPasswords(state, payload) {
      state.passwords = payload;
    },
    appendNewPassword(state, payload) {
      state.passwords.push(payload);
    },
  },
  actions: {
    async getPasswords(context) {
      try {
        const response = await axios.get("/user/passwords");
        const data = response.data;
        context.commit("setPasswords", data.passwords);
      } catch (error) {
        console.log("ERROR", error.response.data);
      }
    },
    async addPassword(context, payload) {
      try {
        const response = await axios.post("/user/password", payload);
        const data = response.data;
        context.commit("appendNewPassword", data.password);
      } catch (error) {
        console.log("ERROR", error.response.data);
      }
    },
  },
};
