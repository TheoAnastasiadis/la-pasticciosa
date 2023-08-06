<template>
  <div class="xt-backdrop z-below bg-gray-900 opacity-0"></div>
  <div class="xt-overlay-container max-w-5xl">
    <div class="xt-overlay-inner">
      <div class="shadow-xl xt-shadow z-below absolute inset-0 opacity-0"></div>
      <div class="xt-card text-gray-900 xt-links-default rounded-2xl bg-white">
        <button
          type="button"
          class="xt-button xt-dismiss absolute z-above top-0 right-0 p-5 text-2xl"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="xt-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="md:xt-card-group">
          <div class="md:w-7/12 p-7 sm:p-9 text-base">
            <div class="xt-h4">Δημιουργία Νέου Προϊόντος</div>
            <p>
              Συμπληρώστε τα στοιχεία της φόρμας και πατήστε ΥΠΟΒΟΛΗ για να
              προστεθεί το νέο προϊόν στον κατάλογο. <br /><strong
                >Προσοχή</strong
              >: το νέο προϊόν δεν θα είναι ορατό στους χρήστες (εκτός του
              διαχειριστή) εώς ότου τους ανατεθεί.
            </p>
            <Form
              class="text-sm"
              :validation-schema="schema"
              v-slot="{ errors }"
              @submit="onSubmit"
            >
              <div class="xt-row xt-row-x-10">
                <div class="w-full">
                  <label class="block mb-3 font-medium text-gray-700">
                    Όνομα
                  </label>
                  <Field
                    name="name"
                    type="text"
                    class="block mb-3 w-full rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
                    aria-label="Name"
                  />
                  <div
                    class="my-3 text-red-500 text-xs leading-snug custom-backend-error"
                  >
                    <ErrorMessage name="name"></ErrorMessage>
                  </div>

                  <label class="block mb-3 font-medium text-gray-700">
                    Περιγραφή
                  </label>
                  <Field
                    name="description"
                    aria-label="Description"
                    v-slot="{ field }"
                  >
                    <textarea
                      data-xt-textareaautosize
                      class="block mb-3 w-full h-20 max-h-48 rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none resize-vertical"
                      v-bind="field"
                    ></textarea>
                  </Field>
                  <div
                    class="my-3 text-red-500 text-xs leading-snug custom-backend-error"
                  >
                    <ErrorMessage name="description"></ErrorMessage>
                  </div>

                  <label class="block mb-3 font-medium text-gray-700">
                    Τιμή
                  </label>
                  <Field
                    name="price"
                    type="number"
                    class="block mb-3 w-full rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
                    aria-label="Price"
                  />
                  <div
                    class="my-3 text-red-500 text-xs leading-snug custom-backend-error"
                  >
                    <ErrorMessage name="price"></ErrorMessage>
                  </div>

                  <label class="block mb-3 font-medium text-gray-700">
                    Εξώφυλλο
                  </label>
                  <Field
                    name="image"
                    type="text"
                    class="block mb-3 w-full rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
                    aria-label="Image"
                    v-model="imageSrc"
                  />
                  <div
                    class="my-3 text-red-500 text-xs leading-snug custom-backend-error"
                  >
                    <ErrorMessage name="image"></ErrorMessage>
                  </div>

                  <label class="block mb-3 font-medium text-gray-700">
                    Μικρογραφία
                  </label>
                  <Field
                    name="thumbnail"
                    type="text"
                    class="block mb-3 w-full rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
                    aria-label="Thumbnail"
                    v-model="thumbnailSrc"
                  />
                  <div
                    class="my-3 text-red-500 text-xs leading-snug custom-backend-error"
                  >
                    <ErrorMessage name="thumbnail"></ErrorMessage>
                  </div>

                  <button
                    type="submit"
                    class="xt-button w-full py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-white xt-links-inverse bg-primary-500 border-transparent border on:bg-slate-300 hover:bg-slate-300 active:bg-slate-300 focus:bg-slate-300"
                    :class="{
                      'xt-disabled': Object.keys(errors).length > 0,
                    }"
                  >
                    υποβολη
                    <buttonLoader :loading="loading" />
                  </button>
                </div>
              </div>
            </Form>
          </div>

          <div class="md:w-5/12 flex flex-col">
            <div
              class="xt-media-container bg-gray-200 md:rounded-tr-2xl h-48 md:pb-[100%]"
            >
              <img
                class="xt-media object-cover"
                :src="
                  imageSrc ||
                  'https://placehold.co/600x400?text=Product\\nPhoto'
                "
                loading="eager"
                alt="image"
              />
            </div>
            <div
              class="p-7 sm:p-9 text-base rounded-b-2xl md:rounded-bl-none bg-primary-100 flex-auto"
            >
              <div class="flex flex-wrap justify-center">
                <div
                  class="w-6/12 sm:w-4/12 h-full flex justify-center align-middle"
                >
                  <img
                    :src="
                      thumbnailSrc ||
                      'https://placehold.co/100x100?text=Thumbnail'
                    "
                    alt="thumbnail"
                    class="cover shadow rounded-full w-20 h-20 align-middle border-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { backend, type OutputTypes } from "../services/backend";
import buttonLoader from "./buttonLoader.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useToast, TYPE } from "vue-toastification";

type Item = OutputTypes["createItem"];

export default {
  data() {
    return {
      loading: false,
      imageSrc: "",
      thumbnailSrc: "",
      schema: toTypedSchema(
        z.object({
          name: z.string({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" }),
          description: z.string({
            required_error: "Αυτό το πεδίο είναι υποχρεωτικό",
          }),
          price: z
            .number({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" })
            .transform((n) => Math.round(n * 100) / 100) // round to 2 decimals
            .refine((n) => n > 0, "Η τιμή πρέπει να είναι μεγαλύτερη του 0")
            .transform((n) => n.toFixed(2)),
          image: z
            .string({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" })
            .url(
              "Βεβαιωθείτε ότι έχτε συμπληρώσει σωστά την διεύθυνση της εικόνας",
            ),
          thumbnail: z
            .string({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" })
            .url(
              "Βεβαιωθείτε ότι έχτε συμπληρώσει σωστά την διεύθυνση της εικόνας",
            ),
        }),
      ),
    };
  },
  methods: {
    async onSubmit(values) {
      this.loading = true;
      const toast = useToast();
      const { name, description, price, image, thumbnail } = values;
      try {
        const item = await backend.createItem.mutate({
          name,
          description,
          price,
          image,
          thumbnail,
        });
        toast("Το προϊόν προστέθηκε στον κατάλογο", { type: TYPE.DEFAULT });
        this.$emit("itemCreated", item);
      } catch (error) {
        toast("Υπήρξε κάποιο πρόβλημα και το προϊόνα δεν προστέθηκε.", {
          type: TYPE.ERROR,
        });
      } finally {
        this.loading = false;
      }
    },
  },
  components: {
    Field,
    Form,
    ErrorMessage,
    buttonLoader,
  },
  emits: ["itemCreated"],
};
</script>
