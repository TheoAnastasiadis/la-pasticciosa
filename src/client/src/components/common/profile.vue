<template>
  <section>
    <section>
      <div class="flex flex-col items-center pb-8">
        <div class="flex flex-col w-full prose text-left prose-blue">
          <div class="w-full">
            <h2>Προφίλ Χρήστη</h2>
            <p>
              Για περισσότερες πληροφορίες επισκεφθείτε τις σελιδές σχετικά με
              την <a href="#">πολιτική απορρήτου</a> και την
              <a href="#">διαχείρηση προσωπικών δεδομένων</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>
  <div
    class="flex flex-col md:flex-row flex-nowrap md:space-y-0 md:space-x-2 space-y-2"
  >
    <div class="w-full md:w-6/12 mb-4">
      <div
        class="xt-card w-full shadow-md rounded-md p-4 border border-slate-400"
      >
        <h6>Αλλαγή Κωδικού Πρόσβασης</h6>
        <Form
          class="text-sm"
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <div class="xt-row xt-row-x-10 xt-row-y-2">
            <div class="w-full">
              <label class="block mb-3 font-medium text-gray-700">
                Τρέχων Κωδικός Πρόσβασης
              </label>
              <Field
                type="password"
                name="oldPassword"
                class="block w-full rounded-md py-2.5 px-3.5 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
                aria-label="Old Password"
                placeholder="προσθέστε έναν κωδικό πρόσβασης"
              />
              <div
                class="my-3 text-red-600 text-xs leading-snug custom-backend-error"
              >
                <ErrorMessage name="oldPassword"></ErrorMessage>
              </div>
            </div>

            <div class="w-full">
              <label class="block mb-3 font-medium text-gray-700">
                Κωδικός Πρόσβασης
              </label>
              <Field
                type="password"
                name="newPassword"
                v-model="password"
                class="block w-full rounded-md py-2.5 px-3.5 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
                aria-label="New Password"
                placeholder="επιλέκτε έναν νέο κωδικό πρόσβασης"
              />
              <div
                class="my-3 text-red-600 text-xs leading-snug custom-backend-error"
              >
                <ErrorMessage name="newPassword"></ErrorMessage>
              </div>
              <Field
                type="password"
                name="passwordRepeat"
                class="block w-full rounded-md py-2.5 px-3.5 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
                aria-label="Password Repeat"
                placeholder="πληκτρολογήστε ξανά τον κωδικό πρόσβασης"
              />
              <div
                class="mt-3 text-red-600 text-xs leading-snug custom-backend-error"
              >
                <ErrorMessage name="passwordRepeat"></ErrorMessage>
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
                ΑΛΛΑΓΗ &nbsp;
                <i class="h h-unlocked text-xl"></i>
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
    <div class="w-full md:w-6/12">
      <div class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
        <dl class="-my-3 divide-y divide-gray-100 text-sm">
          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Όνομα Χρήστη</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ userStore.user?.userName }}
            </dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Κατάσταση</dt>
            <dd class="text-gray-700 sm:col-span-2">
              {{ userStore.user?.status }}
            </dd>
          </div>

          <div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt class="font-medium text-gray-900">Στοιχεία Τιμολόγησης</dt>
            <dd class="text-gray-700 sm:col-span-2">
              <p>{{ userStore.user?.companyName }}</p>
              <p>{{ userStore.user?.vat }}</p>
              <p>{{ userStore.user?.companyAddress }}</p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from "pinia";
import { ClientError, OutputTypes, backend } from "../../services/data";
import { useUserStore } from "../../stores/user";
import Table from "../reusables/table/table.vue";
import Row from "../reusables/table/row.vue";
import Cell from "../reusables/table/cell.vue";
import Card from "../reusables/content/card.vue";
import { Field, ErrorMessage, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast, TYPE } from "vue-toastification";
import Loader from "../reusables/loaders/buttonLoader.vue";

import { z } from "zod";
type User = OutputTypes["viewUsers"][number];

export default {
  computed: {
    ...mapStores(useUserStore),
    repeatPassword() {
      return this.password;
    },
  },
  components: { Table, Row, Cell, Card, Field, ErrorMessage, Form, Loader },
  data() {
    return {
      loading: false,
      password: undefined,
      schema: toTypedSchema(
        z.object({
          oldPassword: z
            .string({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" })
            .min(8, "Οι κωδικοί αποτελούνται από 8 χαρακτήρες και πάνω."),
          newPassword: z
            .string({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" })
            .min(8, "Οι κωδικοί αποτελούνται από 8 χαρακτήρες και πάνω."),
          passwordRepeat: z
            .string({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" })
            .refine(
              (p) => p === (this.password as unknown as string),
              "Οι κωδικοί πρέπει να είναι ίδιοι",
            ),
        }),
      ),
    };
  },
  methods: {
    async onSubmit(values) {
      const toast = useToast();
      const { oldPassword, newPassword } = values;

      this.loading = true; // start of async op

      await backend.changePassword
        .mutate({
          oldPassword,
          newPassword,
        })
        .then(() => {
          toast("Η αλλαγή του κωδικού πρόσβασης πραγματοποιήθηκε");
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
};
</script>
