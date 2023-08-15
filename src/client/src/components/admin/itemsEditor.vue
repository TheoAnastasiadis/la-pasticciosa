<template>
  <div
    class="xt-card rounded-2xl p-6 sm:p-8 text-sm text-gray-900 xt-links-default bg-white"
  >
    <h3>Κατάλογος Προϊόντων</h3>
    <Loader :loading="loading" />
    <p>
      Παρακάτω βλέπετε τα προϊόντα που έχουν καταχωρηθεί στο σύστημα
      <strong>από τον διαχειριστή</strong>. Τα προϊόντα αυτά είναι ορατά μόνο
      από τον διαχειριστή (όλα), και από τους χρήστες στους οποίους έχουν
      ανατεθέι (μόνο όσα τους έχουν ανατεθέι). Για να αναθέσετε νέα προϊόντα σε
      κάποιον χρήστη επισκεφτείτε την
      <RouterLink to="/dashboard#users" class="xt-link"
        >καρτέλα χρηστών</RouterLink
      >.
    </p>
    <div data-xt-overlay="{targets: '#overlay--new-item'}">
      <button
        type="button"
        class="xt-button py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-gray-900 bg-gray-100 transition hover:bg-gray-200 active:bg-gray-300 on:bg-gray-200"
        data-xt-overlay-element
      >
        προσθηκη προϊοντος <i class="h h-plus text-sm"></i>
      </button>
      <div class="listing py-10">
        <div class="container px-0">
          <div class="xt-row xt-row-4">
            <div
              class="w-full md:w-4/12 lg:w-3/12"
              v-for="item in items"
              :key="item.id"
            >
              <div class="listing-item">
                <div class="xt-media-container bg-white pb-[75%]">
                  <img
                    class="xt-media object-cover rounded-md transition duration-300 ease-in-out hover:scale-105"
                    :src="item.image"
                    loading="lazy"
                    alt="product image"
                  />
                </div>
                <div class="py-4">
                  <div class="xt-h6">{{ item.name }}</div>
                  <div class="-mt-2 text-base font-medium text-primary-600">
                    {{ item.price }} €
                  </div>
                  <div class="text-sm text-slate-500">
                    {{ item.description }}
                  </div>
                </div>
                <div class="w-full">
                  <button
                    @click="deleteItem(item.id)"
                    class="xt-button bg-red-400 hover:bg-red-500 p-1 rounded-md text-white w-full"
                  >
                    Διαγραφή&nbsp;
                    <i class="text-sm h h-trash-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-label="Modal"
        class="xt-overlay"
        data-xt-overlay-target
        id="overlay--new-item"
      >
        <itemCreator @item-created="itemCreated" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useToast, TYPE } from "vue-toastification";
import { backend, type OutputTypes } from "../../services/backend";
import itemCreator from "./itemCreator.vue";
import Loader from "../reusables/loaders/containerLoader.vue";

type Item = OutputTypes["createItem"];

export default {
  data: () => ({
    items: [] as Item[],
    loading: false,
  }),
  components: { itemCreator, Loader },
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
    async deleteItem(id: string) {
      this.loading = true;
      const toast = useToast();
      await backend.deleteItem
        .mutate(id)
        .then(() => {
          this.items = this.items.filter((i: Item) => i.id !== id);
          toast("Το προϊόν αφαιρέθηκε με επιτυχία.");
        })
        .catch(() => {
          toast("Υπήρξε κάποιο πρόβλημα και το προϊόν δεν διαγράφηκε.", {
            type: TYPE.ERROR,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
