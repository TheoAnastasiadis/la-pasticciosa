export default {
  async login(email: string, password: string) {
    return await fetch("/auth/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  async logout() {
    return await fetch("/auth/logout", {
      method: "post",
    });
  },
};
