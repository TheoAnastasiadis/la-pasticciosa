<template>
  <div ref="animated" class="absolute top-[25vh] left-[25vw] z-10">
    <div class="relative top-0 left-0 w-[200px] md:w-[400px] aspect-square">
      <canvas width="100%" height="100%" ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { Application, SPEObject } from "@splinetool/runtime";
import { onMounted, ref, toRef, watch } from "vue";

const props = defineProps<{ step: number }>();
const canvas = ref<HTMLCanvasElement>({} as HTMLCanvasElement);
const animated = ref<HTMLDivElement>({} as HTMLDivElement);
let rotation: gsap.core.Timeline;
let bounce: gsap.core.Timeline;

onMounted(async () => {
  const spline = new Application(canvas.value);
  await spline.load(
    "https://prod.spline.design/fgM-dsEgPqlVVRXh/scene.splinecode",
  );
  const pasta = spline.findObjectById(
    "806f3f16-5bc8-4ae2-8b4b-3531be43a40c",
  ) as SPEObject;
  gsap.set(pasta.rotation as any, { x: 0, y: 0, z: 0 });

  rotation = gsap.timeline({ paused: true }).to(pasta.rotation as any, {
    x: 0,
    y: Math.PI * 4,
    z: 0,
    repeat: -1,
    duration: 30,
  });

  bounce = gsap
    .timeline({ paused: true, repeat: -1, defaults: { duration: 0.5 } })
    .to(pasta.position, { y: 10 })
    .to(pasta.position, { y: 0 });
});

watch(toRef(props, "step"), (value) => {
  console.log(value);
  switch (value) {
    case 1:
      rotation.pause();
      // bounce.play();
      break;

    default:
      rotation.play();
      bounce.pause();
      break;
  }
});

defineExpose({
  getWidth() {
    return animated.value.offsetWidth;
  },
  getHeight() {
    return animated.value.offsetHeight;
  },
  element: animated,
});
</script>
