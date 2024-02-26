<template>
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
      <span class="inline-flex overflow-hidden rounded-md border bg-primary-500 shadow-sm w-max mb-5" @click="placingOrder = !placingOrder">
        <RouterLink
        to="/placeorder"
        type="button"
          class="inline-block border-e px-4 py-3 text-sm font-medium text-white hover:bg-primary-600 focus:relative"
        >
          Νέα Παραγγελία
      </RouterLink>

        <RouterLink
        to="/placeorder"
        type="button"
          class="inline-block px-4 py-2 text-white hover:bg-primary-600 focus:relative"
          title="View Orders"
        >
         <i class="h h-plus text-lg"></i>
    </RouterLink>
      </span>
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
</template>

<style scoped>
.items-list > li {
  margin-bottom: 0.5rem !important;
}
</style>

<script setup lang="ts">
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

const userStore = useUserStore();
const {page, watchPage, increment, decrement} = usePagination()

const columns = userStore?.user?.type === "admin" ? ["Ημ/νια Υποβολής", "Χρήστης","Σύνολο", "Κατάσταση", "Εκτ. Παράδοση"] : ["Ημ/νια Υποβολής",  "Σύνολο", "Κατάσταση",  "Εκτ. Παράδοση"]

const selectedUser = ref<User>();
const {orderUpdated, orderPlaced, orders, loadOrders, loading} = useOrders(selectedUser);

loadOrders(page.value);
watchPage(loadOrders);
</script>
