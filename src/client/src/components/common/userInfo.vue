<template>
  <Tooltip>
    <template #trigger>{{ user.companyName }}</template>
    <template #content>
      <div
        class="xt-card rounded-md shadow-md text-white xt-links-inverse font-medium bg-primary-400 transition duration-300 opacity-0 scale-95 group-in:opacity-100 group-in:scale-100 group-out:scale-105"
      >
        <div class="xt-list xt-list-1 flex-col p-2">
          <div class="w-full">
            <div
              class="xt-list xt-list-1 flex-auto items-center justify-start text-left flex-nowrap py-1.5 px-2 text-sm"
            >
              <div>
                <div class="text-lg normal-case">Στοιχεία χρήστη</div>
                <table class="my-4 xt-my-auto w-full">
                  <tbody>
                    <tr>
                      <th
                        class="py-2 px-2 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
                      >
                        ονομα χρηστη
                      </th>
                      <td
                        class="py-2 px-2 text-sm align-top leading-snug border border-gray-200"
                      >
                        {{ user.userName }}
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="py-2 px-2 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
                      >
                        Επιχειρηση
                      </th>
                      <td
                        class="py-2 px-2 text-sm align-top leading-snug border border-gray-200"
                      >
                        {{ user.companyName }}
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="py-2 px-2 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
                      >
                        εδρα
                      </th>
                      <td
                        class="py-2 px-2 text-sm align-top leading-snug border border-gray-200"
                      >
                        {{ user.companyAddress }}
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="py-2 px-2 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
                      >
                        ΑΦΜ
                      </th>
                      <td
                        class="py-2 px-2 text-sm align-top leading-snug border border-gray-200"
                      >
                        {{ user.vat }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Tooltip>
</template>

<script lang="ts">
import Tooltip from "../reusables/interactives/tooltip.vue";
export default {
  props: ["user"],
  components: { Tooltip },
};
</script>
