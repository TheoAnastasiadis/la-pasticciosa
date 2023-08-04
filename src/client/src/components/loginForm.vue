<template>
  <div class="demo--form-variant-primary">
    <div
      class="xt-card flex-auto w-12/12 md:w-6/12 mx-auto p-7 sm:p-9 text-base rounded-2xl text-white xt-links-inverse bg-primary-500"
    >
      <h3>Συμπληρώστε τα στοιχεία σας</h3>
      <form class="text-sm">
        <div class="xt-row xt-row-x-10 xt-row-y-5">
          <div class="w-full">
            <label class="block mb-3 font-medium text-white">
              Όνομα Χρήστη
            </label>
            <input
              type="text"
              class="block w-full rounded-md py-2.5 px-3.5 text-white placeholder-white placeholder-opacity-75 bg-primary-800 bg-opacity-25 transition focus:bg-opacity-50 focus:outline-none"
              aria-label="Username"
              placeholder="όνομα χρήστη"
            />
          </div>
          <div class="w-full">
            <label class="block mb-3 font-medium text-white">
              Κωδικός Πρόσβασης
            </label>
            <input
              type="password"
              class="block w-full rounded-md py-2.5 px-3.5 text-white placeholder-white placeholder-opacity-75 bg-primary-800 bg-opacity-25 transition focus:bg-opacity-50 focus:outline-none"
              aria-label="Password"
              placeholder="κωδικός πρόσβασης"
            />
          </div>
          <div class="w-full">
            <button
              type="submit"
              class="xt-button mt-2 py-2.5 px-3.5 w-full text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-gray-900 bg-gray-100 transition hover:bg-gray-200 active:bg-gray-300 on:bg-gray-200"
            >
              ΣΥΝΔΕΣΗ &nbsp;
              <i class="h h-login text-xl"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.demo--form-variant-primary > .xt-select {
  /* for colors use %23 instead of # */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
}
</style>
