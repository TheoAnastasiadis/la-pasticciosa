import { ref } from "vue";
import { backend as data, type OutputTypes } from "./";
import { TYPE, useToast } from "vue-toastification";

export type User = OutputTypes["viewUsers"][number];

export function useUsers() {
  const usersLoading = ref(false);
  const toast = useToast();

  const loadUsers = async () => {
    usersLoading.value = true;
    try {
      return await data.viewUsers.query({ page: "all" });
    } catch (err: any) {
      if (err.message)
        toast(`Οι χρήστες δεν φορτώθηκαν. ${err.message}`, {
          type: TYPE.ERROR,
        });
      else
        toast(
          "Υπήρξε πρόβλημα στην σύνδεση με τον διακομιστή. Παρακαλώ προσπαθήστε ξανά.",
        );
    } finally {
      usersLoading.value = false;
    }
  };

  return { loadUsers, usersLoading };
}
