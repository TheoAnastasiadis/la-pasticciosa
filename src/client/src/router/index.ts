import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: async () => await import("../views/HomeView.vue"),
        header: async () =>
          await import(
            "../components/reusables/top-level/headers/landingPage.vue"
          ),
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: async () => await import("../views/LoginView.vue"),
        header: async () =>
          await import(
            "../components/reusables/top-level/headers/platform.vue"
          ),
      },
    },
    {
      path: "/signup",
      name: "signup",
      components: {
        default: async () => await import("../views/SignupView.vue"),
        header: async () =>
          await import(
            "../components/reusables/top-level/headers/platform.vue"
          ),
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      redirect: (to) => "dashboard/orders",
      components: {
        header: async () =>
          await import(
            "../components/reusables/top-level/headers/platform.vue"
          ),
        default: async () => await import("../views/DashboardView.vue"),
      },
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
