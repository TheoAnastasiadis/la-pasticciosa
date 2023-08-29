import { defineStore, mapActions } from "pinia";
import { OutputTypes } from "../services/backend";

type User = OutputTypes["viewUsers"][number];

export const useUserStore = defineStore("user", {
  state: () => {
    let user: User | undefined;

    user =
      localStorage.getItem("user") !== null
        ? JSON.parse(localStorage.getItem("user") as string)
        : undefined;

    return { user };
  },
  actions: {
    login(user: User) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout() {
      this.user = undefined;
      localStorage.removeItem("user");
    },
  },
});
