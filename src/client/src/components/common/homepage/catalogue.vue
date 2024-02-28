<template>
  <section class="container my-16">
    <div class="xt-row items-center mb-10">
      <div class="w-full z-10">
        <div class="featured-content pt-8 md:pt-0">
          <div>
            <div
              class="text-lg font-semibold leading-7 text-primary-600 text-center md:text-left"
            >
              Εξερευνήστε τον κατάλογό μας
            </div>
            <div class="xt-h2 mt-2 mb-3 md:mb-6 text-center md:text-left">
              Ζυμαρικά για κάθε γαστρονομική ανάγκη!
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap md:-m-2 -m-1">
      <div class="flex flex-wrap w-1/2">
        <div class="md:p-2 p-1 w-1/2">
          <img
            alt="gallery"
            class="w-full object-cover h-full object-center block"
            src="@/assets/gallery/1.webp"
            width="500"
            height="300"
          />
        </div>
        <div class="md:p-2 p-1 w-1/2">
          <img
            alt="gallery"
            class="w-full object-cover h-full object-center block"
            src="@/assets/gallery/2.jpg"
            width="501"
            height="301"
          />
        </div>
        <div class="md:p-2 p-1 w-full">
          <img
            alt="gallery"
            class="w-full h-full object-cover object-center block"
            src="@/assets/gallery/3.jpg"
            width="600"
            height="360"
          />
        </div>
      </div>
      <div class="flex flex-wrap w-1/2">
        <div class="md:p-2 p-1 w-full">
          <img
            alt="gallery"
            class="w-full h-full object-cover object-center block"
            src="@/assets/gallery/4.jpg"
            width="601"
            height="361"
          />
        </div>
        <div class="md:p-2 p-1 w-1/2">
          <img
            alt="gallery"
            class="w-full object-cover h-full object-center block"
            src="@/assets/gallery/5.jpg"
            width="502"
            height="302"
          />
        </div>
        <div class="md:p-2 p-1 w-1/2">
          <img
            alt="gallery"
            class="w-full object-cover h-full object-center block"
            src="@/assets/gallery/6.jpg"
            width="503"
            height="303"
          />
        </div>
      </div>
    </div>
    <section>
      <div
        class="container mx-auto flex px-5 pt-16 items-center justify-center flex-col"
      >
        <div class="text-center lg:w-2/3 w-full">
          <h1 class="sm:text-4xl text-3xl mb-4 font-medium">
            Περιγράψτε τις ανάγκες σας
          </h1>
          <p class="mb-8 leading-relaxed">
            Επικοινωνήστε μέσω της παρακάτω φόρμας και θα βρούμε μαζί την λύση
            χειροποίητων ζυμαρικών που ταιριάζει στο μενού και την επιχείρησή
            σας.
          </p>
          <div class="flex justify-center">
            <button
              class="bg-primary-600 text-base xl:text-lg rounded-md border-2 border-primary-700 text-white px-4 py-2 text-bold hover:shadow-2xl hover:scale-105 shadow-xl transition-transform"
              @click="$emit('requestOffer')"
            >
              ΣΥΜΠΛΗΡΩΣΤΕ ΤΗΝ ΦΟΡΜΑ
              <i class="h h-cake text-lg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
defineEmits(["requestOffer"]);
</script>
