<script>
import { mapActions, mapWritableState } from "pinia";
import ContentCard from "../components/ContentCard.vue";
import { usePoemStore } from "../stores/poem";

export default {
  name: "Content",
  components: {
    ContentCard,
  },
  methods: {
    ...mapActions(usePoemStore, ["getPoem"])
  },
  computed: {
    ...mapWritableState(usePoemStore, ["poems"])
  },
  created() {
    this.getPoem()
  }
};
</script>
<template>
  <div class="content">
    <ContentCard v-for="poem in poems" :key="poem.id" :poem="poem"/>
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
