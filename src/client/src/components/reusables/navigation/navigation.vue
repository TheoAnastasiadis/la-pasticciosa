<template>
  <div class="flex">
    <!-- Desktop Nav -->
    <div class="relative hidden h-screen my-4 ml-4 mr-2 lg:block w-80">
      <div class="h-full bg-white rounded-2xl shadow-lg">
        <div class="flex items-center justify-center pt-6">
          <a
            href="#"
            class="absolute -top-6 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-3xl bg-primary-500 text-white shadow-lg transition duration-100 hover:bg-primary-600 sm:h-16 sm:w-16"
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        <nav class="mt-6">
          <div>
            <RouterLink
              v-for="item in header"
              :key="item.title"
              class="flex items-center justify-start w-full p-4 my-2 text-primary-500 font-bold transition-colors duration-200 border-r-4 bg-gradient-to-r from-white hover:border-primary-500 hover:to-primary-50 text-xl"
              :to="item.hash"
            >
              <span class="text-left">
                <i :class="`h h-${item.icon} text-2xl`"></i>
              </span>
              <span class="mx-4 text-sm font-normal tracking-wider">
                {{ item.title }}
              </span>
            </RouterLink>
          </div>
        </nav>
      </div>
    </div>
    <div class="px-1 md:px-3 my-4 ml-2 w-full lg:w-9/12">
      <!-- Main -->
      <RouterView v-slot="{ Component, route }">
        <TransitionExpand appear>
          <component :is="Component" :key="route.path" />
        </TransitionExpand>
      </RouterView>
    </div>
  </div>
  <!-- Mobile Nav -->
  <nav
    class="fixed bottom-0 mx-auto sm:left-[calc((100vw-28rem)/2)] flex w-full justify-between gap-8 border-t bg-white px-10 py-4 text-xs sm:max-w-md sm:rounded-t-xl sm:border-transparent sm:text-sm sm:shadow-2xl lg:hidden [&>*:nth-child(3)]:mr-10"
  >
    <a
      href="#"
      class="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-3xl bg-primary-500 text-white shadow-lg transition duration-100 hover:bg-primary-600 sm:-top-8 sm:h-16 sm:w-16"
    >
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
    <RouterLink
      v-for="item in header"
      :key="item.hash"
      :to="item.hash"
      class="flex flex-col items-center gap-1 text-primary-500"
    >
      <i :class="`h h-${item.icon} text-xl text-slate-400`"></i>

      <span
        class="hidden sm:inline w-12 text-ellipsis overflow-hidden text-slate-400"
        >{{ item.title }}</span
      >
    </RouterLink>
  </nav>
</template>

<style scoped>
.router-link-active {
  @apply border-primary-500  to-primary-100;
}
.router-link-active span {
  @apply font-bold text-primary-500;
}

.router-link-active i {
  @apply text-primary-500;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { TransitionExpand } from "@morev/vue-transitions";

const loading = ref(false);
const isSidebarOpen = ref(false);
const currentSidebarTab = ref("linksTab");

const { header } = defineProps<{
  header: Array<{ title: string; icon: string; hash: string }>;
}>();
</script>
