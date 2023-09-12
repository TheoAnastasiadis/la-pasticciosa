<template>
  <Nav :header="adminHeader" v-if="userStore.user?.type === 'admin'"></Nav>
  <Nav v-else :header="userHeader"></Nav>
</template>

<script lang="ts">
import UsersTable from "../components/admin/usersTable.vue";
import ItemsEditor from "../components/admin/itemsEditor.vue";
import LocationsTable from "../components/admin/locationsTable.vue";
import DeliveryTable from "../components/user/deliveryTable.vue";
import { mapStores } from "pinia";
import { useUserStore } from "../stores/user";
import Nav from "../components/reusables/top-level/navigation.vue";
import ItemsViewer from "../components/user/itemsViewer.vue";
import Profile from "../components/common/profile.vue";
import OrdersTable from "../components/common/ordersTable.vue";

export default {
  data: () => ({
    adminHeader: [
      { title: "Παραγγελίες", icon: "truck", hash: "orders" },
      { title: "Χρήστες", icon: "users", hash: "users" },
      { title: "Προϊόντα", icon: "package", hash: "items" },
      {
        title: "Τοποθεσίες Παράδοσης",
        icon: "navigator-2",
        hash: "deliveries",
      },
      { title: "Προφίλ", icon: "user", hash: "profile" },
      {
        title: "Βοήθεια",
        icon: "book",
        hash: "help",
      },
    ],
    userHeader: [
      { title: "Παραγγελίες", icon: "truck", hash: "orders" },
      { title: "Κατάλογος", icon: "book", hash: "catalogue" },
      {
        title: "Τοποθεσίες Παράδοσης",
        icon: "navigator-2",
        hash: "locations",
      },
      { title: "Προφίλ", icon: "user", hash: "profile" },
      {
        title: "Βοήθεια",
        icon: "book",
        hash: "help",
      },
    ],
  }),
  computed: {
    ...mapStores(useUserStore),
  },
  components: {
    UsersTable,
    ItemsEditor,
    LocationsTable,
    DeliveryTable,
    Nav,
    ItemsViewer,
    Profile,
    OrdersTable,
  },
};
</script>
