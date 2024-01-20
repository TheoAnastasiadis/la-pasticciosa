<template>
  <div
    class="relative -mt-5 mb-14 z-[9] flex flex-auto flex-wrap-reverse lg:h-[100vh] w-full overflow-hidden"
    ref="hero"
  >
    <!-- weel -->
    <div
      class="w-full lg:w-1/2 h-full min-h-[50vh] flex justify-end items-center relative bg-transparent"
    >
      <div
        class="absolute h-[100px] w-[100px] bg-[url(https://media.istockphoto.com/id/1295107021/vector/sketchy-background-with-brush-stroke-lines-waves-and-dots.jpg?s=612x612&w=0&k=20&c=-xZpXoXEDSqt2WJn-VGsBPK9IESa-bFx1dWe4ZJbCN8=)] rounded-2xl z-below"
        ref="block"
      ></div>
      <div class="absolute w-[100px] h-[100px] bg-white rounded-xl" ref="img1">
        <img
          src="https://houseofnasheats.com/wp-content/uploads/2023/07/How-to-Make-Homemade-Pasta-Square-2.jpg"
          class="w-full h-full translate-y-2.5 -translate-x-2.5 border border-green-50 rounded-xl object-cover drop-shadow-sm"
        />
      </div>
      <div class="absolute w-[100px] h-[100px] bg-white rounded-xl" ref="img2">
        <img
          src="https://assets.bonappetit.com/photos/62e8025f029c78e6c977d32c/1:1/w_2560%2Cc_limit/2022-VG-BA-PASTA-Buttered-Tomatoes-12671.jpg"
          class="w-full h-full -translate-y-2.5 translate-x-2.5 border border-green-50 rounded-xl object-cover drop-shadow-sm"
        />
      </div>
      <div
        class="absolute w-[200px] h-[200px] border-red-500"
        ref="background"
      ></div>
    </div>
    <!-- content -->
    <div class="flex relative w-full lg:w-1/2 h-full">
      <div
        class="relative px-8 py-48 md:pt-52 md:pb-12 md:pl-[30%] lg:px-24 md:my-auto mx-auto md:mr-5 max-w-2xl text-black xt-links-inverse text-center md:text-right group"
      >
        <h2 class="xt-h2 xl:xt-h1 normal-case drop-shadow-md">
          Εξελίξτε το μενού σας με φρέσκα ζυμαρικά!
        </h2>
        <h3 class="xt-p drop-shadow-md text-lg tracking-normal">
          Με τα προϊόντα μας μπορείτε να δημιουργήσετε
          <span class="bg-primary-400 px-3 font-semibold whitespace-nowrap"
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
import { onMounted, ref, type Ref } from "vue";
import gsap from "gsap";

const background = ref<HTMLDivElement>() as Ref<HTMLDivElement>;
const block = ref<HTMLDivElement>() as Ref<HTMLDivElement>;
const img1 = ref<HTMLDivElement>() as Ref<HTMLDivElement>;
const img2 = ref<HTMLDivElement>() as Ref<HTMLDivElement>;

onMounted(() => {
  if (window.innerWidth < 768) {
  } else if (window.innerWidth >= 1024) {
    gsap
      .timeline()
      .set(block.value, { height: 500, width: 400, top: 100, right: -20 })
      .set(img1.value, { height: 250, width: 400, top: 120, right: -150 })
      .set(img2.value, { height: 400, width: 300, top: 300, right: 300 })
      .set(background.value, { top: "+=150", right: "+=150" });

    // gsap
    //   .timeline({ repeat: -1, defaults: { duration: 10 } })
    //   .fromTo(img1.value, { x: "-=20" }, { x: "+=20" }, 0)
    //   .to(img1.value, { x: "-=20" }, 1)
    //   .fromTo(img2.value, { y: "+=20" }, { y: "-=20" }, 0)
    //   .to(img2.value, { y: "+=20" }, 1);
  } else {
  }
});

defineExpose({ background });
</script>
