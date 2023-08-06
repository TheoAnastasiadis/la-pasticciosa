<template>
  <div class="xt-overflow-sub overflow-y-hidden overflow-x-scroll">
    <loader :loading="loading" />
    <p>
      Στον παρακάτω πίνακα εμφανίζονται οι χρήστες που είναι εγγεγραμμένοι στο
      σύστημα, με τις <strong>νεώτερες εγγραφές να είναι πρώτες</strong>.
      Χρηστιμοποιείστε τα εργαλεία για να αποδειχτείτε νέους χρήστες και να
      προσθέσετε προϊόντα στον κατάλογό τους. Αν ένας χρήστης δεν έχει γίνει
      αποδεκτός από τον διαχειριστή δεν μπορεί να προσθέσεις τοποθεσίες
      παράδοσης αλλά ούτε και να υποβάλει παραγγελίες.
    </p>
    <table class="my-4 xt-my-auto w-full">
      <thead>
        <tr>
          <th
            class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
          >
            #
          </th>
          <th
            class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
          >
            Επωνυμια
          </th>
          <th
            class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
          >
            Προϊοντα
          </th>
          <th
            class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
          >
            Κατασταση
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.uuid">
          <th
            class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200 transition group-hover:bg-gray-200"
          >
            {{ user.uuid }}
          </th>
          <td
            class="py-2 px-4 text-sm align-top leading-snug border border-gray-200 transition group-hover:bg-gray-200"
          >
            <strong>{{ user.companyName }}</strong>
            {{ user.companyAddress }}
          </td>
          <td
            class="py-2 px-4 text-sm align-top leading-snug border border-gray-200 transition group-hover:bg-gray-200"
          >
            {{ user.catalogue.length }}
          </td>
          <td
            class="py-2 px-4 text-sm align-top leading-snug border border-gray-200 transition group-hover:bg-gray-200"
          >
            <span v-if="user.status == 'accepted'"
              ><i class="xt-icon h h-user-checked text-base text-green-400"></i
              >&nbsp;Ενεργός</span
            >
            <div data-xt-drop="{ position: 'auto-end', duration: 500 }">
              <button
                v-if="user.status == 'requested'"
                class="xt-button py-2 px-3 text-sm rounded-md font-medium leading-snug tracking-wider text-gray-900 bg-orange-100 transition hover:bg-orange-200 active:bg-gray-300 on:bg-gray-200 justify-end text-left truncate"
              >
                Σε αναμονή&nbsp;<i
                  class="h h-clock-8 text-base hidden md:inline-block"
                ></i>
              </button>
              <div class="xt-drop p-3 group" data-xt-drop-target>
                <div
                  class="xt-card w-80 rounded-md shadow-lg text-gray-900 xt-links-default bg-white transition opacity-0 scale-95 group-in:opacity-100 group-in:scale-100 group-out:scale-105"
                >
                  <nav
                    aria-label="Drop"
                    class="xt-list xt-list-1 flex-col py-2"
                  >
                    <a
                      @click="accept(user.uuid)"
                      class="xt-button py-1.5 px-3 text-sm transition hover:bg-primary-300 hover:bg-opacity-25 active:text-white active:bg-primary-500 on:text-white on:bg-primary-500"
                    >
                      <div
                        class="xt-list xt-list-3 flex-auto items-center justify-start text-left flex-nowrap"
                      >
                        <div
                          class="p-2 bg-primary-100 rounded-md text-white xt-links-inverse"
                        >
                          <i
                            class="xt-icon h h-user-checked text-sm text-green-500"
                          ></i>
                        </div>
                        <div>
                          <div class="font-medium">Αποδοχή</div>
                          <div class="text-xs opacity-50">
                            Αποδοχή του χρήστη `{{ user.userName }}`;
                          </div>
                        </div>
                      </div>
                    </a>
                  </nav>
                  <div class="p-5 text-xs rounded-b-md bg-green-300 flex-auto">
                    <p class="mb-1 font-bold text-sm">Τι σημαίνει αυτό;</p>
                    <p>
                      Όταν ένας χρήστης γίνει αποδεκτός από τον διαχειριστή θα
                      μπορεί να αιτηθεί
                      <strong>τοποθεσίες παράδοσης</strong> καθώς και να
                      <strong>υποβάλει παραγγελίες</strong>.
                    </p>
                  </div>
                </div>
                <div
                  class="xt-arrow z-below -inset-1 m-3 w-3 h-3 bg-gray-200 opacity-0 transition-opacity ease-out-quint group-in:duration-300 group-out:duration-100 group-in:opacity-100"
                ></div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { backend, type OutputTypes } from "../services/backend";
import { useToast, TYPE } from "vue-toastification";
import loader from "../components/containerLoader.vue";

type User = OutputTypes["viewUsers"][number];

export default {
  data: () => ({ users: [] as User[], loading: false }),
  async mounted() {
    this.loading = true;
    const users = await backend.viewUsers.query();
    this.users = users;
    this.loading = false;
  },
  methods: {
    async accept(id: string) {
      const toast = useToast();
      this.loading = true;
      try {
        await backend.acceptUser.mutate(id);
        toast("Η αποδοχή του χρήστη πραγματοποιήθηκε!", { type: TYPE.SUCCESS });
        this.users = (this.users as User[]).map((u) => {
          if (u.uuid === id) u.status = "accepted";
          return u;
        });
      } catch (error) {
        toast(
          "Υπήρξε κάποιο πρόβλημα και η αποδοχή του χρήστη δεν πραγματοποιήθηκε",
          { type: TYPE.ERROR },
        );
      } finally {
        this.loading = false;
      }
    },
  },
  components: { loader },
};
</script>
