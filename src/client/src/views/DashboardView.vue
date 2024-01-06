<template>
  <Nav :header="adminHeader" v-if="userStore.user?.type === 'admin'"></Nav>
  <Nav v-else :header="userHeader"></Nav>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Nav from "../components/reusables/top-level/navigation.vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const adminHeader = [
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
];
const userHeader = [
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
];
</script>
