<template>
  <nav
    aria-label="Navigation"
    class="xt-list xt-list-2 mx-auto flex max-w-7xl items-center justify-between mb-10 container"
  >
    <div class="flex">
      <h2>
        La Pasticciosa
        <div
          class="inline-block align-middle py-3 px-3.5 text-xs rounded-xs text-gray-900 font-medium leading-snug tracking-wider uppercase bg-gray-100"
        >
          B2B Portal
        </div>
      </h2>
    </div>
    <div class="flex">
      <button
        class="xt-button rounded-full border-4 p-2 border-slate-300 hover:border-primary-300 w-12 h-12"
      >
        <i class="h h-power text-2xl"></i>
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
import HomeView from "./views/HomeView.vue";
export default {
  data: () => ({}),
  components: { HomeView },
};
</script>
