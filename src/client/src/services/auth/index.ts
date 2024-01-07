import { useUserStore } from "../../stores/user";
import router from "../../router";

export default {
  async login(email: string, password: string) {
    await fetch("/auth/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    });
    const userStore = useUserStore();
    await userStore.login();
    await router.push({ name: "dashboard" });
  },
  async logout() {
    await fetch("/auth/logout", {
      method: "post",
      credentials: "same-origin",
    });
    const userStore = useUserStore();
    userStore.logout();
    await router.push({ name: "login" });
  },
};
