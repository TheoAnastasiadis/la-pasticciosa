<template></template>
<script lang="ts">
import { mapStores } from "pinia";
import { useUserStore } from "../stores/user";

export default {
  computed: {
    ...mapStores(useUserStore),
  },
  mounted() {
    if (this.userStore.user) this.$router.push("/dashboard");
    else this.$router.push("/login");
  },
};
</script>
