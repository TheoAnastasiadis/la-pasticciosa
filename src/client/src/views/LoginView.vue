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
        @submit="onSubmit"
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

<script lang="ts">
import { Field, Form, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useToast, TYPE } from "vue-toastification";
import { backend, type ClientError } from "../services/backend";
import { useUserStore } from "../stores/user";
import { mapActions, mapStores } from "pinia";
import loader from "../components/reusables/loaders/buttonLoader.vue";

export default {
  data() {
    return {
      loading: false,
      schema: toTypedSchema(
        z.object({
          email: z
            .string({
              required_error: "Αυτό το πεδίο είναι υποχρεωτικό",
            })
            .email("Βεβαιωθείτε ότι έχετε συμπληρώσει σωστά το email σας."),
          password: z
            .string({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" })
            .min(8, "Οι κωδικοί αποτελούνται από 8 χαρακτήρες και πάνω."),
        }),
      ),
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async onSubmit(values) {
      const toast = useToast();
      const { email, password } = values;

      this.loading = true; // start of async op

      await backend.logIn
        .query({ email, password })
        .catch((error: ClientError) => {
          if (error.message === "Failed to fetch") {
            toast(
              "Πρόβλημα στην σύνδεση με τον διακομιστή. Παρακαλώ προσπαθήστε ξανά.",
              {
                type: TYPE.ERROR,
              },
            );
          } else {
            toast(error.message, { type: TYPE.ERROR });
          }
          this.loading = false;
        });

      const users = await backend.viewUsers.query({ page: 0 }).catch(() => {
        toast(
          "Πρόβλημα στην σύνδεση με τον διακομιστή. Παρακαλώ προσπαθήστε ξανά.",
          { type: TYPE.ERROR },
        );
        this.loading = false;
        return [];
      });

      const user = users.find((user) => user.email === email);
      this.userStore.login(user);
      this.loading = false;
      this.$router.push("/");
    },
    ...mapActions(useUserStore, ["login"]),
  },
  components: { Field, Form, ErrorMessage, loader },
};
</script>
