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
                @click="editingUser = user"
              >
                Προσθήκη
                <i class="h h-plus text-base hidden md:inline-block"></i>
              </button>
            </template>
            <template #content>
              <Card header="primary">
                <template #header>
                  <p class="mb-1 font-bold text-sm">Ανάθεση Προϊόντος</p>
                  <p>
                    Όταν ένα προϊόν ανατεθεί σε έναν χρήστη, θα εμφανίζεται στον
                    προσωπικό του κατάλογο και θα μπορεί να
                    <strong>υποβάλει παραγγελίες</strong> για αυτό το προϊόν.
                  </p>
                </template>
                <template #content>
                  <!-- Assigned Area -->
                  <div
                    class="w-full"
                    @dragenter.prevent
                    @dragover.prevent
                    @drop.prevent="assignDropped(user.uuid)($event)"
                  >
                    <div
                      class="w-full bg-gray-200 border border-dashed p-5 text-center"
                      v-if="goingToAssign"
                    >
                      <p class="text-md text-green-600">Προσθέστε προϊόν</p>
                    </div>
                    <Action
                      v-for="item in assignedItems"
                      :key="item.id"
                      @click="
                        unassignItemFrom({ itemId: item.id, userId: user.uuid })
                      "
                      :title="item.name"
                      :subtitle="`${item.price} €`"
                      :src="item.thumbnail"
                      :drag-id="item.id"
                      extension-icon="check-circle-1"
                      @dragging-started="toggleGoingToUnassign()"
                      @dragging-ended="toggleGoingToUnassign()"
                    />
                  </div>
                  <div class="w-full p-2">
                    <div
                      class="w-full border-t border-dashed border-gray-400 mb-2 border-spacing-4"
                    ></div>
                    <div class="w-full relative">
                      <i
                        class="absolute top-2.5 right-3.5 text-black text-opacity-50 h h-lens text-sm"
                      ></i>
                      <input
                        type="text"
                        v-model="searchTerm"
                        class="lock w-full rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-primary-300"
                        placeholder="αναζήτηση"
                      />
                    </div>
                  </div>
                  <!-- Unassigned area -->
                  <div
                    class="w-full"
                    @dragenter.prevent
                    @dragover.prevent
                    @drop.prevent="unassignDropped(user.uuid)($event)"
                  >
                    <div
                      class="w-full bg-gray-200 border border-dashed p-5 text-center"
                      v-if="goingToUnassign"
                    >
                      <p class="text-md text-primary-600">Αφαιρέστε προϊόν</p>
                    </div>
                    <Action
                      v-for="item in nonAssignedItems"
                      :key="item.id"
                      @click="
                        assignItemTo({ itemId: item.id, userId: user.uuid })
                      "
                      :title="item.name"
                      :subtitle="`${item.price} €`"
                      :src="item.thumbnail"
                      :drag-id="item.id"
                      extension-icon="plus-square"
                      @dragging-started="toggleGoingToAssign()"
                      @dragging-ended="toggleGoingToAssign()"
                    />
                  </div>
                </template>
              </Card>
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
              <Card footer="caution">
                <template #content>
                  <Action
                    @click="accept(user.uuid)"
                    title="Αποδοχή"
                    :subtitle="`Αποδοχή του χρήστη ${user.userName};`"
                    icon="user-checked"
                    iconColor="green-500"
                  />

                  <Action
                    @click="reject(user.uuid)"
                    title="Απόρριψη"
                    :subtitle="`Διαγραφή του χρήστη ${user.userName};`"
                    icon="user-x"
                    iconColor="red-400"
                  />
                </template>
                <template #footer>
                  <p class="mb-1 font-bold text-sm">Τι σημαίνει αυτό;</p>
                  <p>
                    Όταν ένας χρήστης γίνει αποδεκτός από τον διαχειριστή θα
                    μπορεί να αιτηθεί
                    <strong>τοποθεσίες παράδοσης</strong> καθώς και να
                    <strong>υποβάλει παραγγελίες</strong>.
                  </p>
                </template>
              </Card>
            </template>
          </Drop>
        </Cell>
      </Row>
    </Table>
  </div>
