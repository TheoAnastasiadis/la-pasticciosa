<template>
  <div class="block my-5 mb-10 md:my-20 md:mb-40 relative z-[9]">
    <div class="container">
      <div class="xt-row items-center">
        <div class="w-full z-10">
          <div class="featured-content pt-8 md:pt-0">
            <div>
              <div
                class="text-lg font-semibold leading-7 text-primary-600 text-center md:text-left"
              >
                Εξερευνήστε τον κατάλογό μας
              </div>
              <div class="xt-h2 mt-2 mb-3 md:mb-6 text-center md:text-left">
                Περιγράψτε τις ανάγκες σας.
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row mt-10 items-center align-middle"
            >
              <div class="w-full md:w-6/12 mb-8 md:mb-0 py-24 md:py-0">
                <div
                  class="m-auto rounded-full w-[80%] md:w-[80%] xl:w-[65%] aspect-square bg-[url(/plate.jpg)] bg-cover bg-center shadow-lg shadow-slate-700 relative"
                >
                  <div
                    class="absolute -top-24 -left-9 md:-top-[30px] md:-left-[30px] w-[200px] bg-slate-100 bg-opacity-80 rounded-md shadow-md"
                  >
                    <p class="w-full p-4 font-quicksand font-bold mt-auto">
                      Penne alla primavera
                      <a href="#" class="font-normal underline text-primary-700"
                        >Σύνδεσμος<i class="h h-thumbs-up text-base"></i
                      ></a>
                    </p>
                  </div>
                  <div
                    class="absolute -bottom-[150px] -right-9 md:-bottom-[50px] md:-right-[30px] min-w-[150px] bg-slate-100 bg-opacity-80 rounded-md shadow-md p-4"
                  >
                    <p class="font-light">100+ ευχαριστημένοι πελάτες</p>
                    <figure class="m-0 mt-1.5 mb-3">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Rating_stars_4.5.svg/1024px-Rating_stars_4.5.svg.png"
                        alt="4.5 stars"
                        width="100px"
                      />
                    </figure>
                    <div class="w-full flex flex-row -space-x-2">
                      <div
                        class="w-10 h-10 rounded-full bg-yellow-500 overflow-hidden"
                      >
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBYWzcHUzE9AMh5RUnzwDp9JMy3pPeVu00FsNtZv1Eyw&s"
                          alt="Malconi's"
                        />
                      </div>
                      <div
                        class="w-10 h-10 rounded-full bg-yellow-500 overflow-hidden"
                      >
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsEHgiKPPD7oQwyNsc9iLU6VopxSPZKu5MBtcg5LJ9dA&s"
                          alt="Electra Palace"
                        />
                      </div>
                      <div
                        class="w-10 h-10 rounded-full bg-yellow-400 overflow-hidden"
                      >
                        <img
                          src="https://duepentole.gr/wp-content/uploads/2022/07/cropped-due_pentole-logo.jpg"
                          alt="Due Pentole"
                        />
                      </div>
                      <div
                        class="w-10 h-10 rounded-full bg-yellow-300 border border-slate-200 opacity-90 text-center pt-[8px] text-slate-700 font-semibold"
                      >
                        8+
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-6/12">
                <div
                  class="xt-card shadow-md rounded-2xl text-gray-900 xt-links-default bg-white my-10 md:my-auto"
                >
                  <Form class="p-7 sm:p-9 text-base">
                    <div class="xt-h3 text-center">
                      Επιλογές
                      <i class="h h-edit-3 text-lg"></i>
                    </div>
                    <label class="block mb-3 font-medium text-gray-700">
                      1. Είδος Ζυμαρικού
                    </label>
                    <select
                      class="block w-full xt-select rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-200 transition focus:bg-gray-300 focus:outline-none mb-2"
                      aria-label="Είδος Ζυμαρικού"
                      v-model="typeOption"
                    >
                      <option
                        v-for="option in Object.keys(plateOptions)"
                        :key="option"
                        :value="option"
                      >
                        {{ plateOptions[option]?.name }}
                      </option>
                    </select>
                    <label class="block my-3 font-medium text-gray-700">
                      2. Τύπος Πιάτου
                    </label>
                    <select
                      class="block w-full xt-select rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-200 transition focus:bg-gray-300 focus:outline-none mb-2"
                      aria-label="Είδος Ζυμαρικού"
                      v-model="plateOption"
                    >
                      <option
                        v-for="option in plateOptions[typeOption].options"
                        :key="option"
                        :value="option"
                      >
                        {{ option?.name }}
                      </option>
                    </select>
                    <p class="my-4 transition-all h-max">
                      💡 {{ plateOption?.details }}
                    </p>

                    <div class="w-ful">
                      <button
                        type="submit"
                        class="xt-button mx-auto py-2.5 px-3.5 text-sm rounded-xl font-medium leading-snug tracking-wider uppercase text-white bg-primary-500 transition hover:text-white hover:bg-primary-600 active:text-white active:bg-primary-700 on:text-white on:bg-primary-600 w-full border-2 border-primary-600"
                      >
                        3. ζητηστε προσφορα &nbsp;
                        <i class="h h-discount-euro text-base"></i>
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const plateOptions = ref({
  simple_pasta: {
    name: "Απλά Ζυμαρικά",
    options: [
      {
        name: "Πιάτα για χορτοφάγους",
        details:
          "Τα απλά ζυμαρικά όπως τα σπαγγέτι ή οι πέννες είναι ευέλικτα και μπορούν να συνδυαστούν με διάφορες χορτοφαγικές σάλτσες, όπως μαρινάρα, πριμαβέρα ή πέστο. Αυτά τα πιάτα είναι ιδανικά για χορτοφάγους που αναζητούν ένα γευστικό και ικανοποιητικό γεύμα.",
        image: "https://example.com/spaghetti_marinara.jpg",
      },
      {
        name: "Πιάτα με θαλασσινά",
        details:
          "Τα θαλασσινά συνδυάζονται άριστα με απλά σχήματα ζυμαρικών, όπως τα λιγκουίνι ή τα φετουτσίνι. Δοκιμάστε να ανακατέψετε γαρίδες, χτένια ή μύδια με σκόρδο, ελαιόλαδο και μαϊντανό για ένα νόστιμο πιάτο ζυμαρικών με θαλασσινά.",
        image: "https://example.com/linguine_seafood.jpg",
      },
      {
        name: "Creamy Pasta Dishes",
        details:
          "Οι σάλτσες με βάση την κρέμα, όπως η σάλτσα Alfredo, συμπληρώνουν απλές ποικιλίες ζυμαρικών, όπως το φετουτσίνι ή το ριγκατόνι. Αυτά τα πιάτα είναι πλούσια, απολαυστικά και ιδανικά για όσους επιθυμούν ένα ανακουφιστικό γεύμα.",
        image: "https://example.com/fettuccine_alfredo.jpg",
      },
      {
        name: "Πιάτα με μανιτάρια",
        details:
          "Τα μανιτάρια προσθέτουν γήινη γεύση στα πιάτα ζυμαρικών. Συνδυάστε σάλτσες μανιταριών με σχήματα ζυμαρικών όπως πέννες ή φαρφάλες για ένα ικανοποιητικό γεύμα. Προσθέστε μερικά βότανα και τυρί για επιπλέον γεύση.",
        image: "https://example.com/penne_mushroom_sauce.jpg",
      },
      {
        name: "Πιάτα με βάση την ντομάτα",
        details:
          "Οι σάλτσες με βάση την ντομάτα, όπως η arrabbiata ή η amatriciana, ταιριάζουν με απλά σχήματα ζυμαρικών, όπως τα σπαγγέτι ή τα fusilli. Αυτά τα πιάτα είναι ζωντανά, πικάντικα και ξεχειλίζουν από γεύση.",
        image: "https://example.com/fusilli_arrabbiata.jpg",
      },
    ],
  },
  filled_pasta: {
    name: "Γεμιστά Ζυμαρικά",
    options: [
      {
        name: "Ravioli",
        details:
          "Τα ραβιόλια, γεμισμένα με τυρί, κρέας ή λαχανικά, συνδυάζονται καλά με κρεμώδεις σάλτσες όπως το βούτυρο φασκόμηλου ή η μαρινάρα. Σερβίρετε με πασπαλισμένη παρμεζάνα για ένα κλασικό ιταλικό γεύμα.",
        image: "https://example.com/ravioli_sage_butter.jpg",
      },
      {
        name: "Tortellini",
        details:
          "Είναι νόστιμα σε ζωμούς ή σερβίρονται με κρεμώδεις σάλτσες όπως Alfredo ή σάλτσα βότκα. Γαρνίρετε με φρέσκα μυρωδικά για μια γευστική πινελιά.",
        image: "https://example.com/tortellini_broth.jpg",
      },
      {
        name: "Agnolotti",
        details:
          "Agnolotti, γεμισμένα με κρέας, τυρί ή λαχανικά, είναι ιδανικά για πλούσια πιάτα. Συνδυάστε τα με πλούσιες σάλτσες, όπως μπολονέζ ή σάλτσα κρέμας γκοργκοντζόλα, για ένα ικανοποιητικό γεύμα.",
        image: "https://example.com/agnolotti_bolognese.jpg",
      },
      {
        name: "Tortelloni",
        details:
          "Tortelloni, μεγαλύτερες εκδόσεις των τορτελίνι, είναι ιδανικές για χορταστικά γεύματα. Σερβίρετε με σάλτσες όπως πέστο, ντομάτα ή Alfredo για ένα νόστιμο και ανακουφιστικό πιάτο.",
        image: "https://example.com/tortelloni_pesto.jpg",
      },
      {
        name: "Ζυμαρικά με κρέας",
        details:
          "Τα ζυμαρικά γεμιστά με κρέας, όπως μοσχάρι ή χοιρινό, συνδυάζονται καλά με πλούσιες σάλτσες όπως ραγού ή σάλτσα μανιταριών. Συμπληρώστε με τριμμένη παρμεζάνα για πρόσθετη γεύση.",
        image: "https://example.com/meat-filled_pasta_ragu.jpg",
      },
    ],
  },
});
const typeOption = ref<string>("simple_pasta");
const plateOption = ref(plateOptions.value[typeOption.value].options[0]);

watch(typeOption, (key) => {
  plateOption.value = plateOptions.value[key].options[0];
});
</script>
