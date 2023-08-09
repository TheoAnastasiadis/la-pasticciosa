<template>
  <table class="my-4 xt-my-auto w-full">
    <thead>
      <tr>
        <th
          class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
          v-if="includeIndex"
        >
          #
        </th>
        <th
          class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
          v-for="column of columns"
        >
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  props: {
    columns: { type: Array<String>, required: true },
    includeIndex: { type: Boolean, default: false },
  },
};
</script>
