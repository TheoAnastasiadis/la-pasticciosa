import { computed, ref } from "vue";
import { OutputTypes, backend as data } from ".";
import { useToast, TYPE } from "vue-toastification";

export type Order = OutputTypes["viewOrders"][number];
export type Item = OutputTypes["viewItems"][number];
export type Quantity = { value: number; item: Item };

export function useOrder() {
  const order = ref<Order>({ quantities: [] } as unknown as Order);
  const orderLoading = ref<boolean>(false);

  const toast = useToast();

  const orderTotal = computed(() =>
    order.value.quantities.length > 0
      ? order.value.quantities
          .map((q) => parseFloat(q.item.price) * q.value)
          .reduce((a, b) => a + b)
          .toFixed(2)
      : "0.00",
  );

  function itemQuantity(item: Item) {
    const itemInOrder = order.value.quantities.filter((q) => q.item == item)[0];
    if (itemInOrder) return itemInOrder.value;
    else return 0;
  }

  function itemTotal(item: Item) {
    const quantity = order.value?.quantities.find(
      (quantity) => quantity.item == item,
    );
    if (quantity)
      return (parseFloat(quantity?.item.price) * quantity.value).toFixed(2);
    else return "0.00";
  }

  function incrementItemQuantity(item: Item) {
    const itemInOrder = order.value?.quantities.find(
      (quantity) => quantity.item == item,
    );
    if (itemInOrder) {
      itemInOrder.value++;
    } else {
      order.value?.quantities.push({ item, value: 1 });
    }
  }

  function decrementItemQuantity(item: Item) {
    const itemInOrder = order.value?.quantities.find(
      (quantity) => quantity.item == item,
    );
    if (itemInOrder && itemInOrder.value > 1) {
      itemInOrder.value--;
    } else if (itemInOrder) {
      order.value.quantities = order.value?.quantities.filter(
        (q) => q.item !== item,
      );
    }
  }

  function placeOrder(userUuid: string, deliveryId: string) {
    orderLoading.value = true;
    return data.placeOrder
      .mutate({
        quantityIds:
          order.value?.quantities.map((q) => ({
            value: q.value,
            item: q.item.id,
          })) || [],
        deliveryId,
        // @ts-expect-error onBehalf is not defined explicitly
        onBehalf: userUuid,
      })
      .catch((err) => {
        if (err.message)
          toast(`Υπήρξε κάποιο πρόβλημα με την παραγγελία. ${err.message}`, {
            type: TYPE.ERROR,
          });
        else
          toast(
            "Υπήρξε πρόβλημα στην σύνδεση με τον διακομιστή. Παρακαλώ προσπαθήστε ξανά.",
          );
      })
      .finally(() => {
        orderLoading.value = false;
      });
  }

  return {
    order,
    incrementItemQuantity,
    decrementItemQuantity,
    placeOrder,
    itemTotal,
    itemQuantity,
    orderTotal,
    orderLoading,
  };
}
