<template>
  <div class="static">
    <div class="relative top-0 left-0 w-[300px]">
      <img :src="src" ref="image" class="cursor-move" />
    </div>
  </div>
</template>

<script lang="ts">
import { gsap } from "gsap";

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
  }),
  methods: {
    updatePic() {
      switch (this.step) {
        case 1:
          this.src = "./src/assets/sealed.png";
          break;
        case 2:
          this.src = "./src/assets/cooked.png";
          break;
        case 3:
          this.src = "./src/assets/wireframe.png";
          break;
        default:
          this.src = "./src/assets/ravioli.png";
          break;
      }
    },
  },
  mounted() {
    const { image } = this.$refs;
    this.timeline1 = gsap
      .timeline({
        paused: true,
        defaults: { duration: 0.3, ease: "back.out" },
        onComplete: this.updatePic,
        onReverseComplete: this.updatePic,
      })
      .to(image, {
        scale: 0.8,
        ease: "linear",
      });

    this.timeline2 = gsap
      .timeline({
        paused: true,
        onComplete: this.updatePic,
        onReverseComplete: this.updatePic,
      })
      .to(image, { scale: 1.1 });

    this.timeline3 = gsap
      .timeline({
        paused: true,
        onComplete: this.updatePic,
        onReverseComplete: this.updatePic,
      })
      .to(image, { scale: 1 });
  },
  watch: {
    step(value: number) {
      switch (value) {
        case 0:
          this.timeline1.reverse();
          break;
        case 1:
          this.timeline1.play();
          this.timeline2.reverse();
          break;
        case 2:
          this.timeline1.reverse();
          this.timeline2.play();
          break;
        default:
          this.timeline2.reverse();
          this.timeline3.play();
          break;
      }
    },
  },
};
</script>
