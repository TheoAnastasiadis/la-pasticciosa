<template>
  <requestOffer :open="offerForm" @close="offerForm = false" />
  <Pasta :step="step" ref="animated" />
  <Hero ref="hero" @requestOffer="offerForm = true" />
  <Featured ref="featured" />
  <Catalogue @requestOffer="offerForm = true" />
  <Platform />
  <Testimonials />
  <Contact />
</template>

<script setup lang="ts">
import Pasta from "../components/reusables/interactives/pasta.vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";
import Hero from "@/components/common/homepage/hero.vue";
import Featured from "@/components/common/homepage/featured.vue";
import Catalogue from "@/components/common/homepage/catalogue.vue";
import Platform from "@/components/common/homepage/platform.vue";
import Testimonials from "@/components/common/homepage/testimonials.vue";
import Contact from "@/components/common/homepage/contact.vue";
import RequestOffer from "@/components/common/homepage/requestOffer.vue";
import { onMounted, ref, type Ref } from "vue";

const offerForm = ref<boolean>(false);

gsap.registerPlugin(ScrollTrigger);
const step = ref(0);
const animated = ref<typeof Pasta>();
const hero = ref<typeof Hero>();
const featured = ref<typeof Featured>();

const setupAnimation = () => {
  // clear previous values
  const steps = [hero, ...featured.value?.steps];
  gsap.set(
    [
      steps[0].value.background,
      steps[1].value.background,
      steps[2].value.background,
      steps[3].value.background,
    ],
    { clearProps: "all" },
  );

  // calculate points
  const snappingPoints: Array<{ left: () => number; top: () => number }> =
    steps.map((step: Ref<{ background: HTMLElement }>, i) => ({
      left: () =>
        step.value.background.getBoundingClientRect().x +
        (step.value.background.getBoundingClientRect().width -
          animated.value?.element.getBoundingClientRect().width) /
          2,
      top: () =>
        window.scrollY +
        step.value.background.getBoundingClientRect().y +
        (step.value.background.getBoundingClientRect().height -
          animated.value?.element.getBoundingClientRect().height) /
          2,
    }));

  // 0th step
  gsap.timeline().set(animated.value?.element, {
    ...snappingPoints[0],
  });

  // 1st step
  gsap
    .timeline({
      scrollTrigger: {
        trigger: steps[0].value.background,
        start: "0% 20%",
        end: "50% 80%",
        scrub: 1,
        toggleActions: "play pause resume reset",
      },
    })
    .fromTo(
      animated.value?.element,
      {
        ...snappingPoints[0],
      },
      {
        ...snappingPoints[1],
        onComplete() {
          step.value = 1;
        },
      },
    );

  // 2nd step
  gsap
    .timeline({
      scrollTrigger: {
        trigger: steps[2].value.background,
        start: "0% 90%",
        end: "50% 80%",
        scrub: 1,
        toggleActions: "play pause resume reset",
      },
    })
    .set(animated.value?.element, {
      ...snappingPoints[1],
    })
    .to(animated.value?.element, {
      top: () => (window.innerWidth < 768 ? "" : "-=100"),
      left: () => (window.innerWidth < 768 ? "" : "+=100"),
    })
    .to(animated.value?.element, {
      ...snappingPoints[2],
      onComplete() {
        step.value = 2;
      },
    });

  // 3rd step
  gsap
    .timeline({
      scrollTrigger: {
        trigger: steps[3].value.background,
        start: "0% 55%",
        end: "50% 80%",
        scrub: 1,
        toggleActions: "play pause resume reset",
      },
    })
    .set(animated.value?.element, {
      ...snappingPoints[2],
    })
    .to(animated.value?.element, {
      top: () => (window.innerWidth < 768 ? "" : "-=100"),
      left: () => (window.innerWidth < 768 ? "" : "-=100"),
    })
    .to(animated.value?.element, {
      ...snappingPoints[3],
      onComplete() {
        step.value = 3;
      },
    });
};

onMounted(() => {
  const lenis = new Lenis({
    duration: 3,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    // @ts-expect-error type declarations are lacking
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
  });

  function raf(time: any) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  if (window.innerWidth > 756) {
    requestAnimationFrame(raf);
  }
  setupAnimation();
  window.addEventListener("resize", setupAnimation);
});
</script>
