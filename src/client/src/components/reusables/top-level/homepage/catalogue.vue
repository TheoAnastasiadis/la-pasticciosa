<template>
  <div class="block my-5 md:my-20 relative z-[9]">
    <div class="container">
      <div class="xt-row items-center">
        <div class="w-full z-10">
          <div class="featured-content pt-8 md:pt-0 md:pl-12">
            <div>
              <div
                class="text-lg font-semibold leading-7 text-primary-600 text-center md:text-left"
              >
                Εξερευνήστε τον κατάλογό μας
              </div>
              <div class="xt-h2 mt-2 mb-3 md:mb-6 text-center md:text-left">
                Περιγράψτε τις ανάγκες σας.
              </div>
            </div>
            <div class="flex flex-col md:flex-row mt-10" ref="catalogueExplore">
              <div class="w-full md:w-6/12 mb-8 md:mb-0">
                <div
                  class="m-auto rounded-full w-[80%] md:w-[50%] aspect-square bg-white shadow-xl shadow-slate-200"
                  ref="stage"
                >
                  <div class="relative top-full w-full text-center py-2">
                    Περιγραφή
                  </div>
                </div>
              </div>
              <div class="w-full md:w-6/12">
                <div
                  class="xt-card rounded-2xl text-gray-900 xt-links-default bg-gray-100 my-10 md:my-auto"
                >
                  <Form class="p-7 sm:p-9 text-base">
                    <div class="xt-h3">Επιλογές</div>
                    <label class="block mb-3 font-medium text-gray-700">
                      Είδος Ζυμαρικού
                    </label>
                    <select
                      class="block w-full xt-select rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-200 transition focus:bg-gray-300 focus:outline-none mb-2"
                      aria-label="Είδος Ζυμαρικού"
                    >
                      <option selected value="">Είδος Ζυμαρικού</option>
                      <option>Απλό</option>
                      <option>Γεμιστό</option>
                    </select>
                    <label class="block mb-3 font-medium text-gray-700">
                      Τύπος Πιάτου
                    </label>
                    <select
                      class="block w-full xt-select rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-200 transition focus:bg-gray-300 focus:outline-none mb-2"
                      aria-label="Είδος Ζυμαρικού"
                    >
                      <option selected value="">Είδος Ζυμαρικού</option>
                      <option>Απλό</option>
                      <option>Γεμιστό</option>
                    </select>
                    <p class="my-4">
                      💡 Lorem, ipsum dolor sit amet consectetur adipisicing
                      elit. Harum, sit officia? Eveniet corporis iusto eum
                      similique sunt sint, consectetur quod harum tempore ipsum
                      incidunt corrupti cum velit veritatis veniam praesentium.
                    </p>

                    <div class="w-ful">
                      <button
                        type="submit"
                        class="xt-button mx-auto py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-white bg-primary-500 transition hover:text-white hover:bg-primary-600 active:text-white active:bg-primary-700 on:text-white on:bg-primary-600 w-full"
                      >
                        ζητηστε προσφορα
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
