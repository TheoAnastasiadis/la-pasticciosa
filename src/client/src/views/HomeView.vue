<template>
  <div ref="animated" class="absolute top-[25vh] left-[25vw] z-overlay">
    <Pasta :step="step" />
  </div>
  <div class="hero relative overflow-hidden -mt-5" ref="hero">
    <div class="absolute top-1/2 z-above md:pl-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48px"
        height="24px"
        viewBox="0 0 24 24"
        class="fill-slate-200"
      >
        <path
          d="M5.70711 16.1359C5.31659 16.5264 5.31659 17.1596 5.70711 17.5501L10.5993 22.4375C11.3805 23.2179 12.6463 23.2176 13.4271 22.4369L18.3174 17.5465C18.708 17.156 18.708 16.5228 18.3174 16.1323C17.9269 15.7418 17.2937 15.7418 16.9032 16.1323L12.7176 20.3179C12.3271 20.7085 11.6939 20.7085 11.3034 20.3179L7.12132 16.1359C6.7308 15.7454 6.09763 15.7454 5.70711 16.1359Z"
        />
        <path
          d="M18.3174 7.88675C18.708 7.49623 18.708 6.86307 18.3174 6.47254L13.4252 1.58509C12.644 0.804698 11.3783 0.805008 10.5975 1.58579L5.70711 6.47615C5.31658 6.86667 5.31658 7.49984 5.70711 7.89036C6.09763 8.28089 6.7308 8.28089 7.12132 7.89036L11.307 3.70472C11.6975 3.31419 12.3307 3.31419 12.7212 3.70472L16.9032 7.88675C17.2937 8.27728 17.9269 8.27728 18.3174 7.88675Z"
        />
      </svg>
    </div>
    <div
      class="rounded-full bg-slate-400 bg-opacity-50 w-[200px] md:w-[400px] aspect-square z-above absolute bottom-8 md:top-1/4 left-[20%]"
      ref="preview"
    >
      <div
        class="w-full flex flex-row justify-between px-24 text-xl absolute top-1/2"
      >
        <div class="-translate-x-32 md:-translate-x-36">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            height="1.75rem"
            width="1.75rem"
            version="1.1"
            id="XMLID_287_"
            viewBox="0 0 24 24"
            xml:space="preserve"
            class="fill-white hover:fill-primary-600 rotate-180"
          >
            <g id="next">
              <g>
                <polygon
                  points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12   "
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="translate-x-20 md:translate-x-36">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            height="1.75rem"
            width="1.75rem"
            version="1.1"
            id="XMLID_287_"
            viewBox="0 0 24 24"
            xml:space="preserve"
            class="fill-white hover:fill-primary-600"
          >
            <g id="next">
              <g>
                <polygon
                  points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12   "
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        class="animate-spin-slow"
      >
        <path
          id="circlePath"
          fill="none"
          stroke-width="0"
          stroke="hsl(0 100% 50% / 0.5)"
          d="
          M 10, 50
          a 40,40 0 1,1 80,0
          a 40,40 0 1,1 -80,0
        "
        />
        <text id="text" font-size="5" fill="white" method="stretch">
          <textPath id="textPath" href="#circlePath">
            Πραγματικά 3D Scans από το εργαστήριο μας!
          </textPath>
        </text>
        <text id="text" font-size="5" fill="black" method="stretch">
          <textPath id="textPath" href="#circlePath" startOffset="55%">
            Εξερευνήστε τον κατάλογο μας.
          </textPath>
        </text>
      </svg>
    </div>
    <div
      class="xt-media-container bg-gray-200 w-full h-full absolute pb-48 md:pb-0"
      id="hero_image"
    >
      <img
        class="xt-media object-cover"
        src="https://images.unsplash.com/photo-1565607052745-35f8c6ba59b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1864&q=80"
        loading="lazy"
        alt=""
      />
      <div
        class="absolute inset-0 bg-gradient-to-l from-primary-700 opacity-50"
      ></div>
    </div>
    <div class="flex relative min-h-screen">
      <div
        class="relative px-8 py-16 md:px-24 lg:py-20 xl:py-24 mt-[100px] mb-[200px] md:my-auto mx-auto md:mr-0 max-w-2xl text-white xt-links-inverse text-center md:text-right group"
      >
        <h2 class="xt-h1 normal-case">
          Εξελίξτε το μενού σας με φρέσκα ζυμαρικά!
        </h2>
        <h3 class="xt-p">
          Με τα προϊόντα μας μπορείτε να δημιουργήσετε ευφάνταστα πιάτα που θα
          προσελκύσουν νέους πελάτες αλλά θα κάνουν και τους υπάρχοντες να
          έρχονται συχνότερα.
        </h3>
        <a
          href="/"
          class="xt-button py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-white bg-primary-500 transition hover:text-white hover:bg-primary-600 active:text-white active:bg-primary-700 on:text-white on:bg-primary-600"
        >
          Ζητηστε προσφορα
        </a>
      </div>
    </div>
  </div>
  <div
    class="featured inline-block w-full bg-primary-800 text-white xt-links-inverse"
    ref="featured"
  >
    <a href="/" class="featured-item block my-28">
      <div class="container">
        <div class="xt-row items-center">
          <div class="w-full md:w-5/12 z-0">
            <div class="xt-media-container pb-[75%]">
              <div
                class="absolute w-full h-full z-below rounded-md opacity-30 grayscale"
                ref="firstbg"
              >
                <img
                  src="https://www.henkelman.com/media/1014/application-hero-2-2x.jpg?anchor=center&mode=crop&width=2800&height=1760&rnd=132259759480000000"
                  class="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div
                class="xt-media border-yellow-200 rounded-2xl border-dashed flex flex-col items-start overflow-hidden"
                ref="firstFeatured"
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
                class="xt-media border-yellow-200 border-dashed overflow-hidden flex flex-col justify-between before:bg-gradient-to-r before:from-primary-800 before:to-transparent before:h-full before:w-11 before:absolute before:opacity-100 before:z-above after:bg-gradient-to-l after:from-primary-800 after:to-transparent after:h-full after:w-11 after:absolute after:opacity-100 after:right-0"
                ref="secondFeatured"
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
      <div class="container">
        <div class="xt-row items-center">
          <div class="w-full md:w-5/12 z-0">
            <div class="xt-media-container pb-[75%]" ref="thirdFeatured">
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
  <div class="block my-5 md:my-28">
    <div class="container">
      <div class="xt-row items-center">
        <div class="w-full z-10">
          <div class="featured-content pt-8 md:pt-0 md:pl-12">
            <div>
              <div class="text-base font-semibold leading-7 text-primary-600">
                Σας αντιμετωπίζουμε σαν επαγγελματίες
              </div>
              <div class="xt-h2 mt-0 mb-3 md:mb-6">
                Περιγράψτε τις ανάγκες σας.
              </div>
            </div>
            <div class="flex flex-col md:flex-row" ref="catalogueExplore">
              <div class="w-full md:w-6/12 mb-8 md:mb-0">
                <div
                  class="m-auto mt-12 rounded-full w-[80%] md:w-[50%] aspect-square bg-white shadow-xl shadow-slate-200"
                  ref="stage"
                >
                  <div class="relative top-full w-full text-center py-2">
                    Περιγραφή
                  </div>
                </div>
              </div>
              <div class="w-full md:w-6/12">
                <div
                  class="xt-card shadow-md rounded-2xl text-gray-900 xt-links-default bg-gray-100 my-10 md:my-auto"
                >
                  <Form class="p-7 sm:p-9 text-base">
                    <div class="xt-h3">Επιλογές</div>
                    <label class="block mb-3 font-medium text-gray-700">
                      Είδος Ζυμαρικού
                    </label>
                    <select
                      class="block w-full xt-select rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-200 transition focus:bg-gray-300 focus:outline-none mb-2"
                      aria-label="Είδος Ζυμαρικού"
                    >
                      <option selected value="">Είδος Ζυμαρικού</option>
                      <option>Απλό</option>
                      <option>Γεμιστό</option>
                    </select>
                    <label class="block mb-3 font-medium text-gray-700">
                      Τύπος Πιάτου
                    </label>
                    <select
                      class="block w-full xt-select rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-200 transition focus:bg-gray-300 focus:outline-none mb-2"
                      aria-label="Είδος Ζυμαρικού"
                    >
                      <option selected value="">Είδος Ζυμαρικού</option>
                      <option>Απλό</option>
                      <option>Γεμιστό</option>
                    </select>
                    <label class="block mb-3 font-medium text-gray-700">
                      Γέμιση
                    </label>
                    <textarea
                      class="block w-full h-20 max-h-48 rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-200 transition focus:bg-gray-300 focus:outline-none resize-vertical mb-2"
                      aria-label="Textarea"
                      placeholder="Textarea"
                    ></textarea>
                    <div class="w-ful">
                      <button
                        type="submit"
                        class="xt-button mx-auto py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-white bg-primary-500 transition hover:text-white hover:bg-primary-600 active:text-white active:bg-primary-700 on:text-white on:bg-primary-600 w-full md:w-auto"
                      >
                        ζητηστε προσφορα
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
  <div class="block my-5 md:my-28 px-0 md:px-10">
    <div class="container bg-white rounded-none md:rounded-xl">
      <div class="overflow-hidden bg-white py-10 md:py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
          >
            <div class="lg:pr-8 lg:pt-4">
              <div class="lg:max-w-lg">
                <h2 class="text-base font-semibold leading-7 text-primary-600">
                  Σας αντιμετωπίζουμε σαν επαγγελματίες
                </h2>
                <p
                  class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                >
                  Σύγχρονη πλατφόρμα B2B
                </p>
                <p class="mt-6 text-lg leading-8 text-gray-600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </p>
                <dl
                  class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"
                >
                  <div class="relative pl-9">
                    <dt class="inline font-semibold text-gray-900">
                      <svg
                        class="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Push to deploy.
                    </dt>
                    <dd class="inline">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Maiores impedit perferendis suscipit eaque, iste dolor
                      cupiditate blanditiis ratione.
                    </dd>
                  </div>
                  <div class="relative pl-9">
                    <dt class="inline font-semibold text-gray-900">
                      <svg
                        class="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      SSL certificates.
                    </dt>
                    <dd class="inline">
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                      irure qui lorem cupidatat commodo.
                    </dd>
                  </div>
                  <div class="relative pl-9">
                    <dt class="inline font-semibold text-gray-900">
                      <svg
                        class="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Database backups.
                    </dt>
                    <dd class="inline">
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <img
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              alt="Product screenshot"
              class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width="2432"
              height="1442"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="block mt-8 mb-0 md:mb-8 md:mt-28 px-0 md:px-10">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap text-left lg:text-left">
        <div class="w-full lg:w-6/12 px-4">
          <h4 class="text-3xl">Ας έρθουμε σε επικοινωνία!</h4>
          <h5 class="text-lg mt-0 mb-2">
            Επικοινωνήστε σε οποιοδήποτε από τα παρακάτω δίκτυα, και θα σας
            απαντήσουμε άμεσα!
          </h5>
          <div class="mt-6 lg:mb-0 mb-6">
            <button
              class="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i class="fab fa-twitter"></i></button
            ><button
              class="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i class="fab fa-facebook-square"></i></button
            ><button
              class="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i class="fab fa-dribbble"></i></button
            ><button
              class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <i class="fab fa-github"></i>
            </button>
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="flex flex-wrap items-top mb-6">
            <div class="w-full lg:w-4/12 px-4 ml-auto mb-3">
              <span class="block uppercase text-sm font-semibold mb-2"
                >Χρήσιμοι Σύνδεσμοι</span
              >
              <ul class="list-unstyled">
                <li>
                  <a
                    class="pb-2 text-sm hover:text-primary-500"
                    href="https://www.creative-tim.com/presentation?ref=njs-profile"
                    >About Us</a
                  >
                </li>
                <li>
                  <a
                    class="pb-2 text-sm hover:text-primary-500"
                    href="https://www.creative-tim.com/presentation?ref=njs-profile"
                    >About Us</a
                  >
                </li>
                <li>
                  <a
                    class="pb-2 text-sm hover:text-primary-500"
                    href="https://www.creative-tim.com/presentation?ref=njs-profile"
                    >About Us</a
                  >
                </li>
                <li>
                  <a
                    class="pb-2 text-sm hover:text-primary-500"
                    href="https://www.creative-tim.com/presentation?ref=njs-profile"
                    >About Us</a
                  >
                </li>
              </ul>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <span
                class="block uppercase text-blueGray-500 text-sm font-semibold mb-2"
                >Περισσότερα</span
              >
              <ul class="list-unstyled">
                <li>
                  <a
                    class="pb-2 text-sm hover:text-primary-500"
                    href="https://www.creative-tim.com/presentation?ref=njs-profile"
                    >About Us</a
                  >
                </li>
                <li>
                  <a
                    class="pb-2 text-sm hover:text-primary-500"
                    href="https://www.creative-tim.com/presentation?ref=njs-profile"
                    >About Us</a
                  >
                </li>
                <li>
                  <a
                    class="pb-2 text-sm hover:text-primary-500"
                    href="https://www.creative-tim.com/presentation?ref=njs-profile"
                    >About Us</a
                  >
                </li>
                <li>
                  <a
                    class="pb-2 text-sm hover:text-primary-500"
                    href="https://www.creative-tim.com/presentation?ref=njs-profile"
                    >About Us</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#hero_image:after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(127, 127, 127, 0.5);
  background-image: radial-gradient(rgba(0, 0, 0, 0.3) 10%, transparent 33%);
  background-size: 6px 6px;
}
</style>

