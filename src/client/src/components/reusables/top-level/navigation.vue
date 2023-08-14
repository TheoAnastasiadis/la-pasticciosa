<template>
  <div class="max-w-7xl mx-auto">
    <div data-xt-toggle="{ min: 1, duration: 500 }">
      <div class="xt-row xt-row-4 md:xt-row-8">
        <!-- Drawer -->
        <div
          class="w-full md:w-3/12 order-last md:order-first fixed z-above bottom-2 right-2 md:static"
        >
          <div
            class="xt-card p-3 md:p-2 rounded-2xl text-gray-900 xt-links-default bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm backdrop-saturate-50"
          >
            <nav aria-label="Navigation" class="xt-list xt-list-1 flex-col">
              <a
                role="button"
                class="xt-button flex-auto justify-between py-1.5 px-3 text-md md:text-sm rounded-2xl font-medium leading-snug text-left transition hover:bg-white hover:text-primary-500 active:text-white active:bg-primary-500 on:text-white on:bg-primary-500 bg-opacity-40 md:hidden"
                @click="open = !open"
              >
                <span>Επιλογές</span>
                <i
                  class="h text-sm mr-2"
                  :class="{ 'h-chevrons-down': open, 'h-chevrons-up': !open }"
                ></i>
              </a>
              <a
                role="button"
                class="xt-button flex-auto text-sm rounded-2xl font-medium leading-snug justify-start text-left transition-all hover:bg-white hover:text-primary-500 active:text-white active:bg-primary-500 on:text-white on:bg-primary-500 h-0 overflow-hidden p-0 m-0 scale-y-0"
                :class="{
                  'py-1.5 px-3 h-auto mt-1 ml-1 transform-none': open,
                }"
                data-xt-toggle-element
                v-for="item in header"
                :data-xt-hash="(item as any).hash"
              >
                <i
                  class="h text-sm mr-2"
                  :class="`h-${(item as any).icon}`"
                ></i>
                {{ (item as any).title }}
              </a>
            </nav>
          </div>
        </div>
        <!-- Content -->
        <div class="w-full md:w-9/12">
          <div
            class="off:hidden out:pointer-events-none transition opacity-0 scale-95 in:opacity-100 in:scale-100 out:scale-105"
            data-xt-toggle-target
            v-for="item in header"
          >
            <div
              class="xt-card rounded-2xl p-6 sm:p-8 text-sm text-gray-900 xt-links-default bg-white"
            >
              <div class="xt-h5">{{ (item as any).title }}</div>
              <slot :name="(item as any).hash"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: { header: Array },
  data: () => ({
    open: true,
  }),
};
</script>
