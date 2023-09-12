<template>
  <div class="px-2">
    <Form
      :validation-schema="schema"
      v-slot="{ errors }"
      @submit="onSubmit"
      class="w-full xt-row"
    >
      <div class="w-full">
        <label class="block mb-3 font-medium text-gray-700">
          Φιλική ονομασία
        </label>
        <Field
          type="text"
          name="name"
          aria-label="name"
          placeholder="πχ. έδρα"
          class="block mb-3 w-full rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
        ></Field>
        <div
          class="my-3 text-red-500 text-xs leading-snug custom-backend-error"
        >
          <ErrorMessage name="name"></ErrorMessage>
        </div>
      </div>
      <div class="w-9/12 pr-1">
        <label class="block mb-3 font-medium text-gray-700"> Διεύθυνση </label>
        <Field
          type="text"
          name="street"
          aria-label="street"
          placeholder="οδός"
          class="block mb-3 w-full rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
        ></Field>
        <div
          class="my-3 text-red-500 text-xs leading-snug custom-backend-error"
        >
          <ErrorMessage name="number"></ErrorMessage>
          <ErrorMessage name="street"></ErrorMessage>
        </div>
      </div>
      <div class="w-3/12 mt-8 pl-1">
        <Field
          type="text"
          name="number"
          aria-label="number"
          placeholder="αριθμός"
          class="block mb-3 w-full rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
        ></Field>
      </div>
      <div class="w-full">
        <label class="block mb-3 font-medium text-gray-700"> Ταχ. Κωδ. </label>
        <Field
          type="text"
          name="zip"
          aria-label="zip"
          placeholder="ΤΚ"
          class="block mb-3 w-full rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
        ></Field>
        <div
          class="my-3 text-red-500 text-xs leading-snug custom-backend-error"
        >
          <ErrorMessage name="zip"></ErrorMessage>
        </div>
      </div>
      <div class="w-full">
        <label class="block mb-3 font-medium text-gray-700">
          Πληροφορίες (προεραιτικό)
        </label>
        <Field name="details" aria-label="details" v-slot="{ field }">
          <textarea
            data-xt-textareaautosize
            class="block mb-3 w-full h-20 max-h-48 rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none resize-vertical"
            v-bind="field"
          ></textarea>
        </Field>
      </div>
      <div class="w-full">
        <button
          type="submit"
          class="xt-button w-full py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-white xt-links-inverse bg-primary-500 border-transparent border on:bg-slate-300 hover:bg-slate-300 active:bg-slate-300 focus:bg-slate-300"
          :class="{
            'xt-disabled': Object.keys(errors).length > 0,
          }"
        >
          νεα αιτηση
          <Loader :loading="loading" />
        </button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Form, Field, ErrorMessage } from "vee-validate";
import { z } from "zod";
import { backend, type OutputTypes } from "../../services/data";
import { useToast, TYPE } from "vue-toastification";
import Loader from "../reusables/loaders/buttonLoader.vue";

type Delivery = OutputTypes["requestDelivery"];

export default {
  data: () => ({
    schema: toTypedSchema(
      z.object({
        name: z.string({ required_error: "Αυτό το πεδίο είναι απαραίτητο" }),
        street: z.string({ required_error: "Αυτό το πεδίο είναι απαραίτητο" }),
        number: z.string({ required_error: "Αυτό το πεδίο είναι απαραίτητο" }),
        zip: z
          .string({ required_error: "Αυτό το πεδίο είναι απαραίτητο" })
          .length(5, "Βεβαιωθείτε ότι έχετε συμπληρώσει σωστά τον ΤΚ")
          .regex(/^[0-9]*$/, "Βεβαιωθείτε ότι έχετε συμπληρώσει σωστά τον ΤΚ"),
        details: z.string().optional(),
      }),
    ),
    loading: false,
  }),
  emits: ["deliveryRequested"],
  components: { Form, Field, ErrorMessage, Loader },
  methods: {
    async onSubmit(values, actions) {
      const toast = useToast();
      this.loading = true;
      try {
        const { name, street, number, zip, details } = values;
        const delivery = await backend.requestDelivery.mutate({
          name,
          street,
          number,
          zip,
          details,
        });
        toast(
          "H αίτησή σας καταχωρήθηκε με επιτυχία! Θα ενημερωθείτε για την αποδοχή της από τον διαχειριστή.",
          this.$emit("deliveryRequested", delivery),
        );
        actions.resetForm();
      } catch (error) {
        toast("Υπήρξε κάποιο πρόβλημα και το προϊόνα δεν προστέθηκε.", {
          type: TYPE.ERROR,
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
