<template>
  <div class="xt-list flex-row md:flex-nowrap">
    <div
      class="py-1 pl-2 pr-1.5 text-center rounded-l-lg"
      :class="{
        'bg-slate-200 ': deliveryString === 'N/A',
        'bg-primary-200 ': deliveryString !== 'N/A',
        'rounded-r-lg': userStore.user.type === 'user',
      }"
    >
      <div class="my-auto leading-snug">{{ deliveryString }}</div>
    </div>

    <Drop v-if="userStore.user.type === 'admin'">
      <template #trigger>
        <button
          type="submit"
          class="xt-button py-1 px-1.5 border-l border-gray-400 text-sm rounded-bl-none rounded-r-md font-medium leading-snug tracking-wider uppercase transition"
          :class="{
            'bg-slate-200 hover:bg-slate-300': deliveryString === 'N/A',
            'bg-primary-200 hover:bg-primary-300': deliveryString !== 'N/A',
          }"
        >
          <ButtonLoader :loading="loading" />
          <i class="h h-edit-3 text-sm"></i>
        </button>
      </template>
      <template #content>
        <Card>
          <template #content>
            <div class="p-3">
              <div class="text-lg mb-2">
                Επιλέξτε εκτιμώμενη ημερομηνία παράδοσης.
              </div>
              <vue-tailwind-datepicker
                as-single
                v-model="date"
                i18n="el"
                :formatter="{ date: 'DD MMM YYYY', month: 'MMM' }"
              />

              <button
                @click="updateEstimate"
                class="xt-button rounded-md p-2 w-full bg-primary-400 mt-2 text-white font-semibold hover:bg-primary-500 uppercase leading-snug"
                :disabled="typeof date === 'undefined'"
              >
                ενημερωση&nbsp;
                <ButtonLoader :loading="loading" />
                <i class="text-sm h h-calendar"></i>
              </button>
            </div>
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
import moment from "moment";
import "moment/dist/locale/el";
import ButtonLoader from "../reusables/loaders/buttonLoader.vue";
import Drop from "../reusables/interactives/drop.vue";
import Card from "../reusables/content/card.vue";
import { backend } from "../../services/data";
import { TYPE, useToast } from "vue-toastification";
import { mapStores } from "pinia";
import { useUserStore } from "../../stores/user";

export default {
  props: ["order"],
  data: () => ({ loading: false, date: undefined as Date | undefined }),
  computed: {
    deliveryString() {
      moment.locale("el");
      const timestamp = moment(this.order.estimatedDelivery).unix();
      if (timestamp === 0) return "N/A";
      return moment(this.order.estimatedDelivery).format("DD MMM 'YY");
    },
    ...mapStores(useUserStore),
  },
  methods: {
    async updateEstimate() {
      const toast = useToast();
      this.loading = true;
      const date = moment(this.date, "DD MMM YYYY");
      console.dir(date);
      await backend.updateOrderEstimate
        .mutate({
          id: this.order.id,
          day: date.date(),
          month: date.month(),
          year: date.year(),
        })
        .then((order) => {
          this.$emit("orderUpdated", order);
          toast(
            "H εκτιμώμενη παράδοση άλλαξε με επιτυχία. Ο χρήστης θα ενημερώθει το επόμενο διάστημα.",
          );
        })
        .catch(() => {
          toast(
            "Υπήρξε κάποιο πρόβλημα και η εκτιμώμενη παράδοση δεν ενημερώθηκε.",
            { type: TYPE.ERROR },
          );
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  components: { ButtonLoader, Drop, Card },
};
</script>
