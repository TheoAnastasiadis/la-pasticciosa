<template>
  <div data-xt-overlay="{ duration: 500 }" ref="overlay">
    <div data-xt-overlay-element><slot name="trigger"></slot></div>

    <div
      aria-label="Modal"
      class="xt-overlay"
      data-xt-overlay-target
      ref="target"
    >
      <div class="xt-backdrop z-below bg-gray-900 opacity-25"></div>
      <div class="xt-overlay-container max-w-3xl">
        <div class="xt-overlay-inner mx-2.5">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Xt } from "xtendui";
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
    show: {}, // used in order to trigger overlay
  },
  updated() {
    let self = Xt.get({ name: "xt-overlay", el: this.$refs.overlay });
    if (!this.enabled) self?.disable();
    else self?.enable();
  },
  watch: {
    show() {
      this.$refs.target.dispatchEvent(new CustomEvent("on.trigger.xt.overlay"));
    },
  },
};
</script>
