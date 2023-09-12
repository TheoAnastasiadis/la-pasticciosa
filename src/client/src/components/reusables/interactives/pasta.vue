<template>
  <div class="static">
    <div class="relative top-0 left-0 w-[200px] md:w-[400px] aspect-square">
      <canvas width="100%" height="100%" ref="canvas"></canvas>
      <div class="w-full text-center -translate-y-28 text-sm text-slate-200">
        Ravioli
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { gsap } from "gsap";
import { Application } from "@splinetool/runtime";

export default {
  props: {
    step: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    timeline1: undefined,
    timeline2: undefined,
    timeline3: undefined,
    src: "./src/assets/ravioli.png",
    app: undefined,
    pasta: undefined,
    wireframe: undefined,
  }),
  async mounted() {
    const { canvas } = this.$refs;

    // start the application and load the scene
    const app = new Application(canvas);
    await app.load("./ravioli.splinecode");

    app.setZoom(0.8);
    this.app = app;
    this.pasta = app.findObjectByName("pasta_object");
    this.wireframe = app.findObjectByName("wireframe");

    gsap.set(this.wireframe.scale, { x: 0, y: 0, z: 0 });

    this.transitionToWireframe = gsap
      .timeline({ paused: true })
      .to(this.wireframe.scale, { x: 1, y: 1, z: 1 }, 0)
      .to(this.pasta.scale, { y: 0, x: 0, z: 0 }, 0);
  },
  watch: {
    step(value: number) {
      switch (value) {
        case 3:
          this.transitionToWireframe.play();
          break;

        default:
          this.transitionToWireframe.reverse();
          break;
      }
    },
  },
};
</script>
