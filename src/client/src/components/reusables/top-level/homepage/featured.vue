<template>
  <div
    class="w-full h-10 bg-primary-700 relative z-[9] -my-10 drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)]"
  ></div>
  <div
    class="w-full bg-primary-700 text-white xt-links-inverse py-14 before:w-full before:h-10 before:bg-yellow-50 shadow-inner overflow-hidden"
    ref="featured"
  >
    <featuredPart
      title="εύκολη διαχείρηση"
      content="Έρχονται μεριδοποιημένα και συσκευασμένα σε
              προστατευτική ατμόσφαιρα για να διατηρούνται στο ψυγείο ή/και την
              κατάψυξη για μεγάλο χρονικό διάστημα. Δεν χρειάζονται
              εξειδικευμένο προσωπικό ή ειδικό εξοπλισμό για την παρασκευή τους."
      :keywords="[
        'βράζουν σε 5\'',
        'μεριδοποιημένα',
        'συσκευασία προστατευτικής ατμόσφαιρας',
      ]"
      :scrollContainer="featured"
      ref="first"
    />
    <featuredPart
      title="πρωτότυπες γεύσεις"
      :invertOrder="true"
      content="Οι συνταγές που έχουμε δημιουργήσει και που μας αρέσει να ανανεώνουμε βασίζονται στην γαστρονομική παράδοση και σέβονται την εποχικότητα των υλικών. Ο συνδυασμός των γεύσεων και των σχημάτων θα ικανοποιήσει και τον πιο απαιτητικό ουρανίσκο. "
      :keywords="['gourmet υλικά', 'μήτρες από μπρούτζο', 'περιέχουν αυγό']"
      :scrollContainer="featured"
      ref="second"
    />
    <featuredPart
      title="custom-made orders"
      content="Η μεγάλη ποικιλία προϊόντων και η ευελιξία στην παραγωγή τους καλύπτει κάθε ιδιαίτερη απαίτηση των πελατών μας ανάλογα με τη χρονική περίοδο, τις διατροφικές συνήθειες αλλά και τις κουζίνες που θα εξυπηρετηθούν. "
      :keywords="['κατά παραγγελία', 'γέμιση παραγωγής του πελάτη']"
      :scrollContainer="featured"
      ref="third"
    />
  </div>
  <div
    class="w-full h-10 bg-primary-700 relative z-[9] drop-shadow-[0_-20px_20px_rgba(0,0,0,0.15)]"
  ></div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";
// @ts-expect-error todo: troubleshoot
import featuredPart from "./featuredPart.vue";

const featured = ref({} as HTMLDivElement);
const first = ref<typeof featuredPart>();
const second = ref<typeof featuredPart>();
const third = ref<typeof featuredPart>();

defineExpose({ steps: [first, second, third] });
</script>
