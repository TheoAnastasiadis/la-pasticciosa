import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: async () => await import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: async () => await import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: async () => await import("../views/SignupView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: async () => await import("../views/DashboardView.vue"),
    },
  ],
});

export default router;