</template>

<script lang="ts">
import Fuse from "fuse.js";
import { backend, type OutputTypes } from "../../services/backend";
import { useToast, TYPE } from "vue-toastification";
import loader from "../reusables/loaders/containerLoader.vue";
import userProfileTooltip from "./userProfileTooltip.vue";
import Table from "../reusables/table/table.vue";
import Row from "../reusables/table/row.vue";
import Cell from "../reusables/table/cell.vue";
import Tooltip from "../reusables/interactives/tooltip.vue";
import Drop from "../reusables/interactives/drop.vue";
import Card from "../reusables/content/card.vue";
import Action from "../reusables/content/action.vue";

type User = OutputTypes["viewUsers"][number];
type Item = OutputTypes["createItem"];

export default {
  data: () => ({
    users: [] as User[],
    loading: false,
    items: [] as Item[],
    columns: ["#", "χρηστες", "προϊοντα", "κατασταση"],
    goingToAssign: false,
    goingToUnassign: false,
    editingUser: undefined as User | undefined,
    searchTerm: "",
  }),
  async mounted() {
    this.loading = true;
    const users = await backend.viewUsers.query();
    const items = await backend.viewItems.query();
    this.users = users;
    this.items = items;
    this.loading = false;
  },
  computed: {
    assignedItems(): Item[] {
      return this.items.filter(
        (item) => this.editingUser?.catalogue?.includes(item.id),
      );
    },
    nonAssignedItems(): Item[] {
      const itemsNotInCatalogue: Item[] = this.items.filter(
        (item) => !this.editingUser?.catalogue?.includes(item.id),
      );

      if (this.searchTerm) {
        const fuse = new Fuse<Item>(itemsNotInCatalogue, {
          keys: ["name", "description", "price"],
        });

        return fuse
          .search(this.searchTerm)
          .map((r) => r.item)
          .splice(0, 3);
      } else return itemsNotInCatalogue.splice(0, 3);
    },
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
    async reject(id: string) {
      const toast = useToast();
      this.loading = true;
      try {
        await backend.rejectUser.mutate(id);
        toast("Η απόρριψη του χρήστη πραγματοποιήθηκε!", {
          type: TYPE.SUCCESS,
        });
        this.users = this.users.filter((u) => u.uuid !== id);
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
          if (u.uuid === userId) u.catalogue.unshift(itemId);
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
    async unassignItemFrom(props: { itemId: string; userId: string }) {
      this.loading = true;
      const toast = useToast();
      const { userId, itemId } = props;
      try {
        await backend.unassingItems.mutate({ userId, itemId });
        toast(
          "Η διαγραφή προϊόντος από τον κατάλογο του χρήστη πραγματοποιήθηκε με επιτυχία.",
        );
        this.users = (this.users as User[]).map((u) => {
          if (u.uuid === userId)
            u.catalogue = u.catalogue.filter((i) => i !== itemId);
          return u;
        });
      } catch (e) {
        toast(
          "Υπήρξε κάποιο πρόβλημα και η διαγραφή προϊόντος από τον κατάλογο του χρήστη δεν πραγματοποιήθηκε",
          { type: TYPE.ERROR },
        );
      } finally {
        this.loading = false;
      }
    },
    toggleGoingToAssign() {
      setTimeout(() => {
        this.goingToAssign = !this.goingToAssign;
      }, 100);
    },
    toggleGoingToUnassign() {
      setTimeout(() => {
        this.goingToUnassign = !this.goingToUnassign;
      }, 100);
    },
    assignDropped(userId: string) {
      return (evt) => {
        const itemId = evt.dataTransfer.getData("itemId");
        this.assignItemTo({ itemId, userId });
      };
    },
    unassignDropped(userId: string) {
      return (evt) => {
        const itemId = evt.dataTransfer.getData("itemId");
        this.unassignItemFrom({ itemId, userId });
      };
    },
  },
  components: {
    loader,
    userProfileTooltip,
    Table,
    Row,
    Cell,
    Tooltip,
    Drop,
    Card,
    Action,
  },
};
</script>
