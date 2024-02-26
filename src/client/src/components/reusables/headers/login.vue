<template>
  <nav
    aria-label="Navigation"
    class="xt-list xt-list-2 mx-auto w-11/12 flex max-w-10xl items-center justify-center mb-5 md:mb-10 container mt-5"
  >
    <div class="flex items-baseline">
      <h2 class="text-xl font-quicksand font-bold md:text-2xl tracking-tight">
        <i class="h h-unlocked-2 text-lg"></i>la pasticciosa
        <div
          class="align-middle py-2 px-2.5 text-xs rounded-xl text-gray-900 font-medium leading-snug tracking-wider uppercase bg-primary-400 hidden sm:inline-block shadow-sm"
        >
          B2B Portal - Secure Page
        </div>
      </h2>
    </div>
  </nav>
</template>

<script lang="ts">
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/user";
import auth from "@/services/auth";

export default {
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    logout() {
      auth.logout();
    },
  },
};
</script>
