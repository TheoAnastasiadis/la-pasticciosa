<template>
  <div
    v-if="showOrderPreview"
    class="px-5 py-0 md:px-20 md:py-24 fixed top-0 w-screen h-screen bg-gradient-to-b from-transparent to-green-300 bg-opacity-30 z-overlay backdrop-blur-xl"
  >
    <section>
      <div
        class="flex flex-col items-center px-5 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        <div
          class="flex flex-col w-full max-w-3xl mx-auto prose text-left prose-blue"
        >
          <div class="w-full mx-auto">
            <h1>Η παραγγελία σας υποβλήθηκε με επιτυχία!</h1>
            <h2>
              Αρθμός Παραγγελίας
              <span class="underline">#{{ placedOrder?.id }}</span>
            </h2>
            <p>
              Το σύνολό σας είναι
              <strong>{{ placedOrder?.total }}&euro;</strong> και θα παραδοθεί
              στην διεύθυνση ({{ placedOrder?.delivery.name }})
              {{ placedOrder?.delivery.street }}
              {{ placedOrder?.delivery.number }},
              {{ placedOrder?.delivery.zip }}. Θα ενημερωθείτε αυτόματα για την
              αποδοχή και εκτιμώμενη παράδοση, μέσω ηλ. ταχυδρομείου. Προς το
              παρών όλα είναι έτοιμα!
            </p>
            <RouterLink
              type="button"
              to="/dashboard/orders"
              class="mt-10 px-4 py-3 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-primary-500 lg:px-10 rounded-xl hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
            >
              Επιστοφή στις παραγγελίες
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div
    class="xt-card max-w-6xl rounded-lg mx-auto bg-white px-6 py-8 shadow-lg bg-opacity-80"
  >
    <div class="mb-5">
      <span id="ProgressLabel" class="sr-only">Loading</span>

      <span
        role="progressbar"
        aria-labelledby="ProgressLabel"
        :aria-valuenow="progress"
        class="block rounded-full bg-gray-200"
      >
        <span
          class="block h-3 rounded-full bg-primary-600 transition-all"
          :class="{
            'bg-green-500': progress == 100,
            'bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-indigo-400 to-indigo-500':
              loading,
          }"
          :style="`width: ${progress}%`"
        ></span>
      </span>
    </div>
    <section class="space-y-5">
      <h1 class="xt-h1 text-2xl normal-case">Υποβολή Παραγγελίας</h1>
      <div v-if="userStore?.user?.type === 'admin'">
        <h2 class="text-xl">Επιλογή Χρήστη</h2>
        <select
          v-model="selectedUser"
          class="block w-full xt-select rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none max-w-xs mt-3"
          aria-label="Select"
        >
          <option v-for="user in users" :key="user.uuid" :value="user">
            {{ user.companyName }}
          </option>
        </select>
      </div>
      <div>
        <h2 class="text-xl">Επιλογή Προϊόντων</h2>

        <div class="my-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
          <!-- product - start -->
          <div
            v-for="item in items"
            :key="item.id"
            class="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6"
          >
            <button
              class="group relative block h-48 w-32 overflow-hidden bg-gray-100 sm:h-56 md:h-40 sm:w-40"
            >
              <img
                :src="item.image"
                loading="lazy"
                alt="Item Photo"
                class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
            </button>

            <div class="flex flex-1 flex-col justify-between py-4">
              <div>
                <button
                  class="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                >
                  {{ item.name }}
                </button>

                <span class="block text-gray-500">{{ item.description }}</span>
              </div>

              <div>
                <span class="mb-1 block font-bold text-gray-800 md:text-lg"
                  >{{ item.price }}&euro; / {{ item.unit }}</span
                >
              </div>
            </div>

            <div
              class="flex w-full justify-between border-t p-4 sm:w-auto sm:border-none sm:pl-0 lg:p-6 lg:pl-0"
            >
              <div class="flex flex-col items-start gap-2">
                <div class="flex h-12 w-20 overflow-hidden rounded border">
                  <input
                    type="text"
                    readonly
                    :value="itemQuantity(item)"
                    class="w-full px-4 py-2 outline-none ring-inset ring-primary-300 transition duration-100 focus:ring"
                  />

                  <div class="flex flex-col divide-y border-l">
                    <button
                      @click="incrementItemQuantity(item)"
                      class="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                    >
                      +
                    </button>
                    <button
                      @click="decrementItemQuantity(item)"
                      class="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>

              <div class="ml-4 pt-3 md:ml-8 md:pt-2 lg:ml-16">
                <span class="block font-bold text-gray-800 md:text-lg"
                  >{{ itemTotal(item) }}&euro;</span
                >
              </div>
            </div>
          </div>
          <!-- product - end -->
        </div>
      </div>
      <div>
        <h2 class="text-xl">Επιλογή Τοποθεσίας Παράδοσης</h2>
        <fieldset class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <legend class="sr-only">Delivery</legend>

          <div>
            <label
              v-for="delivery in deliveries"
              :key="delivery.id"
              for="DeliveryStandard"
              class="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-200 p-4 text-sm font-medium shadow-sm hover:border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <div>
                <p class="text-gray-700">{{ delivery.name }}</p>
                <p class="mt-1 text-gray-900">
                  {{ delivery.street }} {{ delivery.number }},
                  {{ delivery.zip }}
                </p>
              </div>
              <input
                type="radio"
                :name="delivery.name"
                :value="delivery"
                :id="delivery.id"
                class="size-5 border-gray-300 text-primary-500"
                @click="selectedDelivery = delivery"
                :checked="selectedDelivery == delivery"
              />
            </label>
          </div>
        </fieldset>
      </div>
    </section>
    <!-- totals - start -->
    <div class="flex flex-col items-center md:items-end gap-4">
      <div class="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xl">
        <div class="space-y-1">
          <div class="flex justify-between gap-4 text-gray-500">
            <span>Υποσύνολο</span>
            <span>{{ orderTotal }}&euro;</span>
          </div>

          <div class="flex justify-between gap-4 text-gray-500">
            <span>Μεταφορικά</span>
            <span>0.00&euro;</span>
          </div>
        </div>

        <div class="mt-4 border-t pt-4">
          <div class="flex items-start justify-between gap-4 text-gray-800">
            <span class="text-lg font-bold">Σύνολο</span>

            <span class="flex flex-col items-end">
              <span class="text-lg font-bold">{{ orderTotal }}&euro;</span>
              <span class="text-sm text-gray-500">συμπ. ΦΠΑ</span>
            </span>
          </div>
        </div>
      </div>
      <label class="cursor-pointer inline-flex items-baseline sm:max-w-xl">
        <input
          type="checkbox"
          v-model="agreed"
          aria-label="Lorem ipsum"
          class="xt-check xt-switch rounded-full bg-gray-200 border border-transparent transition-all checked:bg-primary-500"
        />
        <span class="ml-4"
          ><strong>Έχω διαβάσει και συμφωνώ</strong> με τους
          <a href="#">όρους υποβολής παραγγελίας</a> μέσω του ηλεκτρονικού
          συστήματος, όπως και με τις πολιτικές απορρήτου και προσωπικών
          δεδομένων.
        </span>
      </label>
      <button
        @click="placeOrderAndShow()"
        :disabled="!agreed"
        class="inline-block relative rounded-lg bg-primary-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-primary-300 transition duration-100 hover:bg-primary-600 focus-visible:ring active:bg-primary-700 md:text-base"
      >
        <ButtonLoader :loading="orderLoading" />
        Αποστολή Παραγγελίας
      </button>
    </div>
    <!-- totals - end -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useUserStore } from "../stores/user";
