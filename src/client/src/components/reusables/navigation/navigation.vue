<template>
  <!-- component -->
  <div @resize.window="watchScreen()" class="z-10">
    <div class="flex min-h-screen antialiased text-gray-900">
      <!-- Loading screen -->
      <div
        v-if="loading"
        class="fixed inset-0 z-50 flex items-center justify-center text-2xl font-semibold text-white bg-primary-800"
      >
        Loading.....
      </div>

      <!-- Sidebar -->
      <div class="flex flex-shrink-0 transition-all">
        <div
          v-if="isSidebarOpen"
          @click="isSidebarOpen = false"
          class="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
        ></div>
        <div v-if="isSidebarOpen" class="fixed inset-y-0 z-10 w-16"></div>

        <!-- Mobile bottom bar -->
        <nav
          aria-label="Options"
          class="fixed inset-x-0 bottom-0 flex flex-row-reverse items-center justify-center gap-5 px-4 py-4 bg-white border-t border-slate-400 sm:hidden shadow-t rounded-t-3xl z-above backdrop-blur-lg backdrop-opacity-80 shadow-md"
        >
          <!-- Menu button -->
          <button
            @click="
              isSidebarOpen && currentSidebarTab == 'linksTab'
                ? (isSidebarOpen = false)
                : (isSidebarOpen = true);
              currentSidebarTab = 'linksTab';
            "
            class="p-2 transition-colors rounded-lg shadow-md hover:bg-primary-800 hover:text-white focus:outline-none focus:ring focus:ring-primary-600 focus:ring-offset-white focus:ring-offset-2 border border-slate-400 md:border-0"
            :class="
              isSidebarOpen && currentSidebarTab == 'linksTab'
                ? 'text-white bg-primary-600'
                : 'text-gray-500 bg-white'
            "
          >
            <i class="h h-menu block text-xl mx-1.5"></i>
          </button>

          <!-- Help button -->
          <button
            @click="
              isSidebarOpen && currentSidebarTab == 'helpTab'
                ? (isSidebarOpen = false)
                : (isSidebarOpen = true);
              currentSidebarTab = 'helpTab';
            "
            class="p-2 transition-colors rounded-lg shadow-md hover:bg-primary-800 hover:text-white focus:outline-none focus:ring focus:ring-primary-600 focus:ring-offset-white focus:ring-offset-2 border border-slate-400 md:border-0"
            :class="
              isSidebarOpen && currentSidebarTab == 'helpTab'
                ? 'text-white bg-primary-600'
                : 'text-gray-500 bg-white'
            "
          >
            <i class="h h-book block text-xl mx-1.5"></i>
          </button>

          <!-- Profile button -->
          <RouterLink
            type="button"
            to="/dashboard/profile"
            @click="
              currentSidebarTab = 'accountTab';
              isSidebarOpen = false;
            "
            class="p-2 transition-colors rounded-lg shadow-md hover:bg-primary-800 hover:text-white focus:outline-none focus:ring focus:ring-primary-600 focus:ring-offset-white focus:ring-offset-2 border border-slate-400 md:border-0"
            :class="
              isSidebarOpen && currentSidebarTab == 'accountTab'
                ? 'text-white bg-primary-600'
                : 'text-gray-500 bg-white'
            "
          >
            <i class="h h-user block text-xl mx-1.5 translate-x-0.5"></i>
          </RouterLink>
        </nav>

        <!-- Left mini bar -->
        <nav
          aria-label="Options"
          class="z-20 flex-col items-center flex-shrink-0 hidden w-16 py-4 bg-white border-r-2 border-slate-300 shadow-md sm:flex rounded-tr-3xl rounded-br-3xl"
        >
          <div class="flex flex-col items-center flex-1 p-2 space-y-4">
            <!-- Menu button -->
            <button
              @click="
                isSidebarOpen && currentSidebarTab == 'linksTab'
                  ? (isSidebarOpen = false)
                  : (isSidebarOpen = true);
                currentSidebarTab = 'linksTab';
              "
              class="p-2 transition-colors rounded-lg shadow-md hover:bg-primary-800 hover:text-white focus:outline-none focus:ring focus:ring-primary-600 focus:ring-offset-white focus:ring-offset-2 border border-slate-400"
              :class="
                isSidebarOpen && currentSidebarTab == 'linksTab'
                  ? 'text-white bg-primary-600'
                  : 'text-gray-500 bg-white'
              "
            >
              <i class="h h-menu block text-xl mx-1.5"></i>
            </button>

            <!-- help button-->
            <button
              @click="
                isSidebarOpen && currentSidebarTab == 'helpTab'
                  ? (isSidebarOpen = false)
                  : (isSidebarOpen = true);
                currentSidebarTab = 'helpTab';
              "
              class="p-2 transition-colors rounded-lg shadow-md hover:bg-primary-800 hover:text-white focus:outline-none focus:ring focus:ring-primary-600 focus:ring-offset-white focus:ring-offset-2 border border-slate-400"
              :class="
                isSidebarOpen && currentSidebarTab == 'helpTab'
                  ? 'text-white bg-primary-600'
                  : 'text-gray-500 bg-white'
              "
            >
              <i class="h h-book block text-xl mx-1.5"></i>
            </button>

            <!-- account button-->
            <RouterLink
              type="button"
              to="/dashboard/profile"
              @click="
                currentSidebarTab = 'accountTab';
                isSidebarOpen = false;
              "
              class="p-2 transition-colors rounded-lg shadow-md hover:bg-primary-800 hover:text-white focus:outline-none focus:ring focus:ring-primary-600 focus:ring-offset-white focus:ring-offset-2 border border-slate-400"
              :class="
                currentSidebarTab == 'accountTab'
                  ? 'text-white bg-primary-600'
                  : 'text-gray-500 bg-white'
              "
            >
              <i class="h h-user block text-xl mx-1 translate-x-0.5"></i>
            </RouterLink>
          </div>
        </nav>

        <div
          v-if="isSidebarOpen"
          class="fixed inset-y-0 left-0 z-10 flex-shrink-0 w-64 bg-white border-r-2 border-slate-300 shadow-lg sm:left-16 rounded-tr-3xl rounded-br-3xl sm:w-72 lg:static lg:w-64"
        >
          <nav
            v-if="currentSidebarTab == 'linksTab'"
            aria-label="Main"
            class="flex flex-col h-full py-10"
          >
            <!-- Links -->
            <div
              class="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto"
            >
              <RouterLink
                :to="`/dashboard/${item.hash}`"
                role="button"
                v-for="item in header"
                class="flex items-center space-x-2 text-primary-600 transition-colors rounded-lg group hover:bg-primary-500 hover:text-white active:text-white active:bg-primary-500"
              >
                <span aria-hidden="true" class="p-2 rounded-lg">
                  <i
                    class="h text-xl mx-1.5 my-0.5"
                    :class="`h-${(item as any).icon}`"
                  ></i>
                </span>
                <span>{{ item.title }}</span>
              </RouterLink>
            </div>
          </nav>

          <!-- <section v-if="currentSidebarTab == 'helpTab'" class="px-4 py-6">
            <h2 class="text-xl">Account</h2>
          </section> -->
        </div>
      </div>
      <div class="px-1 md:px-3">
        <!-- Main -->
        <RouterView v-slot="{ Component, route }">
          <TransitionExpand appear>
            <component :is="Component" :key="route.path" />
          </TransitionExpand>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-primary-500 text-white;
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

const watchScreen = () => {
  if (window.innerWidth <= 1024) isSidebarOpen.value = false;
};
</script>
