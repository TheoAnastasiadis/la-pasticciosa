<template>
  <Pasta :step="step" ref="animated" />
  <Hero ref="hero" />
  <Featured ref="featured" />
  <Catalogue />
  <Platform />
  <Contact />
</template>

<script setup lang="ts">
import Pasta from "../components/reusables/interactives/pasta.vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";
import Hero from "../components/reusables/top-level/homepage/hero.vue";
import Featured from "../components/reusables/top-level/homepage/featured.vue";
import Catalogue from "../components/reusables/top-level/homepage/catalogue.vue";
import Platform from "../components/reusables/top-level/homepage/platform.vue";
import Contact from "../components/reusables/top-level/homepage/contact.vue";
import { onMounted, ref, type Ref } from "vue";

gsap.registerPlugin(ScrollTrigger);
const step = ref(0);
const animated = ref<typeof Pasta>();
const hero = ref<typeof Hero>();
const featured = ref<typeof Featured>();

onMounted(() => {
  const lenis = new Lenis({
    duration: 3,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    // @ts-expect-error type declarations are lacking
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time: any) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  console.log(featured.value);

  const steps = [hero, ...featured.value?.steps];

  const snappingPoints: { left: number; top: () => number }[] = steps.map(
    (step: Ref<{ background: HTMLElement }>, i) => ({
      left:
        window.innerWidth < 768
          ? animated.value?.element.getBoundingClientRect().width / 2
          : step.value.background.getBoundingClientRect().left +
            (step.value.background.getBoundingClientRect().width -
              animated.value?.element.getBoundingClientRect().width) /
              2 +
            [0, 50, -50, 50][i],
      top: () =>
        window.scrollY +
        step.value.background.getBoundingClientRect().y +
        (step.value.background.getBoundingClientRect().height -
          animated.value?.element.getBoundingClientRect().height) /
          2,
    }),
  );

  // 0th step
  gsap.timeline({}).set(animated.value?.element, {
    ...snappingPoints[0],
  });

  // 1st step
  gsap
    .timeline({
      scrollTrigger: {
        trigger: steps[1].value.background,
        start: "0% bottom",
        end: "50% 80%",
        scrub: 1,
        toggleActions: "play pause resume reset",
      },
    })
    .set(animated.value?.element, {
      ...snappingPoints[0],
    })
    .to(animated.value?.element, {
      ...snappingPoints[1],
      onComplete() {
        step.value = 1;
      },
    });

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
});
</script>
