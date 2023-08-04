<template>
  <div class="container">
    <HomeView />
  </div>
</template>

<script lang="ts">
import "xtendui";
import "xtendui/src/toggle";
import HomeView from "./views/HomeView.vue";
export default {
  data: () => ({}),
  components: { HomeView },
};
</script>
