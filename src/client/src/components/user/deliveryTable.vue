<template>
  <div
    class="xt-card rounded-2xl p-6 sm:p-8 text-sm text-gray-900 xt-links-default bg-white"
  >
    <h3>Τοποθεσίες Παράδοσης</h3>
    <p>
      Παρακάτω βλέπετε τις τοποθεσίες παράδοσης που έχετε συνδέσει με το προφίλ
      σας. Οι τοποθεσίες με την ένδειξη <strong>ΕΝΕΡΓΗ</strong> έχουν γίνει
      αποδεκτές από τον διαχειριστή και μπορείτε να της επιλέξετε στην
      δημιουργία παραγγελιών. Για να αιτηθείτε μια νέα τοποθεσία χρησιμοποιήστε
      τον σύνδεσμο <strong>ΝΕΑ ΑΙΤΗΣΗ</strong>.
    </p>
    <div class="xt-row xt-row-2">
      <div
        v-for="location in locations"
        :key="location.id"
        class="w-full md:w-4/12"
      >
        <div class="card rounded-md p-3 bg-white shadow-md border">
          <div class="xt-h5">{{ location.name }}</div>
          <p class="text-lg">
            <strong>{{ location.street }} {{ location.number }}</strong
            ><br />{{ location.zip }}
          </p>
          <p class="mt-2">{{ location.details }}&nbsp;</p>
          <Tooltip>
            <template #trigger>
              <div
                class="my-5 mx-auto p-3 rounded-md text-center"
                :class="{
                  'bg-green-300': location.state === 'accepted',
                  'bg-orange-300': location.state === 'requested',
                }"
                data-xt-tooltip
              >
                <a
                  data-xt-tooltip-element
                  class="decoration-none text-black cursor-pointer"
                  >{{
                    location.state === "requested" ? "Σε Αναμονή" : "Ενεργή"
                  }}
                  <i
                    class="text-sm h"
                    :class="{
                      'h-clock-7': location.state === 'requested',
                      'h-check-circle-1': location.state === 'accepted',
                    }"
                  ></i
                ></a>
              </div>
            </template>
            <template #content>
              <div
                class="py-2 px-2.5 text-xs xt-card bg-primary-400 rounded-md"
              >
                <p v-if="location.state === 'requested'">
                  Οι τοποθεσίες παράδοσης που είναι σε αναμονή
                  <strong>δεν μπορούν</strong> να χρησιμοποιηθούν σε
                  παραγγελίες.
                </p>
                <p v-else>
                  Οι ενεργές τοποθεσίες παράδοσης <strong>μπορούν</strong> να
                  χρησιμοποιηθούν σε παραγγελίες.
                </p>
              </div>
            </template>
          </Tooltip>
        </div>
      </div>
      <div class="w-full md:w-4/12">
        <div class="card rounded-md border border-dashed border-gray-400 p-2">
          <div class="xt-h5">Νέα Τοποθεσία</div>
          <deliveryCreator
            @delivery-requested="(l) => this.locations.push(l)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import deliveryCreator from "./deliveryCreator.vue";
import { OutputTypes, backend } from "../../services/backend";
import Tooltip from "../reusables/interactives/tooltip.vue";

type Delivery = OutputTypes["requestDelivery"];
export default {
  data: () => ({ locations: [] as Delivery[], loading: false }),
  async mounted() {
    this.loading = true;
    const { deliveries } = await backend.viewUserProfile.query();
    this.locations = deliveries;
    this.loading = false;
  },
  components: { deliveryCreator, Tooltip },
};
</script>
