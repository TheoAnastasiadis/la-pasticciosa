<template>
  <div class="flex flex-row space-x-2 items-baseline">
    <p class="text-base text-slate-700">Σελίδα :</p>
    <button
      v-if="page > 0"
      class="p-2 border rounded-sm shadow-sm hover:bg-slate-200"
      @click="$emit('prev')"
    >
      <i class="text-sm h h-chevron-left translate-y-0.5"></i> Προηγούμενη
    </button>
    <div
      class="p-2 border rounded-sm shadow-sm bg-primary-500 text-white text-bold"
    >
      {{ page }}
    </div>
    <button
      class="p-2 border rounded-sm shadow-sm hover:bg-slate-200"
      @click="$emit('next')"
    >
      Επόμενη <i class="text-sm h h-chevron-right translate-y-0.5"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
const { page } = defineProps<{ page: number }>();
defineEmits(["prev", "next"]);
</script>
