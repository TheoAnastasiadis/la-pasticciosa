<template>
  <div class="xt-overflow-sub overflow-y-hidden overflow-x-scroll">
    <loader :loading="loading" />
    <p>
      Στον παρακάτω πίνακα εμφανίζονται οι χρήστες που είναι εγγεγραμμένοι στο
      σύστημα, με τις <strong>νεώτερες εγγραφές να είναι πρώτες</strong>.
      Χρηστιμοποιείστε τα εργαλεία για να αποδειχτείτε νέους χρήστες και να
      προσθέσετε προϊόντα στον κατάλογό τους. Αν ένας χρήστης δεν έχει γίνει
      αποδεκτός από τον διαχειριστή δεν μπορεί να προσθέσεις τοποθεσίες
      παράδοσης αλλά ούτε και να υποβάλει παραγγελίες.
    </p>
    <Table :columns="columns">
      <Row v-for="user in users" :key="user.uuid">
        <template #head>{{ user.uuid }}</template>
        <Cell>
          <Tooltip>
            <template #trigger>
              <strong>{{ user.companyName }}</strong
              >&nbsp;{{ user.companyAddress }}
            </template>

            <template #content>
              <userProfileTooltip :user-id="user.uuid" />
            </template>
          </Tooltip>
        </Cell>
        <Cell>
          <Drop>
            <template #trigger>
              {{ user.catalogue.length }}
              <button
                class="xt-button py-1 px-2 text-sm rounded-md font-medium leading-snug tracking-wider bg-slate-100 transition hover:bg-gray-200 active:bg-gray-300 on:bg-gray-200 justify-end text-left truncate"
              >
                Προσθήκη
                <i class="h h-plus text-base hidden md:inline-block"></i>
              </button>
            </template>
            <template #content>
              <div
                class="xt-card w-80 rounded-md shadow-lg text-gray-900 xt-links-default bg-white transition opacity-0 scale-95 group-in:opacity-100 group-in:scale-100 group-out:scale-105"
              >
                <div class="p-5 text-xs rounded-t-md bg-primary-300 flex-auto">
                  <p class="mb-1 font-bold text-sm">Ανάθεση Προϊόντος</p>
                  <p>
                    Όταν ένα προϊόν ανατεθεί σε έναν χρήστη, θα εμφανίζεται στον
                    προσωπικό του κατάλογο και θα μπορεί να
                    <strong>υποβάλει παραγγελίες</strong> για αυτό το προϊόν.
                  </p>
                </div>
                <nav aria-label="Drop" class="xt-list xt-list-1 flex-col py-2">
                  <a
                    v-for="item in items.filter(
                      (i) => !user.catalogue.includes(i.id), // already assigned items should not be shown
                    )"
                    :key="item.id"
                    @click="
                      assignItemTo({ itemId: item.id, userId: user.uuid })
                    "
                    class="xt-button py-1.5 px-3 text-sm transition hover:bg-primary-300 hover:bg-opacity-25 active:text-white active:bg-primary-500 on:text-white on:bg-primary-500"
                  >
                    <div
                      class="xt-list xt-list-3 flex-auto items-center justify-start text-left flex-nowrap"
                    >
                      <div
                        class="h-10 w-10 bg-primary-100 rounded-md text-white xt-links-inverse"
                      >
                        <img
                          :src="item.thumbnail"
                          class="w-full h-full object-cover rounded-md"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div class="font-medium">{{ item.name }}</div>
                        <div class="text-xs opacity-50">
                          {{ item.price }} &euro;
                        </div>
                      </div>
                      <div class="ml-auto">
                        <i
                          class="text-slate-300 text-base h h-plus-square justify-self-end"
                        ></i>
                      </div>
                    </div>
                  </a>
                </nav>
              </div>
            </template>
          </Drop>
        </Cell>
        <Cell>
          <span v-if="user.status == 'accepted'"
            ><i class="xt-icon h h-user-checked text-base text-green-400"></i
            >&nbsp;Ενεργός</span
          >
          <Drop v-else>
            <template #trigger>
              <button
                class="xt-button py-1 px-2 text-sm rounded-md font-medium leading-snug tracking-wider text-gray-900 bg-orange-100 transition hover:bg-orange-200 active:bg-gray-300 on:bg-gray-200 justify-end text-left truncate"
              >
                Σε αναμονή&nbsp;<i
                  class="h h-clock-8 text-base hidden md:inline-block"
                ></i>
              </button>
            </template>
            <template #content>
              <div
                class="xt-card w-80 rounded-md shadow-lg text-gray-900 xt-links-default bg-white transition opacity-0 scale-95 group-in:opacity-100 group-in:scale-100 group-out:scale-105"
              >
                <nav aria-label="Drop" class="xt-list xt-list-1 flex-col py-2">
                  <a
                    @click="accept(user.uuid)"
                    class="xt-button py-1.5 px-3 text-sm transition hover:bg-primary-300 hover:bg-opacity-25 active:text-white active:bg-primary-500 on:text-white on:bg-primary-500"
                  >
                    <div
                      class="xt-list xt-list-3 flex-auto items-center justify-start text-left flex-nowrap"
                    >
                      <div
                        class="p-2 bg-primary-100 rounded-md text-white xt-links-inverse"
                      >
                        <i
                          class="xt-icon h h-user-checked text-sm text-green-500"
                        ></i>
                      </div>
                      <div>
                        <div class="font-medium">Αποδοχή</div>
                        <div class="text-xs opacity-50">
                          Αποδοχή του χρήστη `{{ user.userName }}`;
                        </div>
                      </div>
                    </div>
                  </a>
                </nav>
                <div class="p-5 text-xs rounded-b-md bg-orange-200 flex-auto">
                  <p class="mb-1 font-bold text-sm">Τι σημαίνει αυτό;</p>
                  <p>
                    Όταν ένας χρήστης γίνει αποδεκτός από τον διαχειριστή θα
                    μπορεί να αιτηθεί
                    <strong>τοποθεσίες παράδοσης</strong> καθώς και να
                    <strong>υποβάλει παραγγελίες</strong>.
                  </p>
                </div>
              </div>
            </template>
          </Drop>
        </Cell>
      </Row>
    </Table>
  </div>
