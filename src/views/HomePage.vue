<template>
  <div class="my-16 mx-20">
    <div class="grid grid-cols-4 gap-8">
      <PaletteCard
        v-for="colorPalette in colorPalettes"
        :key="colorPalette.id"
        :colorPalette="colorPalette"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import PaletteCard from "../components/PaletteCard.vue";
import { useMainStore } from "../stores/main";
export default {
  name: "HomePage",
  components: { PaletteCard },
  computed: {
    ...mapState(useMainStore, ["colorPalettes"]),
  },
  methods: {
    ...mapActions(useMainStore, ["readPalettes"]),
  },
  created() {
    this.readPalettes();
  },
};
</script>

<style scoped></style>
