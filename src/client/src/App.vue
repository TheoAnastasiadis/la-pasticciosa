<template>
  <RouterView name="header" />
  <RouterView />

  <Footer />
</template>

<script lang="ts">
import "xtendui";
import "xtendui/src/toggle";
import "xtendui/src/drop";
import "xtendui/src/overlay";
import "xtendui/src/textareaautosize";
import "xtendui/src/tooltip";

import Footer from "./components/common/footer.vue";

export default {
  components: { Footer },
};
</script>
