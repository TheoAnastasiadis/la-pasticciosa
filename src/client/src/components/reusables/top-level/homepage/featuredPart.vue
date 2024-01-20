<template>
  <div class="container py-8 lg:py-14">
    <div
      class="xt-row items-center relative"
      :class="{ 'flex-row-reverse': invertOrder }"
    >
      <img
        src="/whole.jpg"
        class="w-full md:w-5/12 object-cover absolute top-0 lg:top-auto saturate-50 z-[9] rounded-xl pointer-events-none shadow-xl"
        :class="{ 'left-0': !invertOrder, 'right-0': invertOrder }"
        ref="backgroundBackdrop"
      />
      <img
        src="/top_refined.png"
        class="w-full md:w-5/12 object-cover rounded-2xl z-10 relative top-0 saturate-50"
        ref="background"
      />

      <div class="w-full md:w-7/12 z-10">
        <div class="featured-content pt-16 md:pt-0 lg:pl-12">
          <div
            class="xt-h2 xl:xt-h1 mb-6 text-center md:text-left"
            :class="{
              'md:-translate-x-32': !invertOrder,
              'md:translate-x-52': invertOrder,
            }"
          >
            {{ title }}
          </div>
          <div class="leading-relaxed p-8">
            <p>
              <strong>{{
                content ? content.split(" ").splice(0, 2).join(" ") : ""
              }}</strong>
              {{ content ? content.split(" ").splice(2).join(" ") : "" }}
            </p>
            <div class="flex flex-col md:flex-row flex-wrap mb-2">
              <div
                v-for="keyword in keywords"
                class="text-black bg-white rounded-sm px-2.5 py-0.5 font-semibold mr-3 mb-2 overflow-hidden text-sm lg:text-base max-w-min"
              >
                #{{ keyword.split(" ").join("_") }}
              </div>
            </div>
            <a
              class="xt-button button--line px-0 text-xs font-medium leading-snug tracking-wider uppercase"
            >
              <span
                class="button--line-design absolute left-0 w-4 border-t border-current opacity-50"
              ></span>
              <span class="button--line-content pl-8"> ΖΗΤΗΣΤΕ ΠΡΟΣΦΟΡΑ </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref, type Ref } from "vue";

const { title, content, keywords, invertOrder } = defineProps<{
  title: string;
  content: string;
  keywords: string[];
  invertOrder?: boolean;
}>();

const background = ref({} as HTMLImageElement);
const backgroundBackdrop = ref({} as HTMLImageElement);

onMounted(() => {
  if (window.innerWidth > 768)
    gsap
      .timeline({
        scrollTrigger: {
          trigger: background.value,
          scrub: true,
          start: "top bottom",
          end: "center 75%",
        },
      })
      .fromTo(
        background.value,
        { x: invertOrder ? 50 : -50 },
        { x: invertOrder ? -50 : 50 },
        0,
      )
      .fromTo(
        backgroundBackdrop.value,
        { x: invertOrder ? 50 : -50 },
        { x: invertOrder ? -50 : 50 },
        0,
      );
  else
    gsap
      .timeline({
        scrollTrigger: {
          trigger: background.value,
          scrub: true,
          start: "top bottom",
          end: "top 30%",
        },
      })
      .fromTo(background.value, { x: invertOrder ? 50 : -50 }, { x: 0 }, 0)
      .fromTo(
        backgroundBackdrop.value,
        { x: invertOrder ? 50 : -50 },
        { x: 0 },
        0,
      );
});

defineExpose({ background });
</script>