<script lang="ts">
import Pasta from "../components/reusables/interactives/pasta.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger);

export default {
  components: { Pasta },
  data: () => ({ step: 0 }),
  mounted() {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const {
      animated,
      firstFeaturedContainer,
      firstFeatured,
      secondFeatured,
      thirdFeatured,
      hero,
      banner1,
      banner2,
      banner3,
      firstbg,
      videoBanner1,
      videoBanner2,
      wireframe,
      catalogueExplore,
      stage,
      preview,
    } = this.$refs;

    // first featured banners animation
    gsap
      .timeline({ scrollTrigger: { trigger: banner1, start: "top center" } })
      .from(banner1, { opacity: 0, duration: 6 }, 0)
      .to(
        banner1,
        {
          x: -banner1.offsetWidth / 6,
          repeat: -1,
          duration: 5,
          ease: "linear",
        },
        0,
      )
      .from(banner2, { opacity: 0, duration: 6 }, 0)
      .to(
        banner2,
        {
          x: -banner2.offsetWidth / 6,
          repeat: -1,
          duration: 15,
          ease: "linear",
        },
        0,
      )
      .from(banner3, { opacity: 0, duration: 3 }, 1)
      .to(
        banner3,
        {
          x: -banner3.offsetWidth / 6,
          repeat: -1,
          duration: 10,
          ease: "linear",
        },
        0,
      );

    // first featured background animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: firstFeatured,
          scrub: true,
        },
      })
      .fromTo(firstbg, { x: -100, y: -100 }, { x: 50, y: 50 });

    // second featured video animation
    gsap
      .timeline({ scrollTrigger: { trigger: secondFeatured }, repeat: -1 })
      .to(
        videoBanner1,
        { x: -videoBanner1.offsetWidth / 2, duration: 8, ease: "linear" },
        0,
      )
      .to(
        videoBanner2,
        { x: +videoBanner2.offsetWidth / 2, duration: 8, ease: "linear" },
        0,
      );

    // wireframe animation
    gsap
      .timeline({ scrollTrigger: { trigger: thirdFeatured, scrub: true } })
      .fromTo(wireframe, { rotateX: -5 }, { rotateX: 15 });

    // catalogue explore animation
    gsap.from(stage, {
      scale: 0,
      duration: 2,
      scrollTrigger: {
        trigger: catalogueExplore,
      },
    });

    // animated pasta
    const previewPosition = {
      left:
        preview.getBoundingClientRect().left +
        (preview.offsetWidth - animated.offsetWidth) / 2,
      top:
        preview.getBoundingClientRect().top +
        window.scrollY +
        (preview.offsetHeight - animated.offsetHeight) / 2,
    };

    const firstFeaturedPosition = {
      left:
        firstFeatured.getBoundingClientRect().left +
        (firstFeatured.offsetWidth - animated.offsetWidth) / 2,
      top:
        firstFeatured.getBoundingClientRect().top +
        window.scrollY +
        (firstFeatured.offsetHeight - animated.offsetHeight) / 2,
    };

    const secondFeaturedPosition = {
      left:
        secondFeatured.getBoundingClientRect().left +
        (firstFeatured.offsetWidth - animated.offsetWidth) / 2,
      top:
        secondFeatured.getBoundingClientRect().top +
        window.scrollY +
        (secondFeatured.offsetHeight - animated.offsetHeight) / 2,
    };

    const thirdFeaturedPosition = {
      left:
        thirdFeatured.getBoundingClientRect().left +
        (firstFeatured.offsetWidth - animated.offsetWidth) / 2,
      top:
        thirdFeatured.getBoundingClientRect().top +
        window.scrollY +
        (thirdFeatured.offsetHeight - animated.offsetHeight) / 2,
    };

    const stagePosition = {
      left:
        stage.getBoundingClientRect().left -
        stage.offsetWidth / 2 -
        Math.abs(stage.offsetWidth - animated.offsetWidth) / 2,
      top:
        stage.getBoundingClientRect().top +
        window.scrollY -
        stage.offsetHeight / 2 -
        Math.abs(stage.offsetHeight - animated.offsetHeight) / 2,
    };
    console.log(stage.getBoundingClientRect(), stage.offsetWidth);
    console.log(stagePosition);

    gsap.to(animated, { ...previewPosition, duration: 1 });

    gsap.timeline({}).fromTo(animated, previewPosition, {
      ...firstFeaturedPosition,
      scrollTrigger: {
        trigger: firstFeatured,
        start: "top bottom",
        end: "25% center",
        toggleActions: "play pause resume reset",
        scrub: 0.5,
        markers: false,
      },
      onComplete: () => {
        this.step = 1;
      },
      onReverseComplete: () => {
        this.step = 0;
      },
    });

    gsap.timeline({}).fromTo(animated, firstFeaturedPosition, {
      ...secondFeaturedPosition,
      scrollTrigger: {
        trigger: secondFeatured,
        start: "top center",
        end: "20% center",
        toggleActions: "play pause resume reset",
        scrub: 0.5,
        markers: false,
      },
      onComplete: () => {
        this.step = 2;
      },
      onReverseComplete: () => {
        this.step = 1;
      },
    });

    gsap.timeline({}).fromTo(animated, secondFeaturedPosition, {
      ...thirdFeaturedPosition,
      scrollTrigger: {
        trigger: thirdFeatured,
        start: "top center",
        end: "20% center",
        toggleActions: "play pause resume reset",
        scrub: 0.5,
        markers: false,
      },
      onComplete: () => {
        this.step = 3;
      },
      onReverseComplete: () => {
        this.step = 2;
      },
    });

    gsap.timeline({}).fromTo(animated, thirdFeaturedPosition, {
      ...stagePosition,
      scrollTrigger: {
        trigger: catalogueExplore,
        toggleActions: "play pause resume reset",
        start: "top center",
        end: "20% center",
        scrub: 0.5,
        markers: false,
      },
      onComplete: () => {
        this.step = 4;
      },
      onReverseComplete: () => {
        this.step = 3;
      },
    });
  },
};
</script>
