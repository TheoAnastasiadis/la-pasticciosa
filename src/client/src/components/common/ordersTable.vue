<template>
  <div class="w-full">
    <p>
      Στον παρακάτω πίνακα μπορείτε να βρείτε πληροφορίες για της τρέχουσες και
      προηγούμενες παραγγελίας σας.
    </p>
    <p>
      <strong>Σημείωση: </strong>Οι παραγγελίες που δεν αναγράφουν αναμενώμενο
      χρόνο παράδοσης εξελίσονται κανονικά, και δεν χρειάζεται κάποια ενέργεια
      από την μεριά σας.
    </p>
    <button
      @click="placingOrder = !placingOrder"
      type="button"
      class="xt-button py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-gray-900 bg-gray-100 transition hover:bg-gray-200 active:bg-gray-300 on:bg-gray-200 my-2"
    >
      Nεα παραγγελια
      <i
        class="text-sm h"
        :class="{
          'h-plus': !placingOrder,
          'h-chevron-up': placingOrder,
        }"
      ></i>
    </button>
    <div
      class="scale-y-0 -translate-y-1/3 opacity-0 h-0 transition-all my-3"
      :class="{ 'transform-none h-auto opacity-100': placingOrder }"
    >
      <CreateOrder />
    </div>
    <Table
      :columns="[
        'Ημ/νια υποβολης',
        'χρηστης',
        'συνολο',
        'κατασταση',
        'εκτ. παραδοση',
      ]"
      include-index
    >
      <Row v-for="order in orders">
        <template #head>{{ order.id }}</template>
        <Cell> <DateChip :date="order.createdAt" /> </Cell>
        <Cell> {{ order.user }} </Cell>
        <Cell>
          <span class="font-semibold"> {{ order.total }} &euro;</span>
        </Cell>
        <Cell>
          <OrderStatusChip :order="order" @order-updated="orderUpdated" />
        </Cell>
        <Cell>
          <OrderDeliveryChip :order="order" @order-updated="orderUpdated" />
        </Cell>
        <template #drawer
          ><div class="p-5">
            <p class="text-primary-600 text-lg">
              Παραγγελια #{{ order.id }}
              <span class="normal-case text-black">{{ order.createdAt }}</span>
            </p>
            <OrderTable :quantities="order.quantities" />
            <p>η επιλεγμενη παραδοση ειναι: {{ order.delivery }}</p>
          </div></template
        >
      </Row>
    </Table>
  </div>
</template>

<script lang="ts">
import CreateOrder from "./createOrder.vue";
import Table from "../reusables/table/table.vue";
import Row from "../reusables/table/row.vue";
import Cell from "../reusables/table/cell.vue";
import DateChip from "./dateChip.vue";
import { backend, OutputTypes } from "../../services/backend";
import { useToast, TYPE } from "vue-toastification";
import OrderStatusChip from "./orderStatusChip.vue";
import OrderDeliveryChip from "./orderDeliveryChip.vue";
import OrderTable from "./orderTable.vue";

type Order = OutputTypes["placeOrder"];

export default {
  components: {
    CreateOrder,
    Table,
    Row,
    Cell,
    DateChip,
    OrderStatusChip,
    OrderDeliveryChip,
    OrderTable,
  },
  data: () => ({ placingOrder: false, orders: [] as Order[] }),
  async mounted() {
    const toast = useToast();
    const orders = await backend.viewOrders.query().catch(() => {
      toast("Υπήρξε κάποιο πρόβλημα και οι παραγγελίες δεν φορτώθηκαν.", {
        type: TYPE.ERROR,
      });
      return [];
    });
    this.orders = orders;
  },
  methods: {
    orderUpdated(order) {
      this.orders = this.orders.map((o) => {
        if (o.id === order.id) o = order;
        return o;
      });
    },
  },
};
</script>
