<template>
  <div class="block min-w-max mr-4 mb-4">
    <div
      class="flex flex-row rounded-l-full rounded-r-full h-10 md:h-16 shadow-sm hover:shadow-md transition"
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
        <div class="text-center -mt-0.5 md:mt-1.5">
          <i class="h h-minus text-2xl md:text-3xl"></i>
        </div>
      </a>

      <div
        class="rounded-full h-full aspect-square bg-blue-200 overflow-hidden transition-all w-0 md:w-auto"
        :class="{ 'w-auto': count === 0 }"
      >
        <img :src="imgSrc" class="h-full aspect-square" />
      </div>

      <div
        class="flex flex-col h-full justify-center md:space-y-0.5 mx-1 md:mx-3 text-xs md:text-base max-w-[9rem] overflow-hidden"
      >
        <div
          class="font-bold whitespace-nowrap animation-container"
          ref="titleContainer"
        >
          <span ref="title">{{ name }}</span>
        </div>
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
        <div class="text-center -mt-1 md:mt-1.5">
          <i
            class="h text-2xl md:text-3xl"
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

<style scoped>
.animation-container {
  min-width: 0;
  overflow: visible;
  position: relative;
}

.animation-container > span {
  display: inline-block;
}

.animation-container > .animate {
  position: relative;
  animation: leftright 6s infinite ease-in-out;
}

@keyframes leftright {
  0%,
  20% {
    transform: translateX(0%);
    left: 0%;
  }
  80%,
  100% {
    transform: translateX(-100%);
    left: 100%;
  }
}
</style>

<script lang="ts">
export default {
  props: ["itemId", "imgSrc", "name", "price", "unit", "id"],
  emits: ["countChange"],
  data: () => ({
    count: 0,
  }),
  updated() {
    if (this.$refs.title.clientWidth > this.$refs.titleContainer.clientWidth)
      this.$refs.title.classList.add("animate");
  },
  mounted() {
    if (this.$refs.title.clientWidth > this.$refs.titleContainer.clientWidth)
      this.$refs.title.classList.add("animate");
  },
  watch: {
    count(value) {
      this.$emit("countChange", value);
    },
  },
};
</script>
