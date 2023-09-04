<template>
  <div ref="animated" class="absolute top-[250px] left-[400px] z-above">
    <Pasta :step="step" />
  </div>
  <div class="hero relative overflow-hidden -mt-5" ref="hero">
    <div class="xt-media-container bg-gray-200 w-full h-full absolute">
      <img
        class="xt-media object-cover"
        src="https://images.unsplash.com/photo-1565607052745-35f8c6ba59b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1864&q=80"
        loading="lazy"
        alt=""
      />
      <div
        class="absolute inset-0 bg-gradient-to-l from-black opacity-70"
      ></div>
    </div>
    <div class="flex relative min-h-screen">
      <div
        class="relative px-8 py-16 md:px-24 lg:py-20 xl:py-24 my-auto mx-auto md:mr-0 max-w-2xl text-white xt-links-inverse text-center md:text-right group"
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
    <a href="/" class="featured-item block my-28" ref="secondFeatured">
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
    <a href="/" class="featured-item block my-28" ref="thirdFeatured">
      <div class="container">
        <div class="xt-row items-center">
          <div class="w-full md:w-5/12 z-0">
            <div class="xt-media-container pb-[75%]" ref="wireframe">
              <p
                class="uppercase font-mono text-lg font-semibold relative top-12 left-44"
              >
                Η pasta στα μετρα σας
              </p>
              <div
                class="absolute w-full h-full z-below rounded-md opacity-30 grayscale"
                ref="firstbg"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/b/be/Locator_Grid.png"
                  class="w-full h-full object-cover rounded-2xl grayscale"
                />
              </div>
              <p class="absolute left-6 -bottom-3 font-mono">
                <li>Το σχήμα που ψάχνετε</li>
                <li>Γέμιση κατόπιν παραγγελίας ή δική σας παραγωγής</li>
                <li>Gourmet υλικά & ειδικές ανάγκες</li>
              </p>
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
  <div class="block my-28">
    <div class="container">
      <div class="xt-row items-center">
        <div class="w-full z-10">
          <div class="featured-content pt-16 md:pt-0 md:pl-12">
            <div>
              <div class="text-base font-semibold leading-7 text-primary-600">
                Σας αντιμετωπίζουμε σαν επαγγελματίες
              </div>
              <div class="xt-h2 mb-6 m-0">Περιγράψτε τις ανάγκες σας.</div>
            </div>
            <div class="flex flex-row">
              <div class="w-6/12"></div>
              <div class="w-6/12">
                <div
                  class="xt-card shadow-md rounded-2xl text-gray-900 xt-links-default bg-gray-100"
                >
                  <div class="p-7 sm:p-9 text-base">
                    <div class="xt-h3">Επιλογές</div>
                    <label class="block mb-3 font-medium text-gray-700">
                      Είδος Ζυμαρικού
                    </label>
                    <select
                      class="block w-full xt-select rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
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
                      class="block w-full xt-select rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none"
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
                      class="block w-full h-20 max-h-48 rounded-md py-2.5 px-3.5 text-gray-900 placeholder-black placeholder-opacity-75 bg-gray-100 transition focus:bg-gray-200 focus:outline-none resize-vertical"
                      aria-label="Textarea"
                      placeholder="Textarea"
                    ></textarea>
                    <div class="w-ful">
                      <button
                        type="submit"
                        class="xt-button mx-auto py-2.5 px-3.5 text-sm rounded-md font-medium leading-snug tracking-wider uppercase text-white bg-primary-500 transition hover:text-white hover:bg-primary-600 active:text-white active:bg-primary-700 on:text-white on:bg-primary-600"
                      >
                        ζητηστε προσφορά
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="block my-28 px-10">
    <div class="container bg-white rounded-xl bg-opacity-70">
      <div class="overflow-hidden bg-white py-24 sm:py-32">
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
    <div class="block my-28 px-10">
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
              <div class="w-full lg:w-4/12 px-4 ml-auto">
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
  </div>
</template>
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
      duration: 1.2,
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
      .fromTo(
        wireframe,
        { perspectiveOrigin: "top" },
        { perspectiveOrigin: "right" },
      );

    // animated pasta
    gsap
      .timeline({})
      .from(animated, { rotation: 180, x: -500, duration: 1 })
      .to(animated, {
        left:
          firstFeatured.getBoundingClientRect().left +
          firstFeatured.getBoundingClientRect().width / 2 -
          animated.getBoundingClientRect().width / 2,
        top:
          firstFeatured.getBoundingClientRect().top +
          firstFeatured.getBoundingClientRect().height / 2 -
          animated.getBoundingClientRect().width / 2,
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

    gsap.timeline({}).fromTo(
      animated,
      {
        left:
          firstFeatured.getBoundingClientRect().left +
          firstFeatured.getBoundingClientRect().width / 2 -
          animated.getBoundingClientRect().width / 2,
        top:
          firstFeatured.getBoundingClientRect().top +
          firstFeatured.getBoundingClientRect().height / 2 -
          animated.getBoundingClientRect().width / 2,
      },
      {
        left:
          secondFeatured.getBoundingClientRect().left +
          secondFeatured.getBoundingClientRect().width / 2 +
          animated.getBoundingClientRect().width,
        top:
          secondFeatured.getBoundingClientRect().top +
          secondFeatured.getBoundingClientRect().height / 2 -
          animated.getBoundingClientRect().width / 2,
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
      },
    );

    gsap.timeline({}).fromTo(
      animated,
      {
        left:
          secondFeatured.getBoundingClientRect().left +
          secondFeatured.getBoundingClientRect().width / 2 +
          animated.getBoundingClientRect().width,
        top:
          secondFeatured.getBoundingClientRect().top +
          secondFeatured.getBoundingClientRect().height / 2 -
          animated.getBoundingClientRect().width / 2,
      },
      {
        left:
          thirdFeatured.getBoundingClientRect().left +
          animated.getBoundingClientRect().width / 2,
        top:
          thirdFeatured.getBoundingClientRect().top +
          thirdFeatured.getBoundingClientRect().height / 2 -
          animated.getBoundingClientRect().width / 2,
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
      },
    );
  },
};
</script>
