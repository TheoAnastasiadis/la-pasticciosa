<template>
  <div class="max-w-7xl mx-auto">
    <div data-xt-toggle="{ min: 1, duration: 500 }">
      <div class="xt-row xt-row-4 md:xt-row-8">
        <!-- Drawer -->
        <div class="w-full md:w-3/12">
          <div
            class="xt-card p-2 rounded-2xl text-gray-900 xt-links-default bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm backdrop-saturate-50"
          >
            <nav aria-label="Navigation" class="xt-list xt-list-1 flex-col">
              <a
                role="button"
                class="xt-button flex-auto py-1.5 px-3 text-sm rounded-2xl font-medium leading-snug justify-start text-left transition hover:bg-white hover:text-primary-500 active:text-white active:bg-primary-500 on:text-white on:bg-primary-500"
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
};
</script>
