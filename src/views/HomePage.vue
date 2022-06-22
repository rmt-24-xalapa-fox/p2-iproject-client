<template>
  <div class="my-16 mx-20">
    <div class="grid grid-cols-4 gap-8">
      <PaletteCard />
      <PaletteCard />
      <PaletteCard />
      <PaletteCard />
      <PaletteCard />
      <PaletteCard />
      <PaletteCard />
      <PaletteCard />
    </div>
  </div>
</template>

<script>
import PaletteCard from "../components/PaletteCard.vue";
export default {
  name: "HomePage",
  components: { PaletteCard },
};
</script>

<style scoped></style>
