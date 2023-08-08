<template>
  <div
    class="xt-card rounded-md shadow-md text-white xt-links-inverse font-medium bg-primary-400 transition duration-300 opacity-0 scale-95 group-in:opacity-100 group-in:scale-100 group-out:scale-105"
  >
    <div class="xt-list xt-list-1 flex-col p-2">
      <div class="w-full">
        <div
          class="xt-list xt-list-1 flex-auto items-center justify-start text-left flex-nowrap py-1.5 px-2 text-sm"
        >
          <div>
            <div class="text-lg normal-case">Στοιχεία χρήστη</div>
            <table class="my-4 xt-my-auto w-full">
              <tbody>
                <tr>
                  <th
                    class="py-2 px-2 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
                  >
                    ονομα χρηστη
                  </th>
                  <td
                    class="py-2 px-2 text-sm align-top leading-snug border border-gray-200"
                  >
                    {{ user.userName }}
                  </td>
                </tr>
                <tr>
                  <th
                    class="py-2 px-2 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
                  >
                    Επιχειρηση
                  </th>
                  <td
                    class="py-2 px-2 text-sm align-top leading-snug border border-gray-200"
                  >
                    {{ user.companyName }}
                  </td>
                </tr>
                <tr>
                  <th
                    class="py-2 px-2 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
                  >
                    εδρα
                  </th>
                  <td
                    class="py-2 px-2 text-sm align-top leading-snug border border-gray-200"
                  >
                    {{ user.companyAddress }}
                  </td>
                </tr>
                <tr>
                  <th
                    class="py-2 px-2 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
                  >
                    ΑΦΜ
                  </th>
                  <td
                    class="py-2 px-2 text-sm align-top leading-snug border border-gray-200"
                  >
                    {{ user.vat }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-if="deliveries.length > 0">
        <div
          class="xt-list xt-list-1 flex-auto items-center justify-start text-left flex-nowrap py-1.5 px-2 text-sm"
        >
          <div>
            <div class="text-lg">Τοποθεσίες Παράδοσης</div>
            <table class="my-4 xt-my-auto w-full">
              <thead>
                <tr>
                  <th
                    class="py-2 px-2 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
                  >
                    Ονομασια
                  </th>
                  <th
                    class="py-2 px-2 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
                  >
                    Διευθυνση
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="delivery of deliveries" :key="delivery.id">
                  <th
                    class="py-2 px-2 text-xs align-top leading-snug tracking-wider text-left border border-gray-200"
                  >
                    {{ delivery.name }}
                  </th>
                  <td
                    class="py-2 px-2 text-sm align-top leading-snug border border-gray-200"
                  >
                    {{ delivery.street }} {{ delivery.number }} {{ delivery.zip
                    }}<br />{{ delivery.details }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { OutputTypes, backend } from "../services/backend";
type User = OutputTypes["viewUserProfile"]["user"];
type Delivery = OutputTypes["viewUserProfile"]["deliveries"][number];

export default {
  props: ["userId"],
  data: () => ({
    user: {} as User,
    deliveries: [] as Delivery[],
    loading: false,
  }),
  async mounted() {
    this.loading = false;
    const { user, deliveries } = await backend.viewUserProfile
      .query(this.userId)
      .finally(() => {
        this.loading = false;
      });
    this.user = user;
    this.deliveries = deliveries;
  },
};
</script>
