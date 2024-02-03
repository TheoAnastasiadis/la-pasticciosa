<template>
  <div
    class="xt-card rounded-2xl px-3 md:px-4 py-6 text-sm text-gray-900 xt-links-default bg-white shadow-xl"
  >
    <Loader :loading="loading" />
    <div class="xt-list flex-col xt-list-1">
      <h3>Παραγγελίες</h3>
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
        class="xt-button py-2.5 px-3.5 text-sm text-white xt-links-inverse rounded-md font-medium leading-snug tracking-wider uppercase bg-primary-500 transition hover:bg-primary-600 active:bg-primary-600 on:bg-primary-600 my-2 mb-5 md:max-w-fit shadow-md"
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
          <CreateOrder @order-placed="orderPlaced" ref="selectedUser" />
        </div>
      </TransitionExpand>
    </div>

    <Table :columns="columns" include-index>
      <template #pagination><Pagination :page="page" @prev="decrement()" @next="increment()"/></template>
      <Row v-for="order in orders" :colspan="columns.length + 1">
        <template #head
          ><span class="inline-block md:hidden">Παραγγελια #</span
          >{{ order.id }}</template
        >
        <Cell
          ><span class="inline-block md:hidden">Υποβλήθηκε: &nbsp;</span
          ><DateChip :date="order.createdAt" />
        </Cell>
        <Cell v-if="userStore?.user?.type === 'admin'">
          <span class="inline-block md:hidden">Από:&nbsp;</span
          ><UserInfo :user="order.user" />
        </Cell>
        <Cell class="block md:hidden"><p>
          <ul  class="items-list">
            <li v-for="quantity in order.quantities">
            <span class="font-semibold">{{ quantity.item.name }}</span> <br/> {{ quantity.value }} ({{ quantity.item.unit }}) &times; {{ quantity.item.price }} &euro;
            </li>
          </ul>
        </p> </Cell>
        <Cell>
          <span class="font-semibold">
            <span class="inline-block md:hidden">Σύνολο:&nbsp;</span
            >{{ order.total }} &euro;</span
          >
        </Cell>
        <Cell class="block md:hidden">
          Παράδοση: {{ order.delivery.street }} {{ order.delivery.number }}, {{ order.delivery.zip }}
        </Cell>
        <Cell>
          <span class="inline-block md:hidden mb-1">Κατάσταση: &nbsp;</span>
          <OrderStatusChip :order="order" @order-updated="orderUpdated" />
        </Cell>
        <Cell>
          <span class="inline-block md:hidden mb-1"
            >Εκτιμώμενη Παράδοση:&nbsp;</span
          ><OrderDeliveryChip :order="order" @order-updated="orderUpdated" />
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
</template>

<style scoped>
.items-list > li {
  margin-bottom: 0.5rem !important;
}
</style>

<script setup lang="ts">
import CreateOrder from "./createOrder.vue";
import Table from "../reusables/table/table.vue";
import Row from "../reusables/table/row.vue";
import Cell from "../reusables/table/cell.vue";
import DateChip from "./dateChip.vue";
import { type OutputTypes } from "../../services/data";
import OrderStatusChip from "./orderStatusChip.vue";
import OrderDeliveryChip from "./orderDeliveryChip.vue";
import OrderTable from "./orderTable.vue";
import UserInfo from "./userInfo.vue";
import Loader from "../reusables/loaders/containerLoader.vue";
import { useUserStore } from "../../stores/user";
import { TransitionExpand } from "@morev/vue-transitions";
import { onMounted, ref } from "vue";
import Pagination from "../reusables/table/pagination.vue"
import { usePagination } from "../../composables/table/pagination";
import { useOrders } from "../../services/data/orders";

type User = OutputTypes["viewUsers"][number]

const placingOrder = ref(false);
const userStore = useUserStore();
const {page, watchPage, increment, decrement} = usePagination()

const columns = userStore?.user?.type === "admin" ? ["Ημ/νια υποβολης", "χρηστης","συνολο", "κατασταση", "εκτ. παραδοση"] : ["Ημ/νια υποβολης",  "συνολο", "κατασταση",  "εκτ. παραδοση"]

const selectedUser = ref<User>();
const {orderUpdated, orderPlaced, orders, loadOrders, loading} = useOrders(selectedUser, placingOrder);

loadOrders(page.value);
watchPage(loadOrders);
</script>
