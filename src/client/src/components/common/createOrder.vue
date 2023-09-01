<template>
  <div
    class="xt-card rounded-md p-2 md:p-4 shadow-lg border border-primary-300 overflow-hidden"
  >
    <Loader :loading="loading" />
    <div class="xt-row xt-row-2">
      <div class="xt-h5 text-primary-500 w-full">
        Δημιουργήστε την παραγγελία σας!
      </div>
      <label
        class="block mb-3 font-medium text-gray-700"
        v-if="userStore?.user?.type === 'admin'"
      >
        Για τον χρήστη: &nbsp;
      </label>
      <select
        v-if="userStore?.user?.type === 'admin'"
        v-model="selectedUser"
        class="block w-full xt-select rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none max-w-xs mb-3"
        aria-label="Select"
      >
        <option selected :value="undefined">Επιλέξτε έναν χρήστη</option>
        <option v-for="user in users" :key="user.uuid" :value="user">
          {{ user.companyName }}
        </option>
      </select>
      <div class="w-full mb-3 animate-pulse">
        <div class="text-xs text-gray-400 italic mb-1.5 ml-1.5">
          Νέο μήνυμα από τον χρήστη XAZOS GOUTSOS EE
        </div>
        <div class="p-1 flex flex-row items-start space-x-3">
          <div
            class="rounded-full bg-gray-200 h-10 w-10 py-2.5 px-2.5 font-bold text-primary-600"
          >
            XG
          </div>
          <div
            class="bg-gray-200 px-4 py-2 rounded-tr-full rounded-br-full rounded-bl-full shadow shadow-green-300"
          >
            KAΛHΣΠEPA , ΘA MOY ΦEPEIΣ TH ΠEMΠTH 10 bigoli 2 KIΛA angiolotti
            MANITAPI KAI 2 KIΛA PABIOΛI KATΣIKIΣIO.EYXAPIΣTΩ!
            <div class="text-xs w-full text-end text-gray-500 italic pr-1.5">
              Μόλις τώρα <i class="h h-clock-7 text-xs translate-y-[1.5px]" />
            </div>
          </div>
          <button
            class="bg-green-500 rounded-full px-4 py-3 text-white font-semibold hover:bg-green-600 hover:drop-shadow-sm min-w-fit"
          >
            <i class="h h-cpu text-sm"></i>
            ΑΙ Ανάγνωση
          </button>
        </div>
      </div>

      <div
        class="w-full p-5 border border-dashed flex flex-col md:flex-row justify-between md:space-y-0 space-y-2"
      >
        <div v-html="deliveryString" class="text-base w-full md:w-8/12" />
        <Overlay
          :enabled="
            quantities.length > 0 && typeof selectedDelivery !== 'undefined'
          "
        >
          <template #trigger>
            <button
              @click="sendOrder()"
              class="xt-button bg-primary-500 px-3 py-2.5 rounded-md uppercase text-white font-semibold hover:bg-primary-600 disabled:pointer-events-none w-full"
            >
              αποστολη
              <ButtonLoader :loading="loading" />
              <i class="text-sm h h-truck ml-1"></i>
            </button>
          </template>
          <template #content>
            <OrderPreview
              :selectedDelivery="selectedDelivery"
              :quantities="quantities"
              :user="selectedUser"
              @order-placed="orderPlaced"
          /></template>
        </Overlay>
      </div>
    </div>
    <div class="mt-4 mb-2">
      <div class="text-md font-bold">Επιλέξτε από τις παρακάτω επιλογές</div>
      <div class="flex flex-row flex-wrap py-4 items-start">
        <ItemChip
          @countChange="updateQuantity(item.id, $event)"
          v-for="item in availableItems"
          :img-src="item.thumbnail"
          :name="item.name"
          :unit="item.unit"
          :price="item.price"
          :item-id="item.id"
        />
        <DeliveryChip
          v-for="delivery in deliveries.filter((d) => d.state === 'accepted')"
          :active="selectedDelivery?.id === delivery.id"
          :title="delivery.name"
          :subtitle="`${delivery.street} ${delivery.number}, ${delivery.zip}`"
          @click="selectedDelivery = delivery"
        />
      </div>
    </div>
    <div class="mb-4">
      <p>
        Αν δεν βλέπετε κάποιο από τα προϊόντα του καταλόγου ή τις τοποθεσίες
        παράδοσης επικοινωνήστε μαζί μας.<br />
        Σημειώστε ότι μπορείτε να υποβάλετε παραγγελίες μόνο προς τις τοποθεσίες
        παράδοσης που έχουν εγγριθεί από τον διαχειριστή.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from "pinia";
import { OutputTypes, backend } from "../../services/backend";
import { useUserStore } from "../../stores/user";
import { TYPE, useToast } from "vue-toastification";
import Loader from "../reusables/loaders/containerLoader.vue";
import ItemChip from "../reusables/content/itemChip.vue";
import DeliveryChip from "../reusables/content/deliveryChip.vue";
import ButtonLoader from "../reusables/loaders/buttonLoader.vue";
import Overlay from "../reusables/interactives/overlay.vue";
import OrderPreview from "./orderPreview.vue";

type Item = OutputTypes["viewItems"][number];
type Delivery = OutputTypes["viewDeliveries"][number];
type User = OutputTypes["viewUsers"][number];

