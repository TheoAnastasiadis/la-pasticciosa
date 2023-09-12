<template>
  <div
    class="xt-card rounded-2xl p-8 text-sm text-gray-900 xt-links-default bg-white"
  >
    <h3>Τοποθεσίες Παράδοσης</h3>
    <p>
      Στον παρακάτω πίνακα φαίνονται οι τοποθεσίες παράδοσης τις οποίες έχουν
      αιτηθεί οι χρήστες του συστήματος. Οι τοποθεσίες παράδοσης με την ένδειξη
      <strong>ΕΝΕΡΓΗ</strong> μπορούν να επιλεγούν από τους χρήστες για νέες
      παραγγελέις. Οι τοποθεσίες που είναι εν αναμονή, δεν μπορούν να
      χρησιμοποιηθούν από τους χρήστες.
    </p>
    <Table includeIndex :columns="['Διευθυνση', 'Χρηστης', 'Κατασταση']">
      <Loader :loading="loading" />
      <Row v-for="delivery in deliveries">
        <template #head>
          <span class="inlibe-block md:hidden">Tοποθεσια #</span
          >{{ delivery.id }}</template
        >
        <Cell>
          <span class="inlibe-block md:hidden">Διεύθυνση:&nbsp;</span>
          <strong>{{ delivery.street }} {{ delivery.number }}</strong>
          {{ delivery.zip }} <br />
          {{ delivery.details }}
        </Cell>
        <Cell>
          <span class="inlibe-block md:hidden">Χρήστης:&nbsp;</span>
          <UserInfo :user="delivery.user" />
        </Cell>
        <Cell>
          <span class="inlibe-block md:hidden">Κατάσταση:&nbsp;</span>
          <span v-if="delivery.state === 'accepted'">
            Ενεργή <i class="text-sm h h-check-circle-2 text-green-500"></i>
          </span>
          <Drop v-else>
            <template #trigger>
              <a
                class="xt-button p-2 rounded-sm bg-orange-100 hover:bg-orange-200 font-medium"
                >Σε Αναμονή&nbsp;
                <i class="text-sm h h-clock-7"></i>
              </a>
            </template>
            <template #content>
              <Card footer="caution">
                <template #content>
                  <Action
                    @click="accept(delivery.id)"
                    icon="plus-circle"
                    iconColor="green-500"
                    title="Αποδοχή"
                    subtitle="Αποδοχή αυτής της τοποθεσίας παράδοσης;"
                  ></Action>
                  <Action
                    @click="reject(delivery.id)"
                    icon="trash-1"
                    iconColor="red-500"
                    title="Απόρριψη"
                    subtitle="Διαγραφή αυτής της τοποθεσίας παράδοσης;"
                  ></Action>
                </template>
                <template #footer>
                  <p class="font-bold">Τι σημαίνει;</p>
                  <p>
                    Με την αποδοχή μιας τοποθεσίας παράδοσης ο χρήστης που την
                    έχει αιτηθεί θα μπορεί να υποβάλει νέες παραγγελίες προς
                    αυτήν την τοποθεσία.
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
import { TYPE, useToast } from "vue-toastification";
import { OutputTypes, backend } from "../../services/data";
import Table from "../reusables/table/table.vue";
import Row from "../reusables/table/row.vue";
import Cell from "../reusables/table/cell.vue";
import Tooltip from "../reusables/interactives/tooltip.vue";
import Drop from "../reusables/interactives/drop.vue";
import Card from "../reusables/content/card.vue";
import Action from "../reusables/content/action.vue";
import Loader from "../reusables/loaders/containerLoader.vue";
import UserInfo from "../common/userInfo.vue";
import { mapStores } from "pinia";
import { useUserStore } from "../../stores/user";

type Delivery = OutputTypes["viewDeliveries"][number];

export default {
  data: () => ({ deliveries: [] as Delivery[], loading: false }),
  async mounted() {
    const toast = useToast();
    this.loading = true;
    try {
      const deliveries = await backend.viewDeliveries.query({ page: 0 });
      this.deliveries = deliveries;
    } catch {
      toast("Υπήρξε κάποιο πρόβλημα και οι τοποθεσίες παράδοσης δεν βρέθηκαν", {
        type: TYPE.ERROR,
      });
    } finally {
      this.loading = false;
    }
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async accept(id: string) {
      this.loading = true;
      const toast = useToast();
      await backend.updateDeliveryStatus
        .mutate({ deliveryId: id, action: "accept" })
        .then(() => {
          toast("Η αποδοχή πραγματοποιήθηκε με επιτυχία!");
        })
        .then(() => {
          this.deliveries = this.deliveries.map((d: Delivery) => {
            if (d.id === id) d.state = "accepted";
            return d;
          });
        })
        .catch(() => {
          toast("Κάποιο πρόβλημα υπήρξε και η αποδοχή δεν πραγματοποιήθηκε.", {
            type: TYPE.ERROR,
          });
        });

      this.loading = false;
    },
    async reject(deliveryId: string) {
      this.loading = true;
      const toast = useToast();
      const userId = this.userStore.user.uuid;
      await backend.updateDeliveryStatus
        .mutate({ deliveryId, action: "delete" })
        .then(() => {
          toast("Η απόρριψη πραγματοποιήθηκε με επιτυχία.");
        })
        .then(() => {
          this.deliveries = this.deliveries.filter(
            (d: Delivery) => d.id !== deliveryId,
          );
        })
        .catch(() => {
          toast("Κάποιο πρόβλημα υπήρξε και η απόρριψη δεν πραγματοποιήθηκε.", {
            type: TYPE.ERROR,
          });
        });
      this.loading = false;
    },
  },
  components: {
    Table,
    Row,
    Cell,
    Tooltip,
    UserInfo,
    Drop,
    Card,
    Action,
    Loader,
  },
};
</script>
