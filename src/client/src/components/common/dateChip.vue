<template>
  <Tooltip
    ><template #trigger>{{ relativeDate }}</template>
    <template #content
      ><div class="bg-primary-400 rounded-md p-2 text-white font-semibold">
        {{ absoluteDate }}
      </div></template
    >
  </Tooltip>
</template>

<script lang="ts">
import moment from "moment";
import "moment/dist/locale/el";
import Tooltip from "../reusables/interactives/tooltip.vue";

export default {
  props: ["date"],
  computed: {
    relativeDate() {
      moment.locale("el");
      return moment(this.date).fromNow();
    },
    absoluteDate() {
      moment.locale("el");
      return moment(this.date).format("dddd, Do MMMM YYYY, h:mm a");
    },
  },
  components: {
    Tooltip,
  },
};
</script>
