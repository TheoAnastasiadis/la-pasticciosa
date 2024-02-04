<template>
  <div class="xt-card bg-white p-5 rounded-md">
    <ContainerLoader :loading="loading" />
    <div class="xt-h5">Επιβεβαίωση παραγγελίας</div>
    <p>Το καλάθι σας περιέχει τα παρακάτω προϊόντα.</p>
    <div class="my-2">
      <OrderTable :quantities="quantities" />
    </div>
    <div v-if="selectedDelivery" class="text-base my-2">
      Η επιλεγμένη τοποθεσία παράδοσης είναι
      <strong>
        {{ this.selectedDelivery.street }}
        {{ this.selectedDelivery.number }},
        {{ this.selectedDelivery.zip }} </strong
      >.
    </div>
    <div class="my-3">
      <label class="cursor-pointer inline-flex items-baseline">
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
    </div>
    <div class="my-3">
      <button
        @click="placeOrder()"
        :disabled="!agreed || loading"
        class="xt-button py-2.5 px-3.5 text-sm rounded-md w-full font-medium leading-snug tracking-wider uppercase text-white bg-primary-500 transition hover:text-white hover:bg-primary-600 active:text-white active:bg-primary-700 on:text-white on:bg-primary-600"
      >
        <Loader :loading="loading" />
        αποστολη&nbsp;
        <i class="text-sm h h-send"></i>
      </button>
    </div>
  </div>
  <Overlay :show="show">
    <template #content>
      <div
        v-if="typeof order !== 'undefined'"
        class="xt-card rounded-2xl shadow-xl text-gray-900 xt-links-default bg-white"
      >
        <button
          type="button"
          class="xt-button xt-dismiss absolute z-above top-0 right-0 p-5 text-lg"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="xt-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="p-6 sm:p-8 text-sm">
          <div class="xt-h4 text-primary-500">Επιτυχία!</div>
          <div>
            <p class="xt-h5">Παραγγελία #{{ order.id }}</p>
            <p>
              Η παραγγελία σας καταχωρήθηκε με επιτυχία. Μόλις γίνει αποδεκτή
              από τους διαχειρηστές
              <strong>θα ενημερωθείτε με γραπτό μήνυμα.</strong> Το σύνολο είναι
              <span class="underline">{{ order.total }}&euro;</span>.
            </p>
            <p>
              Μπορείτε να ενημερώνεστε για την εξέλιξη των παραγγελιών αλλά και
              τους αναμενώμενους χρόνους άφιξης από την
              <a href="#">σελίδα παραγγελιών</a> αλλά και μέσω των ενημερώσεων
              ηλεκτρονικού ταχυδρομείου.
            </p>
            <p>
              Αν έχετε οποιαδήποτε απορρία σχετικά με την παραγγελία σας ή την
              εξέλιξή της παρακαλώ μην διστάσετε να επικοινωνήσετε μαζί μας!
            </p>
            <div class="w-full mt-5">
              <img
                src="@/assets/succesfull_order.svg"
                width="100px"
                class="mx-auto w-6/12"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Overlay>
</template>

<script lang="ts">
import { useToast, TYPE } from "vue-toastification";
import { backend, OutputTypes } from "@/services/data";
import Loader from "@/components/reusables/loaders/buttonLoader.vue";
import ContainerLoader from "@/components/reusables/loaders/containerLoader.vue";
import Overlay from "../reusables/interactives/overlay.vue";
import OrderTable from "./orderTable.vue";

type Order = OutputTypes["placeOrder"];

export default {
  props: ["selectedDelivery", "quantities", "user"],
  data: () => ({
    loading: false,
    agreed: false,
    order: undefined as Order | undefined,
    show: 0,
  }),
  methods: {
    async placeOrder() {
      this.loading = true;
      const toast = useToast();
      console.log("Placing...");
      await backend.placeOrder
        .mutate({
          deliveryId: this.selectedDelivery.id,
          quantityIds: this.quantities.map(({ item, value }) => ({
            item: item.id,
            value,
          })),
          //@ts-expect-error onBehalf is not explicitly defined as an input
          onBehalf: this.user.uuid,
        })
        .then((order) => {
          toast(`H παραγγελία με #${order.id} υποβλήθηκε με επιτυχία!`, {
            type: TYPE.SUCCESS,
          });
          this.order = order;
          this.show++; //this will trigger the success overlay
          this.$emit("orderPlaced", order);
        })
        .catch((error) => {
          toast(
            "Υπήρξε κάποιο πρόβλημα και η παραγγελία δεν υποβλήθηκε. Παρακαλώ προσπαθήστε ξανά",
            { type: TYPE.ERROR },
          );
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  components: { Loader, Overlay, ContainerLoader, OrderTable },
  emits: ["orderPlaced"],
};
</script>
