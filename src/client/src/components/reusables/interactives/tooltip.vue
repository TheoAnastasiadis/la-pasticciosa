<template>
  <span data-xt-tooltip>
    <a
      href="#"
      data-xt-tooltip-element
      class="underline decoration-slate-500 decoration-dotted"
    >
      <slot name="trigger"></slot>
    </a>
    <div class="xt-tooltip p-3 group" data-xt-tooltip-target>
      <slot name="content"></slot>
      <div
        class="xt-arrow z-below -inset-1 m-3 w-3 h-3 bg-primary-400 opacity-0 transition-opacity ease-out-quint group-in:duration-300 group-out:duration-100 group-in:opacity-100"
      ></div>
    </div>
  </span>
</template>
