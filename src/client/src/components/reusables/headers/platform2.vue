<template>
  <!-- component -->
  <header class="bg-white mb-5 shadow-md">
    <div class="container mx-auto pt-4 flex items-center justify-between">
      <!-- logo -->
      <div class="md:w-4/12 xl:w-3/12">
        <h2 class="text-xl font-quicksand font-bold md:text-2xl tracking-tight">
          la pasticciosa
          <div
            class="align-middle py-2 px-2.5 text-xs rounded-xl text-gray-900 font-medium leading-snug tracking-wider uppercase bg-primary-200 hidden sm:inline-block shadow-sm"
          >
            B2B Portal
          </div>
        </h2>
      </div>

      <!-- search -->
      <div
        class="w-4/12 xl:w-5/12 max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden lg:flex items-center justify-between"
      >
        <input
          class="bg-transparent font-semibold text-sm p-4"
          type="text"
          :placeholder="`Τι ψάχνεις ${userStore.user?.userName};`"
        />
        <svg
          class="ml-4 h-5 px-4 text-gray-500 svg-inline--fa fa-search fa-w-16 fa-9x"
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="search"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
          ></path>
        </svg>
      </div>

      <!-- phone number -->
      <div class="ml-4 md:3/12 hidden sm:flex flex-col place-items-end">
        <span class="font-bold md:text-xl">(+30) 216 800 22 62</span>
        <span class="font-semibold text-sm text-gray-400">Υποστήριξη 24/7</span>
      </div>

      <!-- buttons -->
      <nav class="contents w-1/12">
        <ul class="ml-4 flex items-center justify-end">
          <li class="ml-2 lg:ml-4 relative inline-block">
            <a href="#" @click.prevent="auth.logout()">
              <i class="h h-logout text-2xl text-red-600"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <hr />
  </header>
</template>

<script setup lang="ts">
import auth from "@/services/auth";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
