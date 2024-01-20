<template>
  <header>
    <input
      type="checkbox"
      name="hbr"
      id="hbr"
      class="hbr peer"
      hidden
      aria-hidden="true"
    />
    <nav
      class="fixed w-[98vw] bg-white/80 dark:bg-gray-900/80 backdrop-blur navbar shadow-2xl shadow-gray-600/5 border-b border-gray-100 dark:border-gray-800 peer-checked:navbar-active dark:shadow-none rounded-md top-2 mx-[1vw] z-above"
    >
      <div class="xl:container m-auto px-8 md:px-9 lg:px-4">
        <div
          class="flex flex-wrap items-center justify-between gap-6 md:py-1 md:gap-0 lg:py-3"
        >
          <div class="w-full items-center flex justify-between lg:w-auto">
            <a
              class="relative z-10 font-quicksand font-extrabold text-xl md:text-3xl tracking-tight text-primary-800"
              href="#"
              aria-label="logo"
            >
              <span
                class="w-7 h-7 bg-[url(/favicon.ico)] bg-contain inline-block translate-y-1.5 md:translate-y-1"
              ></span>
              la pasticciosa
            </a>
            <label
              for="hbr"
              class="block relative z-20 p-3 -mr-6 cursor-pointer lg:hidden"
            >
              <RouterLink to="/login">
                <button type="submit" class="xt-button">
                  <i class="h h-power text-2xl text-black"></i>
                </button>
              </RouterLink>
            </label>
          </div>
          <div
            class="navmenu hidden w-full flex-wrap justify-end items-center mb-16 space-y-8 p-6 border border-gray-100 rounded-3xl shadow-2xl shadow-gray-300/20 bg-white dark:bg-gray-800 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0"
          >
            <div class="text-gray-600 dark:text-gray-300 lg:pr-4">
              <ul
                class="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0 text-black"
              >
                <li>
                  <a
                    href="#"
                    class="block md:px-4 transition hover:text-primary-700 dark:hover:text-primaryLight"
                  >
                    <span>Πλεονεκτήματα</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block md:px-4 transition hover:text-primary-700 dark:hover:text-primaryLight"
                  >
                    <span>Κατάλογος</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block md:px-4 transition hover:text-primary-700 dark:hover:text-primaryLight"
                  >
                    <span>Παραγγελίες</span>
                  </a>
                </li>
              </ul>
            </div>

            <div
              class="w-full space-y-2 border-primary/10 dark:border-gray-700 flex flex-col -ml-1 sm:flex-row lg:space-y-0 md:w-max lg:border-l"
            >
              <RouterLink
                to="/login"
                class="relative flex h-9 ml-auto items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-md before:bg-primary-600 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
              >
                <span
                  class="relative text-sm font-semibold text-white dark:text-gray-900"
                  >Σύνδεση</span
                >
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar-active .hamburger div:first-child {
  @apply rotate-45 translate-y-1.5;
}
.navbar-active .hamburger div:last-child {
  @apply -rotate-45 -translate-y-1;
}
.navbar-active div:first-child div:first-child div:last-child {
  @apply block lg:flex;
}
</style>

<script setup lang="ts">
import Drop from "../../interactives/drop.vue";
import Button from "../../interact";
</script>
