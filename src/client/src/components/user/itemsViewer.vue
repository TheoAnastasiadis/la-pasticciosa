<template>
  <div
    class="xt-card rounded-2xl p-6 sm:p-8 text-sm text-gray-900 xt-links-default bg-white"
  >
    <Loader :loading="loading" />
    <h3>Κατάλογος</h3>
    <p>
      Παρακάτω βλέπετε τα προϊόντα που έχουν ανατεθεί στον λογαριασμό σας
      <strong>από τον διαχειριστή</strong>. Τα προϊόντα αυτά είναι είναι
      διαθέσιμα για παραγγελία. Αν επιθυμείτε να προστεθεί στον κατάλογό σας
      κάποιο νέο προϊόν παρακαλώ μην διστάσετε να επικοινωνήσετε με εμάς και θα
      χαρούμε να δουλέψουμε μαζί για να την δημιουργία του προϊόντος που θα
      καλήψει τις ανάγκες σας!
    </p>
    <div class="listing">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useToast, TYPE } from "vue-toastification";
import { backend, type OutputTypes } from "../../services/data";
import Loader from "../reusables/loaders/containerLoader.vue";

type Item = OutputTypes["createItem"];

export default {
  data: () => ({
    items: [] as Item[],
    loading: false,
  }),
  components: { Loader },
  async mounted() {
    const toast = useToast();
    this.loading = true;
    this.items = await backend.viewItems.query({ page: 0 }).catch(() => {
      toast(
        "Υπήρξε κάποιο πρόβλημα με την σύνδεση. Τα προιόντα δεν φορτώθηκαν.",
        { type: TYPE.ERROR },
      );
      return [];
    });
    this.loading = false;
  },
};
</script>