export default {
  props: ["user"],
  data: () => ({
    loading: false,
    quantities: [] as { item: Item; value: number }[],
    availableItems: [] as Item[],
    users: [] as User[],
    selectedUser: undefined as User | undefined,
    deliveries: [] as Delivery[],
    selectedDelivery: undefined as Delivery | undefined,
  }),
  watch: {
    async selectedUser(user) {
      if (!user) {
        this.deliveries = [];
        this.availableItems = [];
        return;
      }

      const toast = useToast();
      this.loading = true;

      try {
        // Fetch the user info
        await backend.viewDeliveries
          .query({
            page: "all",
            // @ts-expect-error onBehalf is not explicitly declared as an input parameter
            onBehalf: user.uuid,
          })
          .then((deliveries) => {
            this.deliveries = deliveries;
          })
          .catch(() => {
            toast(
              "Τα στοιχεία του χρήστη δεν φορτώθηκαν, ίσως χρειαστεί να φορτώσετε ξανά την σελίδα.",
              { type: TYPE.ERROR },
            );
          });

        // item info
        await backend.viewItems
          .query({
            page: "all",
            // @ts-expect-error onBehalf is not explicitly declared as an input parameter
            onBehalf: user.uuid,
          })
          .then((items) => {
            this.availableItems = items;
          })
          .catch(() => {
            toast("Tα προϊόντα δεν φορτώθηκαν. Παρακαλώ προσπαθήστε ξανά.", {
              type: TYPE.ERROR,
            });
          });
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    const userIsAdmin = this.userStore.user.type === "admin";

    const toast = useToast();
    this.loading = true;

    try {
      if (!userIsAdmin) {
        this.selectedUser = this.user;
        // user
        await backend.viewDeliveries
          .query({ page: 0 })
          .then((deliveries) => {
            this.deliveries = deliveries;
          })
          .catch(() => {
            toast(
              "Τα στοιχεία του χρήστη δεν φορτώθηκαν, ίσως χρειαστεί να φορτώσετε ξανά την σελίδα.",
              { type: TYPE.ERROR },
            );
          });

        // First item info
        await backend.viewItems
          .query({ page: 0 })
          .then((items) => {
            this.availableItems = items;
          })
          .catch(() => {
            toast("Tα προϊόντα δεν φορτώθηκαν. Παρακαλώ προσπαθήστε ξανά.", {
              type: TYPE.ERROR,
            });
          });
      } else {
        await backend.viewUsers
          .query({ page: 0 })
          .then((users) => (this.users = users))
          .catch(() =>
            toast(
              "Οι λίστα χρηστών δεν φορτώθηκε. Παρακαλώ προσπαθήστε ξανά.",
              {
                type: TYPE.ERROR,
              },
            ),
          );
      }
    } finally {
      this.loading = false;
    }
  },
  methods: {
    updateQuantity(itemId: string, value: number) {
      console.log(itemId, value);
      const index = (
        this.quantities as { item: Item; value: number }[]
      ).findIndex(({ item }) => item.id === itemId);
      const item = this.availableItems.find((i) => i.id === itemId);

      if (index === -1) {
        (this.quantities as any[]).push({ item, value });
      } else {
        (this.quantities as any[]).splice(index, 1);
        if (value > 0) (this.quantities as any[]).push({ item, value });
      }
    },
    async sendOrder() {
      const toast = useToast();
      if (typeof this.selectedDelivery === "undefined")
        return toast("Παρακαλώ επιλέξτε μια τοποθεσία παράδοσης", {
          type: TYPE.ERROR,
        });

      if (this.quantities.length === 0)
        return toast("Η παραγγελία πρέπει να περιέχει τουλάχιστον ένα προϊόν", {
          type: TYPE.ERROR,
        });
    },
    orderPlaced(order) {
      // empty basket
      this.quantities = [];
      this.selectedDelivery = undefined;
      // propagate
      this.$emit("orderPlaced", order);
    },
  },
  computed: {
    ...mapStores(useUserStore),
    deliveryString() {
      // helper
      const spacer = (i: number) =>
        i > this.quantities.length - 2 ? " και " : i === 0 ? "" : ", ";

      let orderString = "";

      // items
      if (
        this.quantities.length === 0 &&
        typeof this.selectedDelivery === "undefined"
      )
        return "<span class='italic'>Η παραγγελία είναι άδεια μέχρι στιγμής. Προσθέστε προϊόντα και θα εμφανισθούν εδώ.</span>";
      else if (this.quantities.length > 0) {
        orderString +=
          "<span>Η παραγγελία περιέχει " +
          this.quantities
            .map(
              ({ item, value }, i) =>
                `${spacer(i)}<strong>${value} (${item.unit}) ${
                  item.name
                }</strong>`,
            )
            .join("") +
          ". </span><br/>";
      }

      // delivery
      if (typeof this.selectedDelivery !== "undefined")
        orderString += `<span>Η επιλεγμένη τοποθεσία παράδοσης είναι <strong>${this.selectedDelivery.street} ${this.selectedDelivery.number}, ${this.selectedDelivery.zip} (${this.selectedDelivery.name})</strong>. </span><br/>`;

      // total
      if (this.quantities.length > 0)
        orderString += `<span>Το σύνολο είναι <strong class="text-primary-500">${this.quantities
          .map(({ item, value }) => parseFloat(item.price) * value)
          .reduce((a, b) => a + b)
          .toFixed(2)}€</strong>. </span>`;
      return orderString;
    },
  },
  components: {
    Loader,
    ItemChip,
    DeliveryChip,
    ButtonLoader,
    Overlay,
    OrderPreview,
  },
  emits: ["orderPlaced"],
};
</script>
