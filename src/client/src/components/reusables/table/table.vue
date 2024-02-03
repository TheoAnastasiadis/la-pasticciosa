<template>
  <div class="xt-overflow-sub overflow-y-hidden overflow-x-hidden">
    <table class="w-full min-w-max table-auto text-left">
      <thead class="hidden md:table-header-group">
        <tr>
          <th
            class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
            v-if="includeIndex"
          >
            <p
              class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
            >
              #
            </p>
          </th>
          <th
            class="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
            v-for="column of columns"
          >
            <p
              class="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
            >
              {{ column }}
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
    <div v-if="$slots.pagination">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    columns: { type: Array<String>, required: true },
    includeIndex: { type: Boolean, default: false },
  },
};
</script>
