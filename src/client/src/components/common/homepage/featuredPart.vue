<template>
  <section class="mb-5">
    <div
      class="flex flex-col md:flex-row items-center px-5 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8"
      :class="{ 'md:flex-row-reverse': invertOrder }"
    >
      <div
        ref="background"
        class="rounded-xl h-56 xl:h-60 w-full md:w-7/12 overflow-hidden"
      >
        <img
          :src="img"
          :alt="title + ' φωογραφία'"
          class="w-full h-full object-cover saturate-[80%]"
        />
      </div>
      <div
        class="flex flex-col w-full max-w-3xl mx-auto prose text-left prose-blue"
        :class="{ 'md:mr-8': invertOrder, 'md:ml-8': !invertOrder }"
      >
        <div class="w-full mx-auto pt-3 md:pt-0">
          <h2>{{ title }}</h2>
          <p>
            {{ content }}
          </p>
          <p class="flex flex-row flex-wrap w-full">
            <span
              v-for="keyword in keywords"
              :key="keyword"
              class="whitespace-nowrap rounded-full bg-primary-100 px-3 py-2 text-sm text-primary-700 font-semibold mr-3 mb-3"
            >
              {{ keyword }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref, type Ref } from "vue";

const { title, content, keywords, invertOrder, img } = defineProps<{
  title: string;
  content: string;
  keywords: string[];
  img: string;
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
      .from(background.value, { x: invertOrder ? 50 : -50 }, 0)
      .from(backgroundBackdrop.value, { x: invertOrder ? 50 : -50 }, 0);
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
      .from(background.value, { x: invertOrder ? 50 : -50 }, 0)
      .from(backgroundBackdrop.value, { x: invertOrder ? 50 : -50 }, 0);
});

defineExpose({ background });
</script>
