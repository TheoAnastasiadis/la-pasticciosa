<template>
  <Nav :header="adminHeader" v-if="userStore.user?.type === 'admin'"></Nav>
  <Nav v-else :header="userHeader"></Nav>
</template>

<script setup lang="ts">
import Nav from "@/components/reusables/navigation/navigation.vue";
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
];
const userHeader = [
  { title: "Παραγγελίες", icon: "truck", hash: "orders" },
  { title: "Κατάλογος", icon: "book", hash: "catalogue" },
  {
    title: "Τοποθεσίες Παράδοσης",
    icon: "navigator-2",
    hash: "locations",
  },
];
</script>
