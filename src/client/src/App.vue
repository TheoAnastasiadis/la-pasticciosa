<template>
  <nav
    aria-label="Navigation"
    class="xt-list xt-list-2 mx-auto w-11/12 flex max-w-10xl items-center justify-between mb-5 md:mb-10 container"
  >
    <div class="flex items-baseline">
      <h2 class="text-xl font-bold md:text-2xl">
        La Pasticciosa
        <div
          class="align-middle py-3 px-3.5 text-xs rounded-xs text-gray-900 font-medium leading-snug tracking-wider uppercase bg-gray-200 hidden sm:inline-block"
        >
          B2B Portal
        </div>
      </h2>
    </div>
    <div class="flex">
      <button
        class="xt-button rounded-full border-1 md:border-2 p-2 border-slate-300 hover:border-primary-300 w-10 h-10 md:w-12 md:h-12 bg-slate-200"
      >
        <i
          class="h text-xl"
          :class="{
            'h-user': !this.userStore.user,
            'h-power': this.userStore.user,
          }"
        ></i>
      </button>
    </div>
  </nav>
  <div class="container">
    <RouterView />
  </div>
</template>

<script lang="ts">
import "xtendui";
import "xtendui/src/toggle";
import "xtendui/src/drop";
import "xtendui/src/overlay";
import "xtendui/src/textareaautosize";

import { mapStores } from "pinia";
import { useUserStore } from "./stores/user";

export default {
  computed: {
    ...mapStores(useUserStore),
  },
};
</script>
