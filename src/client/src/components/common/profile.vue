<template>
  <div
    class="xt-card rounded-2xl p-6 sm:p-8 text-sm text-gray-900 xt-links-default bg-white"
  >
    <h3>Προφίλ Χρήστη</h3>
    <p>
      Για περισσότερες πληροφορίες επισκεφθείτε τις σελιδές σχετικά με την
      <a href="#">πολιτική απορρήτου</a> και την
      <a href="#">διαχείρηση προσωπικών δεδομένων</a>.
    </p>
    <div class="xt-row w-full xt-row-2">
      <div class="w-full md:w-6/12">
        <div class="xt-card xt-row-2 w-full shadow-md rounded-md p-4">
          <h5>Αλλαγή Κωδικού Πρόσβασης</h5>
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
        <div class="xt-card w-full shadow-md rounded-md p-4">
          <h5>Στοιχεία Τιμολόγησης</h5>
          <Table :include-index="false" :columns="['στοιχεια', 'πληροφοριες']">
            <Row>
              <template #head>ονομα χρηστη</template>
              <Cell>{{ userStore.user?.userName }}</Cell>
            </Row>
            <Row>
              <template #head>email</template>
              <Cell>{{ userStore.user?.email }}</Cell>
            </Row>
            <Row>
              <template #head>κατασταση</template>
              <Cell>{{ userStore.user?.status }}</Cell>
            </Row>
            <Row>
              <template #head>επωνυμια επιχειρησης</template>
              <Cell>{{ userStore.user?.companyName }}</Cell>
            </Row>
            <Row>
              <template #head>εδρα</template>
              <Cell>{{ userStore.user?.companyAddress }}</Cell>
            </Row>
            <Row>
              <template #head>αφμ</template>
              <Cell>{{ userStore.user?.vat }}</Cell>
            </Row>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { mapStores } from "pinia";
import { ClientError, OutputTypes, backend } from "../../services/backend";
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
type User = OutputTypes["viewUserProfile"]["user"];

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
          newCreds: { password: newPassword },
          oldCreds: { password: oldPassword },
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
