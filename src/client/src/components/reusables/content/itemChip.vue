<template>
  <div class="block min-w-max mr-4 mb-4">
    <div
      class="flex flex-row rounded-l-full rounded-r-full h-16 shadow-sm hover:shadow-md transition"
      :class="{ 'bg-primary-200': count > 0, 'bg-slate-200': count === 0 }"
    >
      <a
        @click="count = Math.max(count - 1, 0)"
        class="rounded-full h-full aspect-square py-2 hover:bg-opacity-80 transition-all overflow-hidden scale-y-0 max-w-0"
        :class="{
          'transform-none max-w-xl hover:bg-primary-300': count > 0,
          'hover:bg-slate-300': count === 0,
        }"
      >
        <div class="text-center">
          <i class="h h-minus text-3xl mt-1.5"></i>
        </div>
      </a>

      <div
        class="rounded-full h-full aspect-square bg-blue-200 overflow-hidden"
      >
        <img :src="imgSrc" class="h-full aspect-square" />
      </div>

      <div class="flex flex-col h-full justify-center space-y-0.5 mx-3">
        <div class="font-bold">{{ name }}</div>
        <div>{{ price }} / {{ unit }}</div>
      </div>
      <div class="my-auto" v-if="count > 0">
        <span class="text-lg">{{ count }}</span>
      </div>
      <a
        @click="count++"
        class="rounded-full h-full aspect-square py-2 hover:bg-opacity-80 transition-colors"
        :class="{
          'hover:bg-primary-300': count > 0,
          'hover:bg-slate-300': count === 0,
        }"
      >
        <div class="text-center mt-1.5">
          <i
            class="h text-3xl"
            :class="{
              'h-plus-circle opacity-100': count === 0,
              'h-plus opacity-100': count > 0,
            }"
          ></i>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ["itemId", "imgSrc", "name", "price", "unit", "id"],
  emits: ["countChange"],
  data: () => ({
    count: 0,
  }),
  watch: {
    count(value) {
      this.$emit("countChange", value);
    },
  },
};
</script>
