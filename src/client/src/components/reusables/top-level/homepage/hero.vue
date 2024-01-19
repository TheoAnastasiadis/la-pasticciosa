<template>
  <div class="relative overflow-hidden -mt-5 z-[9]" ref="hero">
    <!-- weel -->
    <div
      class="rounded-full bg-slate-400 bg-opacity-50 w-[200px] md:w-[400px] aspect-square z-above absolute bottom-8 mb-12 md:top-1/4 left-[25%] md:left-[20%]"
      ref="background"
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        class="animate-spin-slow"
      >
        <path
          id="circlePath"
          fill="none"
          stroke-width="0"
          stroke="hsl(0 100% 50% / 0.5)"
          d="
          M 10, 50
          a 40,40 0 1,1 80,0
          a 40,40 0 1,1 -80,0
        "
        />
        <text id="text" font-size="5" fill="white" method="stretch">
          <textPath id="textPath" href="#circlePath">
            Πραγματικά 3D Scans από το εργαστήριο μας!
          </textPath>
        </text>
        <text id="text" font-size="5" fill="black" method="stretch">
          <textPath id="textPath" href="#circlePath" startOffset="55%">
            Εξερευνήστε τον κατάλογο μας.
          </textPath>
        </text>
      </svg>
    </div>
    <!-- background -->
    <div
      class="xt-media-container bg-gray-200 w-full h-full absolute pb-48 md:pb-0"
      id="hero_image"
    >
      <img
        class="xt-media object-cover"
        src="https://images.unsplash.com/photo-1565607052745-35f8c6ba59b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1864&q=80"
        loading="lazy"
        alt=""
      />
      <div
        class="absolute inset-0 bg-gradient-to-l from-primary-900 opacity-50"
      ></div>
    </div>
    <!-- content -->
    <div class="flex relative">
      <div
        class="relative px-8 py-48 md:pt-52 md:pb-12 md:px-24 mb-[200px] md:mb-[130px] md:my-auto mx-auto md:mr-0 max-w-2xl text-white xt-links-inverse text-center md:text-right group"
      >
        <h2 class="xt-h1 normal-case drop-shadow-md">
          Εξελίξτε το μενού σας με φρέσκα ζυμαρικά!
        </h2>
        <h3 class="xt-p drop-shadow-md text-lg tracking-normal">
          Με τα προϊόντα μας μπορείτε να δημιουργήσετε
          <span class="bg-primary-400 px-3 font-semibold"
            >ευφάνταστα πιάτα 🍝</span
          >
          που θα προσελκύσουν νέους πελάτες αλλά θα κάνουν και τους υπάρχοντες
          <span class="bg-primary-400 px-3 whitespace-nowrap font-semibold"
            >να έρχονται συχνότερα 😋.</span
          >
        </h3>
        <!-- <a
          href="/"
          class="xt-button py-2.5 px-3.5 text-xl rounded-lg font-extrabold leading-snug tracking-wider text-white drop-shadow-2xl underline hover:scale-110 transition-transform"
        >
          Ζητήστε προσφορά!
        </a> -->
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
import { ref, type Ref } from "vue";
const background = ref<HTMLDivElement>() as Ref<HTMLDivElement>;

defineExpose({ background });
</script>
