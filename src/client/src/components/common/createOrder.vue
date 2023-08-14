<template>
  <div class="xt-card rounded-md p-4 shadow-lg border border-primary-300">
    <Loader :loading="loading" />
    <div class="xt-row xt-row-2">
      <div class="xt-h5 text-primary-500">Δημιουργήστε την παραγγελία σας!</div>
      <div
        class="w-full p-5 border border-dashed flex justify-between space-x-3"
      >
        <div v-html="deliveryString" class="text-base" />
        <div>
          <Overlay
            :enabled="
              quantities.length > 0 && typeof selectedDelivery !== 'undefined'
            "
          >
            <template #trigger>
              <button
                @click="sendOrder()"
                class="xt-button bg-primary-500 px-3 py-2.5 rounded-md uppercase text-white font-semibold hover:bg-primary-600 disabled:pointer-events-none"
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
                :user="userStore.user"
                @order-placed="orderPlaced"
            /></template>
          </Overlay>
        </div>
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
          v-for="delivery in userStore.deliveries?.filter(
            (d) => d.state === 'accepted',
          )"
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

type Item = OutputTypes["viewAssignedItems"][number];
type Delivery = OutputTypes["viewUserProfile"]["deliveries"][number];
type User = OutputTypes["viewUserProfile"]["user"];

export default {
  data: () => ({
    loading: false,
    quantities: [] as { item: Item; value: number }[],
    availableItems: [] as Item[],
    selectedDelivery: undefined as Delivery | undefined,
    user: undefined as User | undefined,
  }),
  async mounted() {
    const toast = useToast();
    this.loading = true;

    const userIsAdmin = this.userStore.user.type === "admin";
    if (!userIsAdmin) this.user = this.userStore.user;

    // First update the user store
    await backend.viewUserProfile
      .query(userIsAdmin ? this.user.uuid : undefined)
      .then(({ user, deliveries }) => {
        (this.userStore as ReturnType<typeof useUserStore>).login(
          user,
          deliveries,
        );
      })
      .catch(() => {
        toast(
          "Τα στοιχεία του χρήστη δεν ενημερώθηκαν, ίσως χρειαστεί να φορτώσετε ξανά την σελίδα.",
        );
      });

    // then fetch the item info
    await backend.viewAssignedItems
      .query(userIsAdmin ? this.user.uuid : undefined)
      .then((items) => {
        this.availableItems = items;
      })
      .catch(() => {
        toast(
          "Tα διαθέσιμα προϊόντα δεν φορτώθηκαν. Παρακαλώ προσπαθήστε ξανά.",
          { type: TYPE.ERROR },
        );
      })
      .finally(() => {
        this.loading = false;
      });
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
