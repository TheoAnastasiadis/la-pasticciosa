<template>
  <div
    class="xt-card rounded-2xl p-6 sm:p-8 text-sm text-gray-900 xt-links-default bg-white"
  >
    <Loader :loading="loading" />
    <h3>Παραγγελίες</h3>
    <div class="w-full">
      <p>
        Στον παρακάτω πίνακα μπορείτε να βρείτε πληροφορίες για της τρέχουσες
        και προηγούμενες παραγγελίας σας.
      </p>
      <p>
        <strong>Σημείωση: </strong>Οι παραγγελίες που δεν αναγράφουν αναμενώμενο
        χρόνο παράδοσης εξελίσονται κανονικά, και δεν χρειάζεται κάποια ενέργεια
        από την μεριά σας.
      </p>
      <button
        @click="placingOrder = !placingOrder"
        type="button"
        class="xt-button py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-gray-900 bg-gray-100 transition hover:bg-gray-200 active:bg-gray-300 on:bg-gray-200 my-2 mb-5"
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
      <TransitionExpand appear>
        <div class="mb-5 mt-2" v-if="placingOrder">
          <CreateOrder @order-placed="orderPlaced" :user="user" />
        </div>
      </TransitionExpand>

      <Table :columns="columns" include-index>
        <Row v-for="order in orders" :colspan="columns.length + 1">
          <template #head>{{ order.id }}</template>
          <Cell> <DateChip :date="order.createdAt" /> </Cell>
          <Cell v-if="userStore.user.type === 'admin'">
            <UserInfo :user="order.user" />
          </Cell>
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
                <span class="normal-case text-black">{{
                  new Date(order.createdAt).toLocaleDateString()
                }}</span>
              </p>
              <OrderTable :quantities="order.quantities" />
              <p>
                η επιλεγμενη παραδοση ειναι:
                <span class="normal-case">
                  {{ order.delivery.street }}
                  {{ order.delivery.number }}, {{ order.delivery.zip }}
                </span>
              </p>
            </div></template
          >
        </Row>
      </Table>
    </div>
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
import UserInfo from "./userInfo.vue";
import Loader from "../reusables/loaders/containerLoader.vue";
import { mapStores } from "pinia";
import { useUserStore } from "../../stores/user";
import { TransitionExpand } from "@morev/vue-transitions";

type Order = OutputTypes["viewOrders"];
type User = OutputTypes["viewUsers"][number];

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
    UserInfo,
    Loader,
    TransitionExpand,
  },
  data: () => ({
    placingOrder: false,
    orders: [] as Order[],
    loading: false,
    user: undefined as User | undefined,
  }),
  async mounted() {
    this.loading = true;
    const toast = useToast();

    //update user info
    if (this.userStore.user.type === "user") this.user = this.userStore.user;

    // fetch orders
    await backend.viewOrders
      .query()
      .then((orders) => {
        this.orders = orders;
      })
      .catch(() => {
        toast("Υπήρξε κάποιο πρόβλημα και οι παραγγελίες δεν φορτώθηκαν.", {
          type: TYPE.ERROR,
        });
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    orderUpdated(order) {
      this.orders = this.orders.map((o) => {
        if (o.id === order.id) o = order;
        return o;
      });
    },
    orderPlaced(order) {
      order.estimatedDelivery = null;
      order.user = this.user;
      this.orders.unshift(order);
    },
  },
  computed: {
    ...mapStores(useUserStore),
    columns() {
      if (this.userStore.user.type === "user")
        return ["Ημ/νια υποβολης", "συνολο", "κατασταση", "εκτ. παραδοση"];
      else
        return [
          "Ημ/νια υποβολης",
          "χρηστης",
          "συνολο",
          "κατασταση",
          "εκτ. παραδοση",
        ];
    },
  },
};
</script>
