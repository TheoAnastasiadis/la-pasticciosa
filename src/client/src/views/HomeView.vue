<template>
  <h2>
    La Pasticciosa
    <div
      class="inline-block align-middle py-3 px-3.5 text-xs rounded-xs text-gray-900 font-medium leading-snug tracking-wider uppercase bg-gray-100"
    >
      B2B Portal
    </div>
  </h2>
  <LoginForm />
</template>

<script lang="ts">
import LoginForm from "../components/loginForm.vue";

export default {
  components: {
    LoginForm,
  },
};
</script>
