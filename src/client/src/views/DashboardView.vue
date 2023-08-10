<template>
  <Nav :header="adminHeader" v-if="userStore.user?.type === 'admin'">
    <template #orders>
      <p>
        <strong>Lorem ipsum</strong> dolor sit amet,
        <a href="/">consectetur adipiscing</a> elit. Nullam suscipit, velit eu
        tristique mollis, dui felis dictum turpis, a auctor est odio ac diam.
        Sed mauris augue, sagittis vitae magna eget, vehicula scelerisque elit.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mattis
        purus odio, et dictum felis vestibulum sed. Morbi sodales ex sed dui
        posuere, a tempor purus consectetur. Curabitur vitae leo at magna
        aliquam pellentesque. Nam sed neque in risus volutpat maximus. Sed vitae
        enim vehicula, lacinia orci at, pretium nulla. Cras tincidunt quis ipsum
        et luctus. Cras venenatis, justo in euismod lacinia, urna leo hendrerit
        enim, sit amet gravida nunc lectus id augue. Nullam dolor nibh, commodo
        at commodo eget, iaculis non diam. Ut at rhoncus massa. Sed placerat
        tincidunt nisl, eu consequat neque pretium at. Cras et facilisis leo.
        Mauris justo elit, porttitor sed pellentesque vitae, imperdiet nec ante.
        Nulla quis tempus risus, a aliquet ligula.
      </p>
    </template>

    <template #users>
      <UsersTable />
    </template>

    <template #items>
      <ItemsEditor />
    </template>

    <template #deliveries>
      <LocationsTable />
    </template>

    <template #help>
      <p>Example</p>
    </template>
  </Nav>
  <Nav v-else :header="userHeader">
    <template #orders></template>
    <template #catalogue></template>
    <template #deliveries></template>
    <template #profile></template>
    <template #help></template>
  </Nav>
</template>

<script lang="ts">
import UsersTable from "../components/admin/usersTable.vue";
import ItemsEditor from "../components/admin/itemsEditor.vue";
import LocationsTable from "../components/admin/locationsTable.vue";
import { mapStores } from "pinia";
import { useUserStore } from "../stores/user";
import Nav from "../components/reusables/top-level/navigation.vue";
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
        hash: "deliveries",
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
    Nav,
  },
};
</script>
