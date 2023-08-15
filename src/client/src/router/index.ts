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
      redirect: (to) => "dashboard/orders",
      component: async () => await import("../views/DashboardView.vue"),
      children: [
        {
          path: "orders",
          name: "orders",
          component: async () =>
            await import("../components/common/ordersTable.vue"),
        },
        {
          path: "users",
          name: "users",
          component: async () =>
            await import("../components/admin/usersTable.vue"),
        },
        {
          path: "items",
          name: "items",
          component: async () =>
            await import("../components/admin/itemsEditor.vue"),
        },
        {
          path: "deliveries",
          name: "deliveries",
          component: async () =>
            await import("../components/admin/locationsTable.vue"),
        },
        {
          path: "profile",
          name: "profile",
          component: async () =>
            await import("../components/common/profile.vue"),
        },
        {
          path: "catalogue",
          name: "catalogue",
          component: async () =>
            await import("../components/user/itemsViewer.vue"),
        },
        {
          path: "locations",
          name: "locations",
          component: async () =>
            await import("../components/user/deliveryTable.vue"),
        },
      ],
    },
  ],
});

export default router;
