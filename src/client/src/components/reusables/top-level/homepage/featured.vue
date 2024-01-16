<template>
  <div
    class="featured w-full bg-primary-800 text-white xt-links-inverse z-10"
    ref="featured"
  >
    <a href="/" class="featured-item block pt-28 mb-28">
      <div class="container">
        <div class="xt-row items-center">
          <div class="w-full md:w-5/12">
            <div class="xt-media-container pb-[75%]">
              <div class="absolute w-full h-full z-[9]" ref="firstbg">
                <img
                  src="/whole.jpg"
                  class="w-full h-full object-cover rounded-2xl absolute top-0 z-20 saturate-50"
                />
              </div>
              <div
                class="absolute w-full h-full rounded-md z-20"
                ref="firstbgCover"
              >
                <img
                  src="/top_refined.png"
                  class="w-full h-full object-cover absolute top-0 z-20 saturate-50"
                />
              </div>
              <div
                class="xt-media border-yellow-200 rounded-2xl border-dashed flex flex-col items-start overflow-hidden z-above"
                ref="first"
              >
                <div
                  class="uppercase font-bold text-2xl opacity-80 whitespace-nowrap"
                  ref="banner1"
                >
                  {{
                    Array(6)
                      .fill("")
                      .map((v) => "Βραζουν σε 5'")
                      .join(" ")
                  }}
                </div>
                <div
                  class="uppercase font-bold text-3xl opacity-70 whitespace-nowrap tracking-wider mt-1"
                  ref="banner2"
                >
                  {{
                    Array(6)
                      .fill("")
                      .map((v) => "ερχονται μεριδοποιμενα στις αναγκες σας")
                      .join(" ")
                  }}
                </div>
                <div
                  class="uppercase font-bold text-3xl opacity-70 whitespace-nowrap tracking-wider mt-auto"
                  ref="banner3"
                >
                  {{
                    Array(6)
                      .fill("")
                      .map(
                        (v) => "συεσκαυασια vacuum προστατευτικης ατμοσφαιρας",
                      )
                      .join(" ")
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-7/12 z-10">
            <div class="featured-content pt-16 md:pt-0 md:pl-12">
              <div class="xt-h1 mb-6 md:-ml-32">Εύκολη διαχείρηση</div>
              <div class="leading-loose">
                <p>
                  <strong>Έρχονται μεριδοποιημένα</strong> και συσκευασμένα σε
                  προστατευτική ατμόσφαιρα για να διατηρούνται στο ψυγείο ή/και
                  την κατάψυξη για μεγάλο χρονικό διάστημα. Δεν χρειάζονται
                  εξειδικευμένο προσωπικό ή ειδικό εξοπλισμό για την παρασκευή
                  τους.
                </p>
                <div
                  class="xt-button button--line px-0 text-xs font-medium leading-snug tracking-wider uppercase"
                >
                  <span
                    class="button--line-design absolute left-0 w-4 border-t border-current opacity-50"
                  ></span>
                  <span class="button--line-content pl-8">
                    ΖΗΤΗΣΤΕ ΠΡΟΣΦΟΡΑ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
    <a href="/" class="featured-item block my-28">
      <div class="container">
        <div class="xt-row items-center">
          <div class="w-full md:w-5/12 z-0 sm:order-2">
            <div class="xt-media-container pb-[75%]">
              <div
                class="xt-media border-yellow-200 border-dashed overflow-hidden flex flex-col justify-between before:bg-gradient-to-r before:from-primary-800 before:to-transparent before:h-full before:w-11 before:absolute before:opacity-100 before:z-above after:bg-gradient-to-l after:from-primary-800 after:to-transparent after:h-full after:w-11 after:absolute after:opacity-100 after:right-0 z-10"
                ref="second"
              >
                <div
                  class="h-1/5 flex flex-row justify-evenly space-x-3"
                  ref="videoBanner1"
                >
                  <div class="h-full aspect-video">
                    <img
                      src="https://img.buzzfeed.com/buzzfeed-static/static/2015-09/28/18/enhanced/webdr09/anigif_enhanced-29919-1443478970-5.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://media.tenor.com/fZrH-b2uqfEAAAAC/pasta-cooking.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://i.pinimg.com/originals/c2/9c/3c/c29c3c434025f3a30128f82ce6eae2b5.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://media.tenor.com/tQiMF_8Wy4YAAAAC/ravioli-pasta.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://img.buzzfeed.com/buzzfeed-static/static/2015-09/28/18/enhanced/webdr09/anigif_enhanced-29919-1443478970-5.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://media.tenor.com/fZrH-b2uqfEAAAAC/pasta-cooking.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://i.pinimg.com/originals/c2/9c/3c/c29c3c434025f3a30128f82ce6eae2b5.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://media.tenor.com/tQiMF_8Wy4YAAAAC/ravioli-pasta.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                </div>
                <img
                  src="/bg2.png"
                  class="absolute h-full w-full object-cover z-below saturate-50"
                />
                <div
                  class="h-1/5 flex mt-auto flex-row-reverse justify-evenly space-x-3"
                  ref="videoBanner2"
                >
                  <div class="h-full aspect-video">
                    <img
                      src="https://img.buzzfeed.com/buzzfeed-static/static/2015-09/28/18/enhanced/webdr09/anigif_enhanced-29919-1443478970-5.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://media.tenor.com/fZrH-b2uqfEAAAAC/pasta-cooking.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://i.pinimg.com/originals/c2/9c/3c/c29c3c434025f3a30128f82ce6eae2b5.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://media.tenor.com/tQiMF_8Wy4YAAAAC/ravioli-pasta.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://img.buzzfeed.com/buzzfeed-static/static/2015-09/28/18/enhanced/webdr09/anigif_enhanced-29919-1443478970-5.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://media.tenor.com/fZrH-b2uqfEAAAAC/pasta-cooking.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://i.pinimg.com/originals/c2/9c/3c/c29c3c434025f3a30128f82ce6eae2b5.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                  <div class="h-full aspect-video">
                    <img
                      src="https://media.tenor.com/tQiMF_8Wy4YAAAAC/ravioli-pasta.gif"
                      class="h-full w-full opacity-75 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-7/12 z-10 sm:order-1">
            <div class="featured-content pt-16 md:pt-0 md:pr-12">
              <div class="xt-h1 mb-6">Πρωτότυπες γεύσεις</div>
              <div class="leading-loose md:-mr-32 md:pl-12">
                <p>
                  Οι συνταγές που έχουμε δημιουργήσει και που μας αρέσει να
                  ανανεώνουμε βασίζονται στην γαστρονομική παράδοση και σέβονται
                  την εποχικότητα των υλικών. Ο συνδυασμός των γεύσεων και των
                  σχημάτων θα ικανοποιήσει και τον πιο απαιτητικό ουρανίσκο.
                </p>
                <div
                  class="xt-button button--line px-0 text-xs font-medium leading-snug tracking-wider uppercase"
                >
                  <span
                    class="button--line-design absolute left-0 w-4 border-t border-current opacity-50"
                  ></span>
                  <span class="button--line-content pl-8">
                    ΛΑΒΕΤΕ ΠΡΟΣΦΟΡΑ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
    <a href="/" class="featured-item block my-28">
      <div class="container pb-28">
        <div class="xt-row items-center">
          <div class="w-full md:w-5/12 z-0">
            <div class="xt-media-container pb-[75%]" ref="third">
              <div
                class="absolute w-full h-full z-below"
                style="perspective: 300px"
              >
                <div class="h-full w-full" ref="wireframe">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    id="eiytRemg6kL1"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    viewBox="0 0 400 400"
                    class="absolute md:scale-y-90 -translate-y-10"
                  >
                    <g transform="translate(-.494038 14.160474)">
                      <path
                        d="M-20,0h40"
                        transform="matrix(6.941021 0 0 1 200.595258 40.108539)"
                        fill="rgba(246,246,246,0)"
                        stroke="#f6f6f6"
                        stroke-dashoffset="2"
                        stroke-dasharray="0.5"
                      />
                      <line
                        x1="-20"
                        y1="0"
                        x2="20"
                        y2="0"
                        transform="matrix(0 0.400289-1 0 336.39197 40.037415)"
                        fill="#f6f6f6"
                        stroke="#f6f6f6"
                      />
                      <line
                        x1="-20"
                        y1="0"
                        x2="20"
                        y2="0"
                        transform="matrix(0 0.400289-1 0 61.572391 40.108539)"
                        fill="#f6f6f6"
                        stroke="#f6f6f6"
                      />
                    </g>
                    <g transform="matrix(0 0.8-1 0 88.072977 42.838221)">
                      <path
                        d="M-20,0h40"
                        transform="matrix(6.941021 0 0 1 200.595258 40.108539)"
                        fill="rgba(246,246,246,0)"
                        stroke="#f6f6f6"
                        stroke-dashoffset="2"
                        stroke-dasharray="0.5"
                      />
                      <line
                        x1="-20"
                        y1="0"
                        x2="20"
                        y2="0"
                        transform="matrix(0 0.400289-1 0 336.39197 40.037415)"
                        fill="#f6f6f6"
                        stroke="#f6f6f6"
                      />
                      <line
                        x1="-20"
                        y1="0"
                        x2="20"
                        y2="0"
                        transform="matrix(0 0.400289-1 0 61.572391 40.108539)"
                        fill="#f6f6f6"
                        stroke="#f6f6f6"
                      />
                    </g>
                    <text
                      dx="0"
                      dy="0"
                      font-family="'mono'"
                      font-size="15"
                      font-weight="400"
                      transform="translate(72.964438 41.72586)"
                      fill="#fff"
                      stroke-width="0"
                    >
                      <tspan y="0" font-weight="400" stroke-width="0">
                        <![CDATA[ H Pasta στα μέτρα σας ]]>
                      </tspan>
                    </text>
                    <text
                      dx="0"
                      dy="0"
                      font-family="mono"
                      font-size="20"
                      font-weight="400"
                      transform="translate(409.001585 44.729127)"
                      stroke-width="0"
                    >
                      <tspan y="0" font-weight="400" stroke-width="0">
                        <![CDATA[ ]]>
                      </tspan>
                    </text>
                    <path
                      d="M-20,0h40"
                      transform="matrix(0 3.534146 0.373476 0 328.107776 273.997347)"
                      fill="rgba(246,246,246,0)"
                      stroke="#f6f6f6"
                      stroke-width="2"
                      stroke-dashoffset="2"
                      stroke-dasharray="3"
                    />
                    <path
                      d="M-20,0h40"
                      transform="matrix(-1.934109 0 0 0.373476 289.425596 203.314427)"
                      fill="rgba(246,246,246,0)"
                      stroke="#f6f6f6"
                      stroke-width="2"
                      stroke-dashoffset="2"
                      stroke-dasharray="3"
                    />
                    <text
                      dx="0"
                      dy="0"
                      font-family='"Noto Sans Mono"'
                      font-size="10"
                      font-weight="400"
                      transform="translate(217.438444 355.275865)"
                      fill="#fff"
                      stroke-width="0"
                    >
                      <tspan y="0" font-weight="400" stroke-width="0">
                        <![CDATA[ Γέμιση κατά παραγγελία ή ]]>
                      </tspan>
                      <tspan x="0" y="10" font-weight="400" stroke-width="0">
                        <![CDATA[ δική σας παραγωγής ]]>
                      </tspan>
                    </text>
                  </svg>
                  <img
                    src="@/assets/wireframe_background.png"
                    class="w-full h-full object-cover grayscale opacity-40"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-7/12 z-10">
            <div class="featured-content pt-16 md:pt-0 md:pl-12">
              <div class="xt-h1 mb-6 md:-ml-32">Custom-made orders</div>
              <div class="leading-loose">
                <p>
                  Η μεγάλη ποικιλία προϊόντων και η ευελιξία στην παραγωγή τους
                  καλύπτει κάθε ιδιαίτερη απαίτηση των πελατών μας ανάλογα με τη
                  χρονική περίοδο, τις διατροφικές συνήθειες αλλά και τις
                  κουζίνες που θα εξυπηρετηθούν.
                </p>
                <div
                  class="xt-button button--line px-0 text-xs font-medium leading-snug tracking-wider uppercase"
                >
                  <span
                    class="button--line-design absolute left-0 w-4 border-t border-current opacity-50"
                  ></span>
                  <span class="button--line-content pl-8">
                    ΠΕΙΤΕ ΜΑΣ ΤΙ ΧΡΕΙΑΖΕΣΤΕ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";

const first = ref({} as HTMLDivElement);
const second = ref({} as HTMLDivElement);
const third = ref({} as HTMLDivElement);

defineExpose({ elements: [first, second, third] });
</script>