import { useUsers, type User } from "../services/data/users";
import { useItems, type Item } from "../services/data/items";
import { useDeliveries, type Delivery } from "../services/data/deliveries";
import { useOrder } from "../services/data/order";
import { useToast, TYPE } from "vue-toastification";
import ButtonLoader from "../components/reusables/loaders/buttonLoader.vue";

const userStore = useUserStore();
const selectedUser = ref<User>();
const selectedDelivery = ref<Delivery>();
const showOrderPreview = ref<boolean>(false);
const agreed = ref<boolean>(false);
const { loadUsers, usersLoading } = useUsers();
const { loadItems, itemsLoading } = useItems();
const { loadDeliveries, deliveriesLoading } = useDeliveries();
const {
  order,
  incrementItemQuantity,
  decrementItemQuantity,
  orderTotal,
  itemTotal,
  itemQuantity,
  placeOrder,
  orderLoading,
} = useOrder();
const users = ref<User[]>([]);
const items = ref<Item[]>([]);
const deliveries = ref<Delivery[]>([]);

const loading = computed(
  () => deliveriesLoading.value || usersLoading.value || itemsLoading.value,
);

const progress = computed(() => {
  let steps = 0;
  if (selectedUser.value?.uuid) steps += 25;
  if (selectedDelivery.value?.id) steps += 25;
  if (order.value?.quantities.length > 0) steps += 25;
  if (agreed?.value) steps += 25;
  return steps;
});

watch(selectedUser, async () => {
  items.value = [];
  deliveries.value = [];

  items.value = (await loadItems(selectedUser.value?.uuid)) || [];
  deliveries.value = (await loadDeliveries(selectedUser.value?.uuid)) || [];
  selectedDelivery.value = deliveries.value.at(0);
});

const placedOrder = ref<Order | undefined>(undefined);
const toast = useToast();
const placeOrderAndShow = async () => {
  try {
    placedOrder.value = await placeOrder(
      selectedUser.value.uuid,
      selectedDelivery.value.id,
    );
    if (placedOrder.value) showOrderPreview.value = true;
  } catch (e) {
    placedOrder.value = undefined;
  }
};

onMounted(async () => {
  if (userStore.user?.type !== "admin") selectedUser.value = userStore.user;
  else {
    users.value = (await loadUsers()) || [];
    selectedUser.value = users.value.at(0);
  }
});
</script>
