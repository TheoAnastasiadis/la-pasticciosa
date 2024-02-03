<template>
  <footer class="mt-[10vh] mb-[10vh] md:mt-auto md:mb-auto">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div
        class="py-8 lg:pt-16 flex flex-col md:flex-row justify-between justify-items-center"
      >
        <ul class="flex flex-wrap gap-4 text-xs mb-5 md:mb-0">
          <li>
            <a href="#" class="text-gray-500 transition hover:opacity-75">
              Terms & Conditions
            </a>
          </li>

          <li>
            <a href="#" class="text-gray-500 transition hover:opacity-75">
              Privacy Policy
            </a>
          </li>

          <li>
            <a href="#" class="text-gray-500 transition hover:opacity-75">
              Cookies
            </a>
          </li>
        </ul>

        <p class="text-xs text-gray-500">
          &copy; {{ new Date().getFullYear() }}. La Pasticciosa. All rights
          reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
