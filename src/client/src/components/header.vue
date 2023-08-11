<template>
  <nav
    aria-label="Navigation"
    class="xt-list xt-list-2 mx-auto w-11/12 flex max-w-10xl items-center justify-between mb-5 md:mb-10 container"
  >
    <div class="flex items-baseline">
      <h2 class="text-xl font-bold md:text-2xl">
        La Pasticciosa
        <div
          class="align-middle py-2 px-2.5 text-xs rounded-xl text-gray-900 font-medium leading-snug tracking-wider uppercase bg-primary-200 hidden sm:inline-block shadow-sm"
        >
          B2B Portal
        </div>
      </h2>
    </div>
    <div class="flex items-baseline">
      <div class="xt-5 mr-5 hidden md:block" v-if="userStore.user">
        Καλωσήρθες, {{ userStore.user?.userName }}
      </div>
      <div data-xt-drop="{ position: 'bottom-end', duration: 500 }">
        <button
          class="xt-button rounded-full border-1 md:border-2 p-2 border-slate-300 hover:border-primary-300 w-10 h-10 md:w-12 md:h-12 bg-slate-200 shadow-sm"
          data-xt-drop-element
        >
          <span v-if="!this.userStore.user">&nbsp;</span>
          <i
            class="h text-xl"
            :class="{
              'h-user': !this.userStore.user,
              'h-power': this.userStore.user,
            }"
          ></i>
        </button>
        <div class="xt-drop p-3 group" data-xt-drop-target>
          <div
            class="xt-card w-60 rounded-md shadow-lg bg-slate-100 transition opacity-0 scale-95 group-in:opacity-100 group-in:scale-100 group-out:scale-105 border-1 md:border-2 border-slate-300"
          >
            <nav aria-label="Drop" class="xt-list flex-col p-3">
              <RouterLink
                to="/"
                class="xt-button py-1.5 px-3 text-sm rounded-md flex-auto font-medium leading-snug justify-start text-left transition hover:bg-slate-200 active:bg-slate-200 on:bg-slate-200"
                v-if="this.userStore.user"
              >
                <i class="text-sm h h-user"></i>
                Προβολή Προφίλ
              </RouterLink>
              <a
                @click="logout"
                class="xt-button py-1.5 px-3 text-sm rounded-md flex-auto font-medium leading-snug justify-start text-left transition hover:bg-slate-200 active:bg-slate-200 on:bg-slate-200 text-red-600"
                v-if="this.userStore.user"
              >
                <i class="text-sm h h-logout"></i>
                Αποσύνδεση
              </a>
              <RouterLink
                to="/login"
                class="xt-button py-1.5 px-3 text-sm rounded-md flex-auto font-medium leading-snug justify-start text-left transition hover:bg-slate-200 active:bg-slate-200 on:bg-slate-200"
                v-if="!this.userStore.user"
              >
                <i class="text-sm h h-login"></i>
                Σύνδεση
              </RouterLink>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { mapStores } from "pinia";
import { useUserStore } from "../stores/user";
import { backend } from "../services/backend";

export default {
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async logout() {
      await backend.logOut.query();
      this.userStore.logout();
      this.$router.push("/");
    },
  },
};
</script>
