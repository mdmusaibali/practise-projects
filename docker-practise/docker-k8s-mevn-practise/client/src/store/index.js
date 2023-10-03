import Vuex from "vuex";
import Vue from "vue";

//modules
import auth from "./modules/auth";
import passwords from "./modules/passwords";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, passwords },
});
