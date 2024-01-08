<template>
  <div
    class="xt-loader absolute z-content inset-0 rounded-inherit overflow-hidden"
    v-if="loading === true"
  >
    <div class="xt-spinner absolute inset-0 m-auto w-6 h-6 text-primary-500">
      <svg
        viewBox="0 0 240 240"
        class="absolute"
        preserveAspectRatio="xMinYMin meet"
      >
        <circle
          class="stroke-current origin-center opacity-25"
          fill="none"
          stroke-width="30"
          cx="120"
          cy="120"
          r="100"
          stroke-dasharray="628"
          stroke-dashoffset="0"
          pathLength="628"
        /></svg
      ><svg viewBox="0 0 240 240">
        <circle
          class="stroke-current origin-center relativext-icon animate-xt-spinner"
          fill="none"
          stroke-width="30"
          cx="120"
          cy="120"
          r="100"
          stroke-dasharray="628"
          stroke-dashoffset="628"
          pathLength="628"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ["loading"],
};
</script>
