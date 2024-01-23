<template>
  <div
    class="relative -mt-5 pt-28 lg:pt-0 mb-14 z-[9] flex flex-auto flex-wrap lg:flex-row-reverse w-full lg:min-h-screen overflow-hidden"
    ref="hero"
  >
    <!-- content -->
    <div
      class="flex relative w-full lg:w-1/2 self-center px-10 md:px-20 mb-36 md:mb-36 lg:mb-0 lg:-order-1"
    >
      <div
        class="relative text-black xt-links-inverse text-center md:text-right group"
      >
        <h2 class="text-4xl font-bold normal-case drop-shadow-sm mb-3">
          Εξελίξτε το μενού σας με φρέσκα ζυμαρικά!
        </h2>
        <h3 class="xt-p drop-shadow-sm text-lg tracking-normal">
          Με τα προϊόντα μας μπορείτε να δημιουργήσετε
          <span class="bg-primary-400 px-3 font-semibold whitespace-nowrap"
            >ευφάνταστα πιάτα 🍝</span
          >
          που θα προσελκύσουν νέους πελάτες αλλά θα κάνουν και τους υπάρχοντες
          <span class="bg-primary-400 px-3 whitespace-nowrap font-semibold"
            >να έρχονται συχνότερα 😋.</span
          >
        </h3>
        <button
          href="/"
          class="xt-button px-5 py-3 rounded-md border-2 font-bold text-primary-700 border-primary-700 shadow-sm hover:shadow-xl hover:bg-slate-100"
        >
          Ζητήστε προσφορά!&nbsp;
          <i class="h h-award text-lg"></i>
        </button>
      </div>
    </div>
    <!-- images -->
    <div
      class="w-full lg:w-1/2 self-center min-h-[50vh] flex justify-end items-center relative bg-transparent"
    >
      <div
        class="absolute h-[100px] w-[100px] bg-[url(https://i.pinimg.com/474x/53/90/77/539077600d93d1c9aa7e4eb2bf7dacdd.jpg)] bg-blend-darken rounded-2xl z-below"
        ref="block"
      ></div>
      <div
        class="absolute w-[100px] h-[100px] border-2 border-dashed border-primary-600 border-spacing-7 rounded-xl"
        ref="img1"
      >
        <img
          src="/hero/1.jpg"
          class="w-full h-full translate-y-2.5 -translate-x-2.5 border border-green-50 rounded-xl object-cover drop-shadow-xl"
        />
      </div>
      <div
        class="absolute w-[100px] h-[100px] border-2 border-dashed border-orange-400 rounded-xl"
        ref="img2"
      >
        <img
          src="/hero/2.jpg"
          class="w-full h-full -translate-y-2.5 translate-x-2.5 border border-green-50 rounded-xl object-cover drop-shadow-sm"
        />
      </div>
      <div
        class="absolute w-[200px] h-[200px] border-red-500"
        ref="background"
      ></div>
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
import { onMounted, ref, type Ref } from "vue";
import gsap from "gsap";

const background = ref<HTMLDivElement>() as Ref<HTMLDivElement>;
const block = ref<HTMLDivElement>() as Ref<HTMLDivElement>;
const img1 = ref<HTMLDivElement>() as Ref<HTMLDivElement>;
const img2 = ref<HTMLDivElement>() as Ref<HTMLDivElement>;

const setupCollection = () => {
  gsap.set([block.value, img1.value, img2.value, background.value], {
    clearProps: "all",
  });
  if (window.innerWidth < 768) {
    gsap
      .timeline()
      .set(block.value, { height: 200, width: 300, top: 0, right: 30 })
      .set(img1.value, { height: 150, width: 200, top: -100, right: 10 })
      .set(img2.value, { height: 150, width: 200, top: 150, right: 170 })
      .set(background.value, { top: "-=100", right: "+=150" });
  } else if (window.innerWidth >= 1024) {
    gsap
      .timeline()
      .set(block.value, { height: 500, width: 400, top: -50, right: "10%" })
      .set(img1.value, { height: 200, width: 300, top: -50, right: -50 })
      .set(img2.value, { height: 300, width: 200, top: 130, left: 30 })
      .set(background.value, { top: "+=130", right: "+=30" });
  } else {
    gsap
      .timeline()
      .set(block.value, { height: 300, width: 400, bottom: 10, left: 50 })
      .set(img1.value, { height: 150, width: 250, top: -50, left: 150 })
      .set(img2.value, { height: 150, width: 250, bottom: 25, left: 10 })
      .set(background.value, { right: "+=250", top: "+=50" });
  }
};

onMounted(setupCollection);
window.addEventListener("resize", setupCollection);

defineExpose({ background });
</script>
