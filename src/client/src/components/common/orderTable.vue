<template>
  <table class="my-4 xt-my-auto w-full bg-white">
    <thead>
      <tr>
        <th
          class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
        >
          προιον
        </th>
        <th
          class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
        >
          ποσοτητα
        </th>
        <th
          class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
        >
          υποσυνολο
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="quantity in quantities">
        <th
          class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider text-left border border-gray-200"
        >
          {{ quantity.item.name }}
        </th>
        <td
          class="py-2 px-4 text-sm align-top leading-snug border border-gray-200"
        >
          {{ quantity.value }} &times; {{ quantity.item.unit }}
        </td>
        <td
          class="py-2 px-4 text-sm align-top leading-snug border border-gray-200"
        >
          {{ (quantity.value * parseFloat(quantity.item.price)).toFixed(2) }}
          &euro;
        </td>
      </tr>
      <tr>
        <td
          colspan="2"
          class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
        >
          Συνολο
        </td>
        <td
          class="py-2 px-4 text-xs align-top font-medium leading-snug tracking-wider uppercase text-left border border-gray-200"
        >
          {{
            typeof quantities === "undefined"
              ? []
              : quantities
                  .map(({ item, value }) => parseFloat(item.price) * value)
                  .reduce((a, b) => a + b, 0)
                  .toFixed(2)
          }}
          &euro;
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
export default {
  props: ["quantities"],
};
</script>
