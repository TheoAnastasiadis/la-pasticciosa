<template>
  <div class="demo--form-variant-primary">
    <div
      class="xt-card flex-auto w-12/12 md:w-6/12 mx-auto p-4 md:p-7 sm:p-9 text-base rounded-2xl bg-white shadow-xl"
    >
      <h3 class="text-xl md:text-2xl font-bold pb-4 text-center md:text-left">
        Συμπληρώστε τα στοιχεία σας
      </h3>
      <p>
        Χρησιμοποιείστε την παρακάτω φόρμα για να αιτηθείτε την εγγραφή σας στο
        σύστημα. Μετά την αίτηση, και αφού αυτή γίνει δεκτή από τον διαχειριστή
        θα μπορείτε να υποβάλετε και να διαχειρίζεστε τις παραγγείες σας
        ηλεκτρονικά.
      </p>
      <Form
        class="text-sm"
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors }"
      >
        <div class="xt-row xt-row-x-10 xt-row-y-2">
          <div class="w-full">
            <label class="block mb-3 font-medium text-gray-700">
              Όνομα Χρήστη
            </label>
            <Field
              type="text"
              name="userName"
              class="block w-full rounded-md py-2.5 px-3.5 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
              aria-label="username"
              placeholder="επιλέξτε ένα όνομα χρήστη"
            />
            <div
              class="mt-3 text-red-600 text-xs leading-snug custom-backend-error"
            >
              <ErrorMessage name="userName"></ErrorMessage>
            </div>
          </div>
          <div class="w-full">
            <label class="block mb-3 font-medium text-gray-700">
              Διεύθυνση Ηλ. Ταχυδρομείου
            </label>
            <Field
              type="text"
              name="email"
              class="block w-full rounded-md py-2.5 px-3.5 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
              aria-label="email"
              placeholder="συμπληρώστε το email σας"
            />
            <div
              class="mt-3 text-red-600 text-xs leading-snug custom-backend-error"
            >
              <ErrorMessage name="email"></ErrorMessage>
            </div>
          </div>
          <div class="w-full">
            <label class="block mb-3 font-medium text-gray-700">
              Κωδικός Πρόσβασης
            </label>
            <Field
              type="password"
              name="password"
              v-model="password"
              class="block w-full rounded-md py-2.5 px-3.5 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
              aria-label="Password"
              placeholder="προσθέστε έναν κωδικό πρόσβασης"
            />
            <div
              class="my-3 text-red-600 text-xs leading-snug custom-backend-error"
            >
              <ErrorMessage name="password"></ErrorMessage>
            </div>
            <Field
              type="password"
              name="passwordRepeat"
              class="block w-full rounded-md py-2.5 px-3.5 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
              aria-label="Password"
              placeholder="πληκτρολογήστε ξανά τον κωδικό πρόσβασης"
            />
            <div
              class="mt-3 text-red-600 text-xs leading-snug custom-backend-error"
            >
              <ErrorMessage name="passwordRepeat"></ErrorMessage>
            </div>
          </div>
          <div class="w-full">
            <label class="block mb-3 font-medium text-gray-700">
              Επωνυμία Επιχείρησης
            </label>
            <Field
              type="text"
              name="companyName"
              class="block w-full rounded-md py-2.5 px-3.5 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
              aria-label="company name"
              placeholder="προσθέστε την επωνυμία της επιχείρησής σας"
            />
            <div
              class="mt-3 text-red-600 text-xs leading-snug custom-backend-error"
            >
              <ErrorMessage name="companyName"></ErrorMessage>
            </div>
          </div>
          <div class="w-full">
            <label class="block mb-3 font-medium text-gray-700">
              Έδρα Επιχείρησης
            </label>
            <Field
              type="text"
              name="companyAddress"
              class="block w-full rounded-md py-2.5 px-3.5 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
              aria-label="company address"
              placeholder="προσθέστε την διεύθυνση της επιχείρησής σας"
            />
            <div
              class="mt-3 text-red-600 text-xs leading-snug custom-backend-error"
            >
              <ErrorMessage name="companyAddress"></ErrorMessage>
            </div>
          </div>
          <div class="w-full">
            <label class="block mb-3 font-medium text-gray-700"> ΑΦΜ </label>
            <Field
              type="string"
              name="vat"
              class="block w-full rounded-md py-2.5 px-3.5 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
              aria-label="company address"
              placeholder="προσθέστε τον ΑΦΜ σας"
            />
            <div
              class="mt-3 text-red-600 text-xs leading-snug custom-backend-error"
            >
              <ErrorMessage name="vat"></ErrorMessage>
            </div>
          </div>
          <div class="w-full">
            <button
              type="submit"
              class="xt-button mt-2 py-2.5 px-3.5 w-full text-sm rounded-md font-medium leading-snug tracking-wider uppercas bg-primary-500 transition hover:bg-primary-600 active:bg-primary-600 on:bg-primary-600 text-gray-100"
              :class="{
                'xt-disabled': Object.keys(errors).length > 0,
              }"
            >
              ΕΓΓΡΑΦΗ &nbsp;
              <i class="h h-user-in text-xl"></i>
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
      Αν έχετε ήδη δημιουργήσει λογαριασμό στην πλατφόρμα μας,
      <RouterLink to="/login">συνδεθείτε με τους κωδικούς σας</RouterLink>!
    </p>
  </div>
</template>

<script lang="ts">
import { Field, Form, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useToast, TYPE } from "vue-toastification";
import { backend, type ClientError } from "../services/backend";
import loader from "../components/buttonLoader.vue";

export default {
  data() {
    return {
      loading: false,
      password: undefined,
      schema: toTypedSchema(
        z.object({
          userName: z.string({
            required_error: "Αυτό το πεδίο είναι υποχρεωτικό",
          }),
          email: z
            .string({
              required_error: "Αυτό το πεδίο είναι υποχρεωτικό",
            })
            .email("Βεβαιωθείτε ότι έχετε συμπληρώσει σωστά το email σας."),
          password: z
            .string({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" })
            .min(8, "Οι κωδικοί αποτελούνται από 8 χαρακτήρες και πάνω."),
          passwordRepeat: z
            .string({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" })
            .refine(
              (p) => p === (this.password as unknown as string),
              "Οι κωδικοί πρέπει να είναι ίδιοι",
            ),
          companyName: z.string({
            required_error: "Αυτό το πεδίο είναι υποχρεωτικό",
          }),
          companyAddress: z.string({
            required_error: "Αυτό το πεδίο είναι υποχρεωτικό",
          }),
          vat: z
            .string({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" })
            .length(9, "Βεβαιωθείτε ότι έχετε συμπληρώσει σωστά τον ΑΦΜ σας")
            .regex(
              /^[0-9]*$/,
              "Βεβαιωθείτε ότι έχετε συμπληρώσει σωστά τον ΑΦΜ σας",
            ),
        }),
      ),
    };
  },
  computed: {
    repeatPassword() {
      return this.password;
    },
  },
  methods: {
    async onSubmit(values) {
      const toast = useToast();
      const { userName, email, password, companyName, companyAddress, vat } =
        values;

      this.loading = true; // start of async op

      await backend.requestUser
        .mutate({ userName, email, password, companyName, companyAddress, vat })
        .then(() => {
          toast(
            "Η εγγραφή σας πραγματοποιήθηκε με επιτυχία! Συνδεθείτε με τους κωδικούς σας για να αιτηθείτε τοποθεσίες παράδοσης.",
            { timeout: 10000, type: TYPE.SUCCESS },
          );
          this.$router.push("/login");
        })
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
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  components: { Field, Form, ErrorMessage, loader },
};
</script>
