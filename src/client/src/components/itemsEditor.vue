<template>
  <p>
    Παρακάτω βλέπετε τα προϊόντα που έχουν καταχωρηθεί στο σύστημα
    <strong>από τον διαχειριστή</strong>. Τα προϊόντα αυτά είναι ορατά μόνο από
    τον διαχειριστή (όλα), και από τους χρήστες στους οποίους έχουν ανατεθέι
    (μόνο όσα τους έχουν ανατεθέι). Για να αναθέσετε νέα προϊόντα σε κάποιον
    χρήστη επισκεφτείτε την
    <RouterLink to="/dashboard#users" class="xt-link"
      >καρτέλα χρηστών</RouterLink
    >.
  </p>
  <p>{{ items }}</p>
  <div data-xt-overlay="{targets: '#overlay--new-item'}">
    <button
      type="button"
      class="xt-button py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-gray-900 bg-gray-100 transition hover:bg-gray-200 active:bg-gray-300 on:bg-gray-200"
      data-xt-overlay-element
    >
      Νεο Προϊον <i class="h h-plus text-sm"></i>
    </button>
    <div
      aria-label="Modal"
      class="xt-overlay"
      data-xt-overlay-target
      id="overlay--new-item"
    >
      <itemCreator @item-created="itemCreated" />
    </div>
  </div>
</template>

<script lang="ts">
import { useToast, TYPE } from "vue-toastification";
import { backend, type OutputTypes } from "../services/backend";
import itemCreator from "./itemCreator.vue";
type Item = OutputTypes["createItem"];

export default {
  data: () => ({
    items: [] as Item[],
    loading: false,
  }),
  components: { itemCreator },
  async mounted() {
    const toast = useToast();
    this.loading = true;
    this.items = await backend.viewItems.query().catch(() => {
      toast(
        "Υπήρξε κάποιο πρόβλημα με την σύνδεση. Τα προιόντα δεν φορτώθηκαν.",
        { type: TYPE.ERROR },
      );
      return [];
    });
    this.loading = false;
  },
  methods: {
    itemCreated(item: Item) {
      this.items.push(item);
    },
  },
};
</script>
