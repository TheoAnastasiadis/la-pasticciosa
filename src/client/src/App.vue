<template>
  <Header />
  <div class="container">
    <RouterView />
  </div>
</template>

<script lang="ts">
import "xtendui";
import "xtendui/src/toggle";
import "xtendui/src/drop";
import "xtendui/src/overlay";
import "xtendui/src/textareaautosize";
import "xtendui/src/tooltip";

import Header from "./components/header.vue";

export default {
  components: { Header },
};
</script>
