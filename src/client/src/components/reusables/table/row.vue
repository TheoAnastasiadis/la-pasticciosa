<template>
  <tr>
    <th
      class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200 transition group-hover:bg-gray-200"
    >
      <slot name="head"></slot>
    </th>
    <slot></slot>
  </tr>
</template>
