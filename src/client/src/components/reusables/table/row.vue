<template>
  <tr ref="main">
    <th
      class="p-4 border-b border-t md:border-t-0 border-blue-gray-50 block md:table-cell mt-4 md:mt-0 text-primary-500 md:text-black"
    >
      <slot name="head"></slot>
    </th>
    <slot></slot>
    <td
      v-if="$slots.drawer"
      class="text-sm align-middle leading-snug relative top-0 right-8 w-0 hidden md:table-cell"
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
        class="p-4 border-b border-blue-gray-50 transition-all bg-slate-100 delay-200"
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
