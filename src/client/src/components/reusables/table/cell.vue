<template>
  <td
    class="py-2 px-4 text-sm align-top leading-snug md:border-b border-gray-200 transition group-hover:bg-gray-200 block md:table-cell max-w-[80vw] md:max-w-none"
  >
  <p class="flex items-center gap-3">
    <div class="flex flex-col">
      <p class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
        <slot></slot>
      </p>
    </div>
  </p>
  </td>
</template>
