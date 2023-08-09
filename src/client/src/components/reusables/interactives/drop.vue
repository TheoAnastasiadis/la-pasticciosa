<template>
  <div data-xt-drop="{ position: 'auto-end', duration: 500 }">
    <slot name="trigger"></slot>
    <div class="xt-drop p-3 group" data-xt-drop-target>
      <slot name="content"></slot>
      <div
        class="xt-arrow z-below -inset-1 m-3 w-3 h-3 bg-gray-200 opacity-0 transition-opacity ease-out-quint group-in:duration-300 group-out:duration-100 group-in:opacity-100"
      ></div>
    </div>
  </div>
</template>
