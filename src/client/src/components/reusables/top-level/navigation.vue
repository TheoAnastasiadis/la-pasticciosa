<template>
  <div class="max-w-7xl md:mx-auto px-3 mx-2.5 my-0">
    <div class="xt-row xt-row-2 md:xt-row-5">
      <!-- Drawer -->
      <div
        class="w-full md:w-3/12 order-last md:order-first fixed z-above bottom-2 right-2 md:static"
      >
        <div
          class="xt-card m-1 p-3 md:p-2 rounded-2xl text-gray-900 xt-links-default bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm backdrop-saturate-50 border md:border-none"
        >
          <nav aria-label="Navigation" class="xt-list xt-list-1 flex-col">
            <a
              role="button"
              class="xt-button flex-auto justify-between py-1.5 px-3 text-md md:text-sm rounded-2xl font-medium leading-snug text-left transition bg-opacity-40 md:hidden"
              @click="open = !open"
            >
              <span>Μενού</span>
              <i
                class="h text-sm mr-2"
                :class="{ 'h-chevrons-down': open, 'h-menu': !open }"
              ></i>
            </a>

            <RouterLink
              :to="`/dashboard/${item.hash}`"
              role="button"
              class="xt-button flex-auto text-sm rounded-2xl font-medium leading-snug justify-start text-left transition-all hover:bg-white hover:text-primary-500 active:text-white h-0 overflow-hidden p-0 m-0 scale-y-0"
              :class="{
                'py-1.5 px-3 h-auto mt-1 ml-1 transform-none': open,
              }"
              v-for="item in header"
            >
              <i class="h text-sm mr-2" :class="`h-${(item as any).icon}`"></i>
              {{ (item as any).title }}
            </RouterLink>
          </nav>
        </div>
      </div>
      <!-- Content -->
      <div class="w-full md:w-9/12">
        <RouterView v-slot="{ Component, route }">
          <TransitionExpand appear>
            <component :is="Component" :key="route.path" />
          </TransitionExpand>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TransitionExpand } from "@morev/vue-transitions";
import { ref } from "vue";

const { header } = defineProps<{
  header: Array<{ title: string; icon: string; hash: string }>;
}>();
const open = ref(true);
</script>

<style scoped>
.router-link-active {
  @apply bg-primary-500 text-white;
}
</style>
