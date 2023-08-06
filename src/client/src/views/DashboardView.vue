<template>
  <div>
    <div class="max-w-7xl mx-auto">
      <div data-xt-toggle="{ min: 1, duration: 500 }">
        <div class="xt-row xt-row-4 md:xt-row-8">
          <div class="w-full md:w-3/12">
            <div
              class="xt-card p-2 rounded-2xl text-gray-900 xt-links-default bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm backdrop-saturate-50"
            >
              <nav aria-label="Navigation" class="xt-list xt-list-1 flex-col">
                <a
                  role="button"
                  class="xt-button flex-auto py-1.5 px-3 text-sm rounded-2xl font-medium leading-snug justify-start text-left transition hover:bg-white hover:text-primary-500 active:text-white active:bg-primary-500 on:text-white on:bg-primary-500"
                  data-xt-toggle-element
                  data-xt-hash="description"
                >
                  <i class="h h-truck text-sm mr-2"></i>
                  Παραγγελίες
                </a>
                <a
                  role="button"
                  class="xt-button flex-auto py-1.5 px-3 text-sm rounded-2xl font-medium leading-snug justify-start text-left transition hover:bg-white hover:text-primary-500 active:text-white active:bg-primary-500 on:text-white on:bg-primary-500"
                  data-xt-toggle-element
                  data-xt-hash="users"
                >
                  <i class="h h-users text-sm mr-2"></i>
                  Χρήστες
                </a>
                <a
                  role="button"
                  class="xt-button flex-auto py-1.5 px-3 text-sm rounded-2xl font-medium leading-snug justify-start text-left transition hover:bg-white hover:text-primary-500 active:text-white active:bg-primary-500 on:text-white on:bg-primary-500"
                  data-xt-toggle-element
                  data-xt-hash="items"
                >
                  <i class="h h-package text-sm mr-2"></i>
                  Προϊόντα</a
                >
                <a
                  role="button"
                  class="xt-button flex-auto py-1.5 px-3 text-sm rounded-2xl font-medium leading-snug justify-start text-left transition hover:bg-white hover:text-primary-500 active:text-white active:bg-primary-500 on:text-white on:bg-primary-500"
                  data-xt-toggle-element
                  data-xt-hash="manuals"
                  ><i class="h h-book text-sm mr-2"></i> Βοήθεια</a
                >
              </nav>
            </div>
          </div>

          <div class="w-full md:w-9/12">
            <div
              class="off:hidden out:pointer-events-none transition opacity-0 scale-95 in:opacity-100 in:scale-100 out:scale-105"
              data-xt-toggle-target
            >
              <div
                class="xt-card rounded-2xl p-6 sm:p-8 text-sm text-gray-900 xt-links-default bg-white"
              >
                <div class="xt-h5">Description</div>
                <p>
                  <strong>Lorem ipsum</strong> dolor sit amet,
                  <a href="/">consectetur adipiscing</a> elit. Nullam suscipit,
                  velit eu tristique mollis, dui felis dictum turpis, a auctor
                  est odio ac diam. Sed mauris augue, sagittis vitae magna eget,
                  vehicula scelerisque elit.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris mattis purus odio, et dictum felis vestibulum sed.
                  Morbi sodales ex sed dui posuere, a tempor purus consectetur.
                  Curabitur vitae leo at magna aliquam pellentesque. Nam sed
                  neque in risus volutpat maximus. Sed vitae enim vehicula,
                  lacinia orci at, pretium nulla. Cras tincidunt quis ipsum et
                  luctus. Cras venenatis, justo in euismod lacinia, urna leo
                  hendrerit enim, sit amet gravida nunc lectus id augue. Nullam
                  dolor nibh, commodo at commodo eget, iaculis non diam. Ut at
                  rhoncus massa. Sed placerat tincidunt nisl, eu consequat neque
                  pretium at. Cras et facilisis leo. Mauris justo elit,
                  porttitor sed pellentesque vitae, imperdiet nec ante. Nulla
                  quis tempus risus, a aliquet ligula.
                </p>
              </div>
            </div>

            <div
              class="off:hidden out:pointer-events-none transition opacity-0 scale-95 in:opacity-100 in:scale-100 out:scale-105"
              data-xt-toggle-target
            >
              <div
                class="xt-card rounded-2xl p-6 sm:p-8 text-sm text-gray-900 xt-links-default bg-white"
              >
                <div class="xt-h5">Χρήστες</div>
                <usersTable />
              </div>
            </div>

            <div
              class="off:hidden out:pointer-events-none transition opacity-0 scale-95 in:opacity-100 in:scale-100 out:scale-105"
              data-xt-toggle-target
            >
              <div
                class="xt-card rounded-2xl p-6 sm:p-8 text-sm text-gray-900 xt-links-default bg-white"
              >
                <div class="xt-h5">Προϊόντα</div>
                <itemsEditor />
              </div>
            </div>

            <div
              class="off:hidden out:pointer-events-none transition opacity-0 scale-95 in:opacity-100 in:scale-100 out:scale-105"
              data-xt-toggle-target
            >
              <div
                class="xt-card rounded-2xl p-6 sm:p-8 text-sm text-gray-900 xt-links-default bg-white"
              >
                <div class="xt-h5">Manuals</div>
                <p>
                  <strong>Lorem ipsum</strong> dolor sit amet,
                  <a href="/">consectetur adipiscing</a> elit. Nullam suscipit,
                  velit eu tristique mollis, dui felis dictum turpis, a auctor
                  est odio ac diam. Sed mauris augue, sagittis vitae magna eget,
                  vehicula scelerisque elit.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris mattis purus odio, et dictum felis vestibulum sed.
                  Morbi sodales ex sed dui posuere, a tempor purus consectetur.
                  Curabitur vitae leo at magna aliquam pellentesque. Nam sed
                  neque in risus volutpat maximus. Sed vitae enim vehicula,
                  lacinia orci at, pretium nulla. Cras tincidunt quis ipsum et
                  luctus. Cras venenatis, justo in euismod lacinia, urna leo
                  hendrerit enim, sit amet gravida nunc lectus id augue. Nullam
                  dolor nibh, commodo at commodo eget, iaculis non diam. Ut at
                  rhoncus massa. Sed placerat tincidunt nisl, eu consequat neque
                  pretium at. Cras et facilisis leo. Mauris justo elit,
                  porttitor sed pellentesque vitae, imperdiet nec ante. Nulla
                  quis tempus risus, a aliquet ligula.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import usersTable from "../components/usersTable.vue";
import itemsEditor from "../components/itemsEditor.vue";
export default {
  components: { usersTable, itemsEditor },
};
</script>
