import { ref } from "vue";
import { backend as data, type OutputTypes } from "./";
import { TYPE, useToast } from "vue-toastification";

export type Delivery = OutputTypes["viewDeliveries"][number];

export function useDeliveries() {
  const deliveriesLoading = ref(false);
  const toast = useToast();

  const loadDeliveries = async (userUuid: string) => {
    deliveriesLoading.value = true;
    try {
      return await data.viewDeliveries.query({
        page: "all",
        // @ts-expect-error onBehalf not explicitly defined
        onBehalf: userUuid,
      });
    } catch (err: any) {
      if (err.message)
        toast(`Οι τοποθεσίες παράδοσης δεν φορτώθηκαν. ${err.message}`, {
          type: TYPE.ERROR,
        });
      else
        toast(
          "Υπήρξε πρόβλημα στην σύνδεση με τον διακομιστή. Παρακαλώ προσπαθήστε ξανά.",
        );
    } finally {
      deliveriesLoading.value = false;
    }
  };

  return { loadDeliveries, deliveriesLoading };
}
