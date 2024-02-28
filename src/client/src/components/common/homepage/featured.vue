<template>
  <div class="w-[96vw] mx-[2vw] rounded-2xl overflow-clip shadow-xl">
    <div
      class="w-full h-10 bg-[url(/bg.jpg)] brightness-110 relative z-[9] -my-10 drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)]"
    ></div>
    <div
      class="w-full bg-[url(/bg.jpg)] bg-repeat text-white xt-links-inverse pt-10 pb-4 lg:pt-14 lg:pb-14 before:w-full before:h-10 before:bg-yellow-50 shadow-inner overflow-hidden"
      ref="featured"
    >
      <featuredPart
        title="εύκολη διαχείρηση"
        content="Έρχονται μεριδοποιημένα και συσκευασμένα σε
              προστατευτική ατμόσφαιρα για να διατηρούνται στο ψυγείο ή/και την
              κατάψυξη για μεγάλο χρονικό διάστημα. Δεν χρειάζονται
              εξειδικευμένο προσωπικό ή ειδικό εξοπλισμό για την παρασκευή τους."
        :keywords="['βράζουν σε 5\'', 'μεριδοποιημένα', 'συσκευασία MOP']"
        img="https://bmbpack.com/wp-content/uploads/shutterstock_668653645.jpg"
        ref="first"
      />
      <featuredPart
        title="πρωτότυπες γεύσεις"
        :invertOrder="true"
        content="Οι συνταγές που έχουμε δημιουργήσει και που μας αρέσει να ανανεώνουμε βασίζονται στην γαστρονομική παράδοση και σέβονται την εποχικότητα των υλικών. Ο συνδυασμός των γεύσεων και των σχημάτων θα ικανοποιήσει και τον πιο απαιτητικό ουρανίσκο. "
        :keywords="['gourmet υλικά', 'μήτρες από μπρούτζο', 'περιέχουν αυγό']"
        img="https://www.seriouseats.com/thmb/xTXKSBBv_QnU1okvXSdK8mPZ6fU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__07__20150415-colored-pasta-vicky-wasik-18-d8514d00bbf5470d980005fc879eecf2.jpg"
        ref="second"
      />
      <featuredPart
        title="custom-made orders"
        content="Η μεγάλη ποικιλία προϊόντων και η ευελιξία στην παραγωγή τους καλύπτει κάθε ιδιαίτερη απαίτηση των πελατών μας ανάλογα με τη χρονική περίοδο, τις διατροφικές συνήθειες αλλά και τις κουζίνες που θα εξυπηρετηθούν. "
        :keywords="['κατά παραγγελία', 'γέμιση παραγωγής του πελάτη']"
        img="https://yandex-images.clstorage.net/rCf9z8401/d8718eFk50H3/vJJ-Z8l67Nq8FCMJzKD6we4dPc_mRu4MoTkNfPcC6TrBZdU7gSaezHa-yLevrVRGZfQ7b4CPwjYsm6YV9QcFkoi2usO4zymeDaFjifzw2xQ6LCwKRgM_qIT8XCzC4klfx6YXbLYwCXo0TJ91awgU83Cwv-ogOmRA7bnSxLB1IQbsUt50zQquKcpm49s8YAu3Xn9-m4bgnK413s47QNfsG9bXVx5EQdu7BX6dVcrq1xAAgwmIghgXUhs4g8fhdMAk7wEO1L9qnarZlCPYbULrVb5_TSk0o_wed459SmKWjdvEx6Y8FCMZ6nTtf8Vq2KeB0fFKmAHo90MJ2aJH0EYSx-2TzuSPKixp6AchWX-iijRuLj5oNLNdDDWuDZggN61JhtRl3BeBOitUz61XK6qFQmPjuhpweeUj2zrRBIIHofXNAV02buqdCIh3cmmdQDnnft-MmYTxLH9Hz787kRS_2HaFBfxHkdv7h74dFzhLdGNwY5o7cdh1MVkokGYwJ3BGD7Et1b9LDtuYt9GZblAaZex977o2IJ8ORJ6_SeJmHXuVF7ZN5oLp6DacjGYY6ZZT80GriOFoV-CLOnBmgYWiRwzgnyRvO12oqocz2V2iKgSfrC_6l5H__nWcXquhp1_alWcX7BVgeMnmT3_1STtGg5GRmkiw-GWie2tRBRCUYvf8oz_3nTjtGKgloWsOA4pEfH4c2eSDrmwUTF06UoduycTXBO-VQMgrZd5PhPirRrJSQDspElrG4XrY4TayZEHlvFD_Zp6Y_El6NYGIHeCYdS2-PYtnc28cJd-caEK03FjkpkcNlVGJC3ev_oSb6kYAEaGrmMKY1-F6qZE1o1XT9X8QXySvGpwLCrSDCRzxqlVN_dy4ZKPuzLfcD2sQ1dyaNcdV3iUQ-bsmD7y1S_kUMxFxucriO7SwO0iwJYJWMfStYy83jAoP2BjF88osALm0rM2sCFYwnD_0rk8bQ"
        ref="third"
      />
    </div>
    <div
      class="w-full h-10 bg-[url(/bg.jpg)] brightness-110 relative z-[9] drop-shadow-[0_-20px_20px_rgba(0,0,0,0.15)]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import featuredPart from "./featuredPart.vue";

const featured = ref({} as unknown as HTMLDivElement);
const first = ref<typeof featuredPart>();
const second = ref<typeof featuredPart>();
const third = ref<typeof featuredPart>();

defineExpose({ steps: [first, second, third] });
</script>
