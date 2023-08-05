import { defineStore, mapActions } from "pinia";
import { OutputTypes } from "../services/backend";

type User = OutputTypes["viewUserProfile"]["user"];
type Deliveries = OutputTypes["viewUserProfile"]["deliveries"];

export const useUserStore = defineStore("user", {
  state: () => {
    let user: User | undefined;
    let deliveries: Deliveries | undefined;

    user =
      localStorage.getItem("user") !== null
        ? JSON.parse(localStorage.getItem("user") as string)
        : undefined;
    deliveries =
      localStorage.getItem("deliveries") !== null
        ? JSON.parse(localStorage.getItem("deliveries") as string)
        : undefined;

    return { user, deliveries };
  },
  actions: {
    login(user: User, deliveries: Deliveries) {
      this.user = user;
      this.deliveries = deliveries;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("deliveries", JSON.stringify(deliveries));
    },
    logout() {
      this.user = undefined;
      this.deliveries = undefined;
      localStorage.removeItem("user");
      localStorage.removeItem("deliveries");
    },
  },
});
