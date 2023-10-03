import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "./../views/BeforeLoginViews/LoginView.vue";
import SignUpView from "./../views/BeforeLoginViews/SignUpView.vue";
import HomeView from "./../views/AfterLoginViews/HomeView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
      alias: "/login",
    },
    { path: "/sign-up", name: "signUp", component: SignUpView },
    {
      path: "/home",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomeView,
    },
  ],
});

export default router;
