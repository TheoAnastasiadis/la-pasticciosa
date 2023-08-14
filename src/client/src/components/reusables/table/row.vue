<template>
  <tr ref="main">
    <th
      class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200 transition group-hover:bg-gray-200"
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
  <tr v-if="$slots.drawer">
    <td
      class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200 transition-all bg-slate-100 delay-200"
      :colspan="colspan"
      :class="{ hidden: !drawer, 'table-cell': drawer }"
    >
      <slot name="drawer"></slot>
    </td>
  </tr>
</template>

<script lang="ts">
export default {
  data: () => ({ drawer: false, colspan: 0 }),
  mounted() {
    this.colspan = this.$refs.main.cells.length - 1;
  },
};
</script>