</template>

<script lang="ts">
import { backend, type OutputTypes } from "../services/backend";
import { useToast, TYPE } from "vue-toastification";
import loader from "../components/containerLoader.vue";
import userProfileTooltip from "../components/userProfileTooltip.vue";
import Table from "./reusables/table/table.vue";
import Row from "./reusables/table/row.vue";
import Cell from "./reusables/table/cell.vue";
import Tooltip from "./reusables/interactives/tooltip.vue";
import Drop from "./reusables/interactives/drop.vue";

type User = OutputTypes["viewUsers"][number];
type Item = OutputTypes["createItem"];

export default {
  data: () => ({
    users: [] as User[],
    loading: false,
    items: [] as Item[],
    columns: ["#", "χρηστες", "προϊοντα", "κατασταση"],
  }),
  async mounted() {
    this.loading = true;
    const users = await backend.viewUsers.query();
    const items = await backend.viewItems.query();
    this.users = users;
    this.items = items;
    this.loading = false;
  },
  methods: {
    async accept(id: string) {
      const toast = useToast();
      this.loading = true;
      try {
        await backend.acceptUser.mutate(id);
        toast("Η αποδοχή του χρήστη πραγματοποιήθηκε!", { type: TYPE.SUCCESS });
        this.users = (this.users as User[]).map((u) => {
          if (u.uuid === id) u.status = "accepted";
          return u;
        });
      } catch (error) {
        toast(
          "Υπήρξε κάποιο πρόβλημα και η αποδοχή του χρήστη δεν πραγματοποιήθηκε",
          { type: TYPE.ERROR },
        );
      } finally {
        this.loading = false;
      }
    },
    async assignItemTo(props: { itemId: string; userId: string }) {
      this.loading = true;
      const toast = useToast();
      const { userId, itemId } = props;
      try {
        await backend.assignItems.mutate({ userId, itemId });
        toast("Η ανάθεση προϊόντος πραγματοποιήθηκε με επιτυχία.");
        this.users = (this.users as User[]).map((u) => {
          if (u.uuid === userId) u.catalogue.push(itemId);
          return u;
        });
      } catch (e) {
        toast(
          "Υπήρξε κάποιο πρόβλημα και η ανάθεση προϊόντος δεν πραγματοποιήθηκε",
          { type: TYPE.ERROR },
        );
      } finally {
        this.loading = false;
      }
    },
  },
  components: { loader, userProfileTooltip, Table, Row, Cell, Tooltip, Drop },
};
</script>
