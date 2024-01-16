<template>
  <div class="relative overflow-hidden -mt-5 z-[9]" ref="hero">
    <div class="absolute top-1/2 md:pl-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48px"
        height="24px"
        viewBox="0 0 24 24"
        class="fill-slate-200"
      >
        <path
          d="M5.70711 16.1359C5.31659 16.5264 5.31659 17.1596 5.70711 17.5501L10.5993 22.4375C11.3805 23.2179 12.6463 23.2176 13.4271 22.4369L18.3174 17.5465C18.708 17.156 18.708 16.5228 18.3174 16.1323C17.9269 15.7418 17.2937 15.7418 16.9032 16.1323L12.7176 20.3179C12.3271 20.7085 11.6939 20.7085 11.3034 20.3179L7.12132 16.1359C6.7308 15.7454 6.09763 15.7454 5.70711 16.1359Z"
        />
        <path
          d="M18.3174 7.88675C18.708 7.49623 18.708 6.86307 18.3174 6.47254L13.4252 1.58509C12.644 0.804698 11.3783 0.805008 10.5975 1.58579L5.70711 6.47615C5.31658 6.86667 5.31658 7.49984 5.70711 7.89036C6.09763 8.28089 6.7308 8.28089 7.12132 7.89036L11.307 3.70472C11.6975 3.31419 12.3307 3.31419 12.7212 3.70472L16.9032 7.88675C17.2937 8.27728 17.9269 8.27728 18.3174 7.88675Z"
        />
      </svg>
    </div>
    <div
      class="rounded-full bg-slate-400 bg-opacity-50 w-[200px] md:w-[400px] aspect-square z-above absolute bottom-8 md:top-1/4 left-[20%]"
      ref="preview"
    >
      <div
        class="w-full flex flex-row justify-between px-24 text-xl absolute top-1/2"
      >
        <div class="-translate-x-32 md:-translate-x-36">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            height="1.75rem"
            width="1.75rem"
            version="1.1"
            id="XMLID_287_"
            viewBox="0 0 24 24"
            xml:space="preserve"
            class="fill-white hover:fill-primary-600 rotate-180"
          >
            <g id="next">
              <g>
                <polygon
                  points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12   "
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="translate-x-20 md:translate-x-36">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            height="1.75rem"
            width="1.75rem"
            version="1.1"
            id="XMLID_287_"
            viewBox="0 0 24 24"
            xml:space="preserve"
            class="fill-white hover:fill-primary-600"
          >
            <g id="next">
              <g>
                <polygon
                  points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12   "
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
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
        class="absolute inset-0 bg-gradient-to-l from-primary-700 opacity-50"
      ></div>
    </div>
    <div class="flex relative min-h-screen">
      <div
        class="relative px-8 py-16 md:px-24 lg:py-20 xl:py-24 mt-[100px] mb-[200px] md:my-auto mx-auto md:mr-0 max-w-2xl text-white xt-links-inverse text-center md:text-right group"
      >
        <h2 class="xt-h1 normal-case">
          Εξελίξτε το μενού σας με φρέσκα ζυμαρικά!
        </h2>
        <h3 class="xt-p">
          Με τα προϊόντα μας μπορείτε να δημιουργήσετε ευφάνταστα πιάτα που θα
          προσελκύσουν νέους πελάτες αλλά θα κάνουν και τους υπάρχοντες να
          έρχονται συχνότερα.
        </h3>
        <a
          href="/"
          class="xt-button py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-white bg-primary-500 transition hover:text-white hover:bg-primary-600 active:text-white active:bg-primary-700 on:text-white on:bg-primary-600"
        >
          Ζητηστε προσφορα
        </a>
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

const heroElement = ref<HTMLDivElement>() as Ref<HTMLDivElement>;
const previewSpace = ref<HTMLDivElement>() as Ref<HTMLDivElement>;

const getPreviewCentre = (animated: HTMLElement) => ({
  left:
    previewSpace.value.getBoundingClientRect().left +
    (previewSpace.value.offsetWidth - animated.offsetWidth) / 2,
  top:
    previewSpace.value.getBoundingClientRect().top +
    window.scrollY +
    (previewSpace.offsetHeight - animated.offsetHeight) / 2,
});

defineExpose({ getPreviewCentre });
</script>
