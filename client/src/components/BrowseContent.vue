<script>
import { mapActions, mapWritableState } from "pinia";
import { usePoemStore } from "../stores/poem";
import BrowseContentCard from "./BrowseContentCard.vue";

export default {
  name: "BrowseContent",
  components: {
    BrowseContentCard,
  },
  methods: {
    ...mapActions(usePoemStore, ["getBrowsePoem"]),
  },
  computed: {
    ...mapWritableState(usePoemStore, ["browsePoems"]),
  },
  created() {
    this.getBrowsePoem();
  },
};
</script>
<template>
  <div class="content">
    <!-- {{ browsePoems }} -->
    <BrowseContentCard
      v-for="(poem, index) in browsePoems"
      :key="index"
      :poem="poem"
    />
  </div>
</template>

<style scoped>
.content {
  height: 85vh;
  /* background-color: gray; */
  width: 75%;
  padding: 20px;
  flex-wrap: wrap;
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 0;
}
</style>
