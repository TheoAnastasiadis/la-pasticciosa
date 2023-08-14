<template>
  <div
    class="w-full min-h-fit flex flex-col md:flex-row items-baseline justify-center d:justify-between py-4 px-10 absolute bottom-14 md:bottom-0 text-sm"
  >
    <div class="w-full md:w-9/12 flex justify-center md:justify-start">
      <span class="text-slate-400 mb-4 md:mb-0"
        >&copy; La Pasticciosa {{ new Date().getFullYear() }}</span
      >
    </div>
    <div class="w-full md:w-3/12 flex justify-items-end flex-col md:flex-row">
      <a
        href="#"
        class="text-slate-400 hover:text-slate-600 md:ml-auto text-center mb-2 md:mb-0"
        >Πολιτική Απορρήτου</a
      >
      <a
        href="#"
        class="text-slate-400 hover:text-slate-600 md:ml-auto text-center"
        >Προσωπικά Δεδομένα</a
      >
    </div>
  </div>
</template>
