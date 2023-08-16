<template>
  <tr ref="main" class="block md:table-row mb-3 md:mb-0">
    <th
      class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-300 md:border-gray-200 transition bg-slate-100 md:bg-white block md:table-cell text-primary-600 md:text-black"
    >
      <slot name="head"></slot>
    </th>
    <slot></slot>
    <td
      v-if="$slots.drawer"
      class="text-sm align-middle leading-snug relative top-0 right-8 w-0"
    >
      <button
        class="shadow-lg shadow-white bg-transparent"
        @click="drawer = !drawer"
      >
        <i
          class="h text-sm text-gray-500"
          :class="{ 'h-chevrons-down': !drawer, 'h-chevrons-up': drawer }"
        ></i>
      </button>
    </td>
  </tr>
  <TransitionExpand appear>
    <tr v-if="$slots.drawer && drawer">
      <td
        class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200 transition-all bg-slate-100 delay-200"
        :colspan="colspan"
      >
        <slot name="drawer"></slot>
      </td>
    </tr>
  </TransitionExpand>
</template>

<script lang="ts">
import { TransitionExpand } from "@morev/vue-transitions";

export default {
  data: () => ({ drawer: false }),
  props: ["colspan"],
  components: {
    TransitionExpand,
  },
};
</script>
