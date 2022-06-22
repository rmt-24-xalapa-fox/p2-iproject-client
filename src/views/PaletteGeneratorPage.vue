<template>
  <div class="w-full">
    <div class="py-4 px-20 flex">
      <form class="w-1/4" action="" @submit.prevent="generateColorHandler">
        <div class="mt-2 flex gap-6">
          <select
            name="scheme"
            id="scheme"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
            v-model="colorScheme"
          >
            <option value="Monochromatic" selected>Monochromatic</option>
            <option value="Square">Square</option>
            <option value="Triad">Triad</option>
          </select>
          <button
            type="submit"
            class="justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-md font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Random
          </button>
        </div>
      </form>
      <form
        class="ml-8 pl-8 w-1/4 border-l"
        action=""
        @submit.prevent="addPaletteHandler"
      >
        <div class="mt-2 flex gap-6">
          <input
            type="text"
            id="name"
            name="name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
            placeholder="Color palette"
            v-model="name"
          />
          <button
            type="submit"
            class="justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-md font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    <div class="grid grid-cols-5 h-168 z-0">
      <div
        class="bg-red-700 flex items-center justify-center"
        :style="{ 'background-color': colorPalette[0] }"
      >
        <h3 class="text-white text-3xl font-semibold mt-24">
          {{ colorPalette[0] }}
        </h3>
      </div>
      <div
        class="bg-red-600 flex items-center justify-center"
        :style="{ 'background-color': colorPalette[1] }"
      >
        <h3 class="text-white text-3xl font-semibold mt-24">
          {{ colorPalette[1] }}
        </h3>
      </div>
      <div
        class="bg-red-500 flex items-center justify-center"
        :style="{ 'background-color': colorPalette[2] }"
      >
        <h3 class="text-white text-3xl font-semibold mt-24">
          {{ colorPalette[2] }}
        </h3>
      </div>
      <div
        class="bg-red-400 flex items-center justify-center"
        :style="{ 'background-color': colorPalette[3] }"
      >
        <h3 class="text-white text-3xl font-semibold mt-24">
          {{ colorPalette[3] }}
        </h3>
      </div>
      <div
        class="bg-red-300 flex items-center justify-center"
        :style="{ 'background-color': colorPalette[4] }"
      >
        <h3 class="text-white text-3xl font-semibold mt-24">
          {{ colorPalette[4] }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useMainStore } from "../stores/main";

export default {
  name: "PaletteGenerator",
  data() {
    return {
      colorScheme: "Monochromatic",
      name: "",
    };
  },
  computed: {
    ...mapState(useMainStore, ["colorPalette"]),
  },
  methods: {
    ...mapActions(useMainStore, ["generateColor", "addPalette"]),
    generateColorHandler() {
      this.generateColor(this.colorScheme);
    },
    addPaletteHandler() {
      this.addPalette(this.name, this.colorPalette);
    },
  },
  created() {
    this.generateColorHandler();
  },
};
</script>

<style scoped></style>
