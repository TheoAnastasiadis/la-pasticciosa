<template>
  <div class="xt-list flex-row md:flex-nowrap">
    <div
      class="py-1 pl-2 pr-1.5 text-center rounded-l-lg"
      :class="{
        'bg-green-200': order.status === 'accepted',
        'bg-orange-200': order.status === 'pending',
        'bg-primary-200': order.status === 'in_preparation',
        'bg-slate-200': order.status === 'complete',
        'rounded-r-lg': userStore.user?.type === 'user',
      }"
    >
      <div class="my-auto leading-snug">{{ orderStatus }}</div>
    </div>

    <Drop v-if="userStore.user?.type === 'admin'">
      <template #trigger>
        <button
          type="submit"
          class="xt-button py-1 px-1.5 border-l border-gray-400 text-sm rounded-bl-none rounded-r-md font-medium leading-snug tracking-wider uppercase transition"
          :class="{
            'bg-green-200 hover:bg-green-300': order.status === 'accepted',
            'bg-orange-200 hover:bg-orange-300': order.status === 'pending',
            'bg-primary-200 hover:bg-primary-300':
              order.status === 'in_preparation',
            'bg-slate-200 hover:bg=salte-300': order.status === 'complete',
          }"
        >
          <ButtonLoader :loading="loading" />
          <i class="h h-edit-3 text-sm"></i>
        </button>
      </template>
      <template #content>
        <Card>
          <template #content>
            <Action
              @click="updateOrderStatus('accepted')"
              icon="check-circle-2"
              icon-color="green-500"
              title="Αποδοχή"
              subtitle="Αποδεχτείτε την παραγγελία."
            />
            <Action
              @click="updateOrderStatus('pending')"
              icon="clock-7"
              icon-color="red-400"
              title="Σε Αναμονή"
              subtitle="Ορίστε την παραγγελία `σε αναμονή`."
            />
            <Action
              @click="updateOrderStatus('in_preparation')"
              icon="bag-3"
              icon-color="primary-500"
              title="Προετοιμασία"
              subtitle="Ορίστε την παραγγελία `σε προετοιμασία`."
            />
            <Action
              @click="updateOrderStatus('complete')"
              icon="check-circle-1"
              icon-color="slate-500"
              title="Ολοκληρωμένη"
              subtitle="H παραγγελία ολοκληρώθηκε."
            />
          </template>
          <template #footer color="primary">
            <p>
              Οι χρήστες <strong>θα ειδοποιηθούν</strong> για την αλλαγή της
              κατάστασης της παραγγελίας.
            </p>
          </template>
        </Card>
      </template>
    </Drop>
  </div>
</template>

<script lang="ts">
import { OutputTypes, backend } from "../../services/data";
import Drop from "../reusables/interactives/drop.vue";
import Card from "../reusables/content/card.vue";
import Action from "../reusables/content/action.vue";
import ButtonLoader from "../reusables/loaders/buttonLoader.vue";
import { TYPE, useToast } from "vue-toastification";
import { mapStores } from "pinia";
import { useUserStore } from "../../stores/user";

type Order = OutputTypes["placeOrder"];

export default {
  props: ["order"],
  data: () => ({
    loading: false,
  }),
  computed: {
    orderStatus() {
      switch (this.order.status as Order["status"]) {
        case "accepted":
          return "Έγινε Αποδοχή";

        case "pending":
          return "Σε αναμονή";

        case "in_preparation":
          return "Ετοιμάζεται";

        case "complete":
          return "Ολοκληρωμένη";
      }
    },
    ...mapStores(useUserStore),
  },
  methods: {
    async updateOrderStatus(status: Order["status"]) {
      this.loading = true;
      const toast = useToast();
      await backend.updateOrderStatus
        .mutate({ status, orderId: this.order.id })
        .then((order) => this.$emit("orderUpdated", order))
        .catch(() => {
          toast("Υπήρξε κάποιο πρόβλημα και η παραγγελία δεν ενημερώθηκε.", {
            type: TYPE.ERROR,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  components: { Drop, Card, Action, ButtonLoader },
  emits: ["orderUpdated"],
};
</script>
