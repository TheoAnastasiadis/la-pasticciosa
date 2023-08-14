<template>
  <Header />
  <div class="container">
    <RouterView />
  </div>
  <Footer />
</template>

<script lang="ts">
import "xtendui";
import "xtendui/src/toggle";
import "xtendui/src/drop";
import "xtendui/src/overlay";
import "xtendui/src/textareaautosize";
import "xtendui/src/tooltip";

import Header from "./components/common/header.vue";
import Footer from "./components/common/footer.vue";

export default {
  components: { Header, Footer },
};
</script>
