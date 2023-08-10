<template>
  <div
    :draggable="!!dragId"
    @dragstart="onDrag($event, dragId)"
    @dragend="onDrop(dragId)"
  >
    <a
      @click="$emit('click')"
      class="xt-button py-1.5 px-3 my-1 text-sm transition hover:bg-primary-300 hover:bg-opacity-25 active:text-white active:bg-primary-500 on:text-white on:bg-primary-500 w-full"
      :class="{ 'opacity-10': dragged, 'cursor-move': dragId }"
    >
      <div
        class="xt-list xt-list-3 flex-auto items-center justify-start text-left flex-nowrap"
      >
        <div
          class="bg-primary-100 rounded-md text-white xt-links-inverse"
          :class="{ 'p-2': typeof src === 'undefined' }"
        >
          <i
            class="xt-icon h h-user-checked text-xs"
            :class="actionClasses"
            v-if="!src"
          ></i>
          <div
            class="h-10 w-10 bg-primary-100 rounded-md text-white xt-links-inverse"
            v-else
          >
            <img
              :src="src"
              class="w-full h-full object-cover rounded-md"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <div class="font-medium">{{ title }}</div>
          <div class="text-xs opacity-50">
            {{ subtitle }}
          </div>
        </div>
        <div class="ml-auto" v-if="extensionIcon">
          <i
            class="text-slate-300 text-base h justify-self-end"
            :class="`h-${extensionIcon}`"
          ></i>
        </div>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    icon: String,
    iconColor: String,
    title: String,
    subtitle: String,
    src: String,
    extensionIcon: String,
    dragId: String,
  },
  data: () => ({
    dragged: false,
  }),
  computed: {
    actionClasses() {
      if (this.icon)
        return [`h-${this.icon}`, `text-${this.iconColor || "black"}`];
      else return [];
    },
  },
  emits: ["click", "draggingStarted", "draggingEnded"],
  methods: {
    onDrag(evt, id) {
      this.dragged = true;
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemId", id);
      this.$emit("draggingStarted", id);
    },
    onDrop(id) {
      this.dragged = false;
      this.$emit("draggingEnded", id);
    },
  },
};
</script>
