<template>
  <div
    class="fixed w-screen h-screen py-10 px-3 md:px-5 bg-gradient-to-b from-transparent to-primary-600 bg-opacity-80 backdrop-blur-lg z-[9999]"
    v-if="open"
  >
    <div
      class="bg-slate-100 rounded-3xl shadow-xl w-full overflow-hidden mx-auto"
      style="max-width: 1000px"
    >
      <div class="md:flex md:items-stretch w-full relative">
        <button class="absolute top-0 right-0 p-5" @click="$emit('close')">
          <i class="h h-x text-xl"></i>
        </button>
        <img
          src="@/assets/request_offer_bg.jpeg"
          alt="Παρασκήνιο με φρέσκα ζυμαρικά"
          class="aspect-square object-cover hidden md:block w-1/2 bg-primary-500 overflow-hidden"
        />
        <div class="w-full md:w-1/2 py-6 md:py-10 px-5 md:px-10">
          <div class="text-center mb-10 mt-6 md:mt-0">
            <h1 class="font-bold text-3xl">Αίτηση Προσφοράς</h1>
            <p>Παρακαλούμε συμπληρώστε τα παρακάτω στοιχεία</p>
          </div>
          <div>
            <div class="flex -mx-3">
              <div class="w-1/2 px-1 md:px-3 mb-5">
                <label for="" class="text-xs font-semibold px-1">Όνομα</label>
                <div class="flex">
                  <div
                    class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                  ></div>
                  <input
                    type="text"
                    class="w-full -ml-10 px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-500"
                    placeholder="Γιώργος"
                  />
                </div>
              </div>
              <div class="w-1/2 px-1 md:px-3 mb-5">
                <label for="" class="text-xs font-semibold px-1">Επώνυμο</label>
                <div class="flex">
                  <div
                    class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                  ></div>
                  <input
                    type="text"
                    class="w-full -ml-10 px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-500"
                    placeholder="Παπαδόπουλος"
                  />
                </div>
              </div>
            </div>
            <div class="flex -mx-3">
              <div class="w-1/2 px-1 md:px-3 mb-5">
                <label for="" class="text-xs font-semibold px-1"
                  >Επωνυμία</label
                >
                <div class="flex">
                  <div
                    class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                  ></div>
                  <input
                    type="text"
                    class="w-full -ml-10 px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-500"
                    placeholder="Επιχείρηση"
                  />
                </div>
              </div>
              <div class="w-1/2 px-1 md:px-3 mb-5">
                <label for="" class="text-xs font-semibold px-1">ΑΦΜ</label>
                <div class="flex">
                  <div
                    class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                  ></div>
                  <input
                    type="text"
                    class="w-full -ml-10 px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-500"
                    placeholder="000000000"
                  />
                </div>
              </div>
            </div>
            <div class="flex -mx-3">
              <div class="w-full px-1 md:px-3 mb-12">
                <label for="" class="text-xs font-semibold px-1"
                  >Περιγράψτε τις ανάγκες σας</label
                >
                <div class="flex">
                  <div
                    class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"
                  ></div>
                  <textarea
                    type="text"
                    class="w-full -ml-10 px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-primary-500"
                    placeholder="Σύντομη Περιγραφή"
                  />
                </div>
              </div>
            </div>
            <div class="flex -mx-3">
              <div class="w-full px-1 md:px-3 mb-5">
                <button
                  class="block w-full max-w-xs mx-auto bg-primary-500 hover:bg-primary-700 focus:bg-primary-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  Λάβετε Προσφορά!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
const { open } = defineProps<{ open: boolean }>();
defineEmits(["close"]);
</script>
