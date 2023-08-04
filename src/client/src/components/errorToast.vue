<template>
  <div
    class="xt-card text-sm py-4 px-5 rounded-2xl my-4 xt-my-auto text-white xt-links-inverse bg-primary-500"
  >
    <p>
      {{ message }}
    </p>
  </div>
</template>
<script>
export default {
  props: ["message"],
};
</script>
