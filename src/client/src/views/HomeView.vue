<template>
  <Pasta :step="step" ref="animated" />
  <Hero />
  <Featured ref="featured" />
  <Catalogue />
  <Platform />
  <Contact />
</template>

<script setup lang="ts">
import Pasta from "../components/reusables/interactives/pasta.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";
import Hero from "../components/reusables/top-level/homepage/hero.vue";
import Featured from "../components/reusables/top-level/homepage/featured.vue";
import Catalogue from "../components/reusables/top-level/homepage/catalogue.vue";
import Platform from "../components/reusables/top-level/homepage/platform.vue";
import Contact from "../components/reusables/top-level/homepage/contact.vue";
import { onMounted, ref } from "vue";

gsap.registerPlugin(ScrollTrigger);
const step = ref(0);
const animated = ref<typeof Pasta>();
const featured = ref<typeof Featured>();

onMounted(() => {
  const lenis = new Lenis({
    duration: 2,
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

  // // first featured banners animation
  // gsap
  //   .timeline({ scrollTrigger: { trigger: banner1, start: "top center" } })
  //   .from(banner1, { opacity: 0, duration: 6 }, 0)
  //   .to(
  //     banner1,
  //     {
  //       x: -banner1.offsetWidth / 6,
  //       repeat: -1,
  //       duration: 5,
  //       ease: "linear",
  //     },
  //     0,
  //   )
  //   .from(banner2, { opacity: 0, duration: 6 }, 0)
  //   .to(
  //     banner2,
  //     {
  //       x: -banner2.offsetWidth / 6,
  //       repeat: -1,
  //       duration: 15,
  //       ease: "linear",
  //     },
  //     0,
  //   )
  //   .from(banner3, { opacity: 0, duration: 3 }, 1)
  //   .to(
  //     banner3,
  //     {
  //       x: -banner3.offsetWidth / 6,
  //       repeat: -1,
  //       duration: 10,
  //       ease: "linear",
  //     },
  //     0,
  //   );

  // // first featured background animation
  // gsap
  //   .timeline({
  //     scrollTrigger: {
  //       trigger: firstFeatured,
  //       scrub: true,
  //     },
  //   })
  //   .fromTo(firstbg, { x: -100, y: -100 }, { x: 50, y: 50 }, 0)
  //   .fromTo(firstbgCover, { x: -100, y: -100 }, { x: 50, y: 50 }, 0);

  // // second featured video animation
  // gsap
  //   .timeline({ scrollTrigger: { trigger: secondFeatured }, repeat: -1 })
  //   .to(
  //     videoBanner1,
  //     { x: -videoBanner1.offsetWidth / 2, duration: 8, ease: "linear" },
  //     0,
  //   )
  //   .to(
  //     videoBanner2,
  //     { x: +videoBanner2.offsetWidth / 2, duration: 8, ease: "linear" },
  //     0,
  //   );

  // // wireframe animation
  // gsap
  //   .timeline({ scrollTrigger: { trigger: thirdFeatured, scrub: true } })
  //   .fromTo(wireframe, { rotateX: -5 }, { rotateX: 15 });

  // // catalogue explore animation
  // gsap.from(stage, {
  //   scale: 0,
  //   duration: 2,
  //   scrollTrigger: {
  //     trigger: catalogueExplore,
  //   },
  // });

  // // animated pasta
  const firstFeaturedPosition = {
    left:
      featured.value?.elements[0].value.getBoundingClientRect().left +
      (featured.value?.elements[0].value.offsetWidth -
        animated.value?.getWidth()) /
        2,
    top:
      featured.value?.elements[0].value.getBoundingClientRect().top +
      window.scrollY +
      (featured.value?.elements[0].value.offsetHeight -
        animated.value?.getHeight()) /
        2,
  };

  // const secondFeaturedPosition = {
  //   left:
  //     secondFeatured.getBoundingClientRect().left +
  //     (firstFeatured.offsetWidth - animated.offsetWidth) / 2,
  //   top:
  //     secondFeatured.getBoundingClientRect().top +
  //     window.scrollY +
  //     (secondFeatured.offsetHeight - animated.offsetHeight) / 2,
  // };

  // const thirdFeaturedPosition = {
  //   left:
  //     thirdFeatured.getBoundingClientRect().left +
  //     (firstFeatured.offsetWidth - animated.offsetWidth) / 2,
  //   top:
  //     thirdFeatured.getBoundingClientRect().top +
  //     window.scrollY +
  //     (thirdFeatured.offsetHeight - animated.offsetHeight) / 2,
  // };

  gsap.to(animated.value?.element, {
    ...firstFeaturedPosition,
    duration: 1,
  });

  // gsap.timeline().fromTo(animated, previewPosition, {
  //   ...firstFeaturedPosition,
  //   scrollTrigger: {
  //     trigger: firstFeatured,
  //     start: "top bottom",
  //     end: "25% center",
  //     toggleActions: "play pause resume reset",
  //     scrub: 0.5,
  //     markers: false,
  //   },
  //   onComplete: () => {
  //     this.step = 1;
  //   },
  //   onReverseComplete: () => {
  //     this.step = 0;
  //   },
  // });

  // gsap.timeline({}).fromTo(animated, firstFeaturedPosition, {
  //   ...secondFeaturedPosition,
  //   scrollTrigger: {
  //     trigger: secondFeatured,
  //     start: "top center",
  //     end: "20% center",
  //     toggleActions: "play pause resume reset",
  //     scrub: 0.5,
  //     markers: false,
  //   },
  //   onComplete: () => {
  //     this.step = 2;
  //   },
  //   onReverseComplete: () => {
  //     this.step = 1;
  //   },
  // });

  // gsap.timeline({}).fromTo(animated, secondFeaturedPosition, {
  //   ...thirdFeaturedPosition,
  //   scrollTrigger: {
  //     trigger: thirdFeatured,
  //     start: "top center",
  //     end: "20% center",
  //     toggleActions: "play pause resume reset",
  //     scrub: 0.5,
  //     markers: false,
  //   },
  //   onComplete: () => {
  //     this.step = 3;
  //   },
  //   onReverseComplete: () => {
  //     this.step = 2;
  //   },
  // });
});
</script>
