<template>
  <div class="absolute top-5 left-0 px-5 w-full z-sticky">
    <nav
      class="container rounded-3xl w-full bg-white shadow-sm px-5 py-3 flex flex-row"
    >
      <div>
        <h1 class="text-xl uppercase font-bold mr-10 tracking-wider">
          <span class="text-primary-500">L</span>a
          <span class="text-primary-500">P</span>asticciosa
        </h1>
      </div>
      <div class="menu-item"><a href="#">Προϊόντα</a></div>
      <div class="menu-item"><a href="#">Παραγωγή</a></div>
      <div class="menu-item"><a href="#">Διανομή</a></div>
      <div class="menu-item"><a href="#">Επικοινωνία</a></div>
      <div class="flex-grow"></div>
      <div class="menu-item">ελ <i class="h h-chevrons-down text-sm"></i></div>
      <div class="menu-item">
        <div class="rounded-full border-primary-600 border pl-1 w-6 h-6">
          <i class="h h-power text-sm -translate-y-[0.5px]"></i>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.menu-item {
  @apply mr-6 font-semibold tracking-wide;
}
.menu-item > a {
  @apply no-underline text-slate-900 hover:text-primary-500 hover:tracking-wider;
}
</style>
