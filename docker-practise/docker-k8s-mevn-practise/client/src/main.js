import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import store from "./store";

import "./assets/css/main.css";

new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");

Vue.use(VueToast);
