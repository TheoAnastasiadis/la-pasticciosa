<template>
  <div
    class="xt-card w-80 rounded-md shadow-lg text-gray-900 xt-links-default bg-white transition opacity-0 scale-95 group-in:opacity-100 group-in:scale-100 group-out:scale-105"
  >
    <div
      class="p-5 text-xs rounded-t-md flex-auto"
      :class="{
        'bg-primary-300': header === 'primary',
        'bg-orange-200': header === 'caution',
        'bg-green-200': header === 'success',
      }"
      v-if="$slots.header"
    >
      <slot name="header"></slot>
    </div>
    <nav aria-label="Drop" class="xt-list flex-col py-2">
      <slot name="content"></slot>
    </nav>
    <div
      class="p-5 text-xs rounded-b-md flex-auto"
      :class="{
        'bg-primary-300': footer === 'primary',
        'bg-orange-200': footer === 'caution',
        'bg-green-200': footer === 'success',
      }"
      v-if="$slots.footer"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    header: {
      type: String,
      default: "primary",
    },
    footer: {
      type: String,
      default: "primary",
    },
  },
};
</script>
