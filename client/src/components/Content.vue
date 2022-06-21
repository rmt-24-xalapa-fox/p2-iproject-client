<script>
import ContentCard from "../components/ContentCard.vue";

export default {
  name: "Content",
  components: {
    ContentCard,
  },
};
</script>
<template>
  <div class="content">
    <ContentCard />
    <ContentCard />
    <ContentCard />
    <ContentCard />
    <ContentCard />
    <ContentCard />
    <ContentCard />
    <ContentCard />
    <ContentCard />
    <ContentCard />
    <ContentCard />
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
