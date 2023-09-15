<template>
  <div class="mx-2.5 mt-4">
    <div
      class="xt-card flex-auto w-12/12 md:w-6/12 mx-auto p-4 md:p-7 sm:p-9 text-base rounded-2xl text-white xt-links-inverse bg-primary-500"
    >
      <h3 class="text-xl md:text-2xl font-bold pb-4 text-center md:text-left">
        Συμπληρώστε τα στοιχεία σας
      </h3>
      <Form
        class="text-sm"
        @submit="login"
        :validation-schema="schema"
        v-slot="{ errors }"
      >
        <div class="xt-row xt-row-x-10 xt-row-y-4">
          <div class="w-full">
            <label class="block mb-3 font-medium text-white">
              Διεύθυνση Ηλ. Ταχυδρομείου
            </label>
            <Field
              type="text"
              name="email"
              class="block w-full rounded-md py-2.5 px-3.5 text-white placeholder-white placeholder-opacity-75 bg-primary-800 bg-opacity-25 transition focus:bg-opacity-50 focus:outline-none"
              aria-label="email"
              placeholder="διεύθυνση ηλεκτρονικού ταχυδρομείου"
              v-bind="email"
            />
            <div
              class="mt-3 text-red-400 text-xs leading-snug custom-backend-error"
            >
              <ErrorMessage name="email"></ErrorMessage>
            </div>
          </div>
          <div class="w-full">
            <label class="block mb-3 font-medium text-white">
              Κωδικός Πρόσβασης
            </label>
            <Field
              type="password"
              name="password"
              class="block w-full rounded-md py-2.5 px-3.5 text-white placeholder-white placeholder-opacity-75 bg-primary-800 bg-opacity-25 transition focus:bg-opacity-50 focus:outline-none"
              aria-label="Password"
              placeholder="κωδικός πρόσβασης"
              v-bind="password"
            />
            <div
              class="mt-3 text-red-400 text-xs leading-snug custom-backend-error"
            >
              <ErrorMessage name="password"></ErrorMessage>
            </div>
          </div>
          <div class="w-full">
            <button
              type="submit"
              class="xt-button mt-2 py-2.5 px-3.5 w-full text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-gray-900 bg-gray-100 transition hover:bg-gray-200 active:bg-gray-300 on:bg-gray-200"
              :class="{
                'xt-disabled': Object.keys(errors).length > 0,
              }"
            >
              ΣΥΝΔΕΣΗ &nbsp;
              <i class="h h-login text-xl"></i>
              <span
                class="xt-loader absolute z-content inset-0 rounded-inherit overflow-hidden"
              >
                <loader :loading="loading"></loader>
              </span>
            </button>
          </div>
        </div>
      </Form>
    </div>
  </div>
  <h6 class="mx-auto md:w-6/12 myb-3 mt-5 text-center">
    Ή επιλέξτε ένα από τα παρακάτω
  </h6>
  <div
    class="p-4 grid grid-cols-1 md:grid-cols-2 w-12/12 md:w-6/12 mx-auto space-x-0 md:space-x-2 space-y-4 md:space-y-0"
  >
    <div class="rounded-md w-full">
      <a
        href="/auth/login/google"
        class="px-4 py-2 flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:text-slate-900 hover:shadow transition ease-in w-full justify-center bg-slate-100 hover:bg-slate-200 cursor-pointer"
      >
        <img
          class="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Σύνδεση μέσω Google</span>
      </a>
    </div>
    <div class="rounded-md w-full">
      <a
        type="button"
        href="/auth/login/facebook"
        class="py-2 px-4 max-w-md flex justify-center items-center hover:bg-[#3b5998] bg-[#4267B3] focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg hover:shadow cursor-pointer"
      >
        <svg
          width="20"
          height="20"
          fill="currentColor"
          class="mr-2"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"
          ></path>
        </svg>
        Σύνδεση μέσω Facebook
      </a>
    </div>
  </div>
  <div class="flex-auto w-12/12 md:w-6/12 mx-auto p-4 md:p-7 sm:p-9 text-base">
    <p>
      Δεν είστε ακόμη χρήστης της πλατφόρμας; Εγγραφείτε με τον
      <RouterLink to="/signup">δικό σας λογαριασμό</RouterLink>!
    </p>
  </div>
</template>

<style scoped>
.demo--form-variant-primary > .xt-select {
  /* for colors use %23 instead of # */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
}
</style>

<script setup lang="ts">
import { Field, Form, ErrorMessage } from "vee-validate";
import loader from "../components/reusables/loaders/buttonLoader.vue";
import { useLogin } from "../composables/auth/login";
import { useLoginForm } from "../composables/forms/login";

const { email, password, schema } = useLoginForm();
const { loading, login } = useLogin(email, password);
</script>
