<template>
  <div
    class="w-screen min-h-screen flex flex-col-reverse md:flex-row justify-evenly items-center pt-28 md:pt-0 space-y-6 md:space-y-0"
  >
    <div
      class="w-full md:w-4/12 xl:w-3/12 flex flex-col md:min-h-screen justify-start md:justify-center space-y-5 pr-10 md:pr-0 py-16 md:py-0"
    >
      <button
        href="#"
        v-for="plate in previewPlates"
        :key="plate.id"
        class="block rounded-r-full h-28 shadow-2xl relative hover:-translate-y-5 transition-all cursor-pointer"
        @click="
          previewPlates = previewPlates.map((p) => {
            p.id == plate.id ? (p.active = true) : (p.active = false);
            return p;
          })
        "
        :class="{
          '-translate-x-10': plate.id == 1,
          'bg-primary-400 shadow-primary-400': plate.active,
          'bg-white': !plate.active,
        }"
      >
        <div
          class="absolute top-0 left-0 w-1/2 py-3 px-4 xl:px-2 xl:pl-4 h-full flex flex-row items-center"
          :class="{ 'translate-x-10': plate.id == 1 }"
        >
          <p
            class="text-base xl:text-lg tracking-tight leading-tight text-start"
          >
            {{ plate.title }}
          </p>
        </div>
        <img
          :src="plate.image"
          :alt="plate.title"
          class="absolute right-3 top-1.5 h-[6.25rem] aspect-square rounded-full border-2 object-cover"
          :class="{
            'border-white': plate.active,
            'border-primary-400': !plate.active,
          }"
        />
      </button>
    </div>
    <div
      class="w-full md:w-4/12 flex flex-col justify-center items-center relative"
    >
      <img
        :src="previewPlates.filter((p) => p.active)[0].image"
        :alt="previewPlates.filter((p) => p.active)[0].title"
        class="aspect-square w-[85%] rounded-full shadow-2xl shadow-primary-600 object-cover"
      />
      <div
        ref="background"
        class="absolute bottom-10 right-[15%] border-red-600 w-[100px] h-[100px]"
      ></div>
    </div>
    <div class="w-full md:w-4/12 xl:w-5/12 pl-6 pr-10 xl:px-10">
      <sup
        class="md:hidden m-0 text-slate-500 bold tracking-widest text-center uppercase w-full inline-block"
        >La Pasticciosa</sup
      >
      <h1
        class="normal-case xt-h1 text-4xl md:text-3xl xl:text-5xl text-center md:text-left mt-0 md:mt-auto"
      >
        Εξελίξτε το μενού σας με φρέσκα ζυμαρικά!
      </h1>
      <sub class="text-base xl:text-lg"
        >Με τα προϊόντα μας μπορείτε να δημιουργήσετε ευφάνταστα πιάτα 🍝 που θα
        προσελκύσουν νέους πελάτες αλλά θα κάνουν και τους υπάρχοντες να
        έρχονται συχνότερα 😋.</sub
      >
      <div
        class="flex flex-col xl:flex-row xl:space-x-5 space-y-5 xl:space-y-0 pt-10"
      >
        <button
          class="bg-primary-500 text-base xl:text-lg rounded-2xl border-2 border-primary-600 text-white px-4 py-2 text-bold hover:shadow-2xl hover:scale-105 shadow-xl transition-transform"
        >
          Ζητήστε Προσφορά
          <i class="h h-cake text-lg" />
        </button>
        <button
          class="text-base xl:text-lg rounded-2xl border-2 border-slate-700 text-slate-800 px-4 py-2 hover:shadow-2xl hover:scale-105 shadow-xl transition-transform mt-0 ml-0"
        >
          Μάθετε Περισσότερα
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#hero_image:after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(127, 127, 127, 0.5);
  background-image: radial-gradient(rgba(0, 0, 0, 0.3) 10%, transparent 33%);
  background-size: 6px 6px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";

const previewPlates = ref([
  {
    id: 0,
    title: "Fagottini με κατσικίσιο τυρί",
    active: true,
    image:
      "https://www.the-pasta-project.com/wp-content/uploads/Homemade-fagottini-pasta-2-ways-8.jpg",
  },
  {
    id: 1,
    title: "Παπαρδέλες, κομμένες στο χέρι",
    active: false,
    image:
      "https://vikalinka.com/wp-content/uploads/2023/03/Tuscan-ragu-12-Edit.jpg",
  },
  {
    id: 2,
    title: "Ravioli με κολοκύθα και πικραμύγδαλο",
    active: false,
    image:
      "https://cucinapro.com/cdn/shop/products/RD-CCP-135-10-49_1800x1800.jpg?v=1654032923",
  },
]);
const background = ref<HTMLDivElement>();

defineExpose({ background });
</script>
