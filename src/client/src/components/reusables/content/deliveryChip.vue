<template>
  <div class="block min-w-max mr-4 mb-4">
    <div
      class="flex flex-row rounded-l-full rounded-r-full h-10 md:h-16 shadow-sm hover:shadow-md transition"
      :class="{ 'bg-green-200': active, 'bg-slate-200': !active }"
    >
      <div
        class="rounded-full h-full aspect-square bg-blue-200 overflow-hidden"
      >
        <div class="text-center text-3xl mt-0.5 md:mt-3">
          <i class="h text-3xl h-map-pin"></i>
        </div>
      </div>

      <div
        class="flex flex-col h-full justify-center md:space-y-0.5 ml-1.5 mr-1 md:ml-3 md:mr-3 text-xs md:text-base"
      >
        <div class="font-bold">{{ title }}</div>
        <div>{{ subtitle }}</div>
      </div>
      <a
        @click="$emit('click')"
        class="rounded-full h-full aspect-square py-2 hover:bg-opacity-80 transition-colors"
        :class="{
          'hover:bg-green-300': active,
          'hover:bg-slate-300': !active,
        }"
      >
        <div class="text-center -mt-1 md:mt-1.5">
          <i
            class="h text-2xl md:text-3xl"
            :class="{
              'h-circle opacity-100': !active,
              'h-check-circle-1 opacity-100': active,
            }"
          ></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ["title", "subtitle", "active"],
};
</script>
