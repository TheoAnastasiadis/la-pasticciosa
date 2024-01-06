import { useUserStore } from "../../stores/user";

export default {
  async login(email: string, password: string) {
    return await fetch("/auth/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    });
  },
  async logout() {
    await fetch("/auth/logout", {
      method: "post",
      credentials: "same-origin",
    });
    const userStore = useUserStore();
    userStore.logout();
  },
};
