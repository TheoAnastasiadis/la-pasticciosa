<template>
  <span
    class="xt-spinner absolute inset-0 m-auto w-6 h-6 text-primary-500"
    v-if="loading"
  >
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
  </span>
</template>

<script>
export default {
  props: ["loading"],
};
</script>
