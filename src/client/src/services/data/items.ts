import { ref } from "vue";
import { backend as data, type OutputTypes } from "./";
import { TYPE, useToast } from "vue-toastification";

export type Item = OutputTypes["viewItems"][number];

export function useItems() {
  const itemsLoading = ref(false);
  const toast = useToast();

  const loadItems = async (userUuid?: string) => {
    itemsLoading.value = true;
    try {
      //@ts-expect-error onBehalf not explicitly defined
      return await data.viewItems.query({ page: "all", onBehalf: userUuid });
    } catch (err: any) {
      if (err.message)
        toast(`Τα προϊόντα δεν φορτώθηκαν. ${err.message}`, {
          type: TYPE.ERROR,
        });
      else
        toast(
          "Υπήρξε πρόβλημα στην σύνδεση με τον διακομιστή. Παρακαλώ προσπαθήστε ξανά.",
        );
    } finally {
      itemsLoading.value = false;
    }
  };

  return { loadItems, itemsLoading };
}
