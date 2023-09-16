import { ref, type Ref } from "vue";
import { backend as data, type OutputTypes } from "./";
import { useToast, TYPE } from "vue-toastification";

type User = OutputTypes["viewUsers"][number];
type Order = OutputTypes["viewOrders"][number];

export function useOrders(
  user: Ref<User | undefined>,
  placingOrder: Ref<boolean>,
) {
  const orders = ref<Order[]>([]);
  const loading = ref(false);
  const toast = useToast();

  const loadOrders = (page: number) => {
    loading.value = true;
    data.viewOrders
      .query({ page: page })
      .then((result) => (orders.value = result))
      .catch((err) => {
        if (err.message)
          toast(`Οι παραγγελίες δεν φορτώθηκαν. ${err.message}`, {
            type: TYPE.ERROR,
          });
        else
          toast(
            "Υπήρξε πρόβλημα στην σύνδεση με τον διακομιστή. Παρακαλώ προσπαθήστε ξανά.",
          );
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const orderUpdated = (order: Order) => {
    if (user.value) order.user = user.value;
    orders.value = orders.value.map((o) => {
      if (o.id == order.id) o = order;
      return o;
    });
  };

  const orderPlaced = (order: Order) => {
    orders.value.unshift(order);
    placingOrder.value = false;
  };

  return { orders, loadOrders, orderUpdated, orderPlaced, loading };
}
