<script>
import BrowseContentCard from "./BrowseContentCard.vue";

export default {
  name: "BrowseContent",
  components: {
    BrowseContentCard,
  },
};
</script>
<template>
  <div class="content">
    <BrowseContentCard />
    <BrowseContentCard />
    <BrowseContentCard />
    <BrowseContentCard />
    <BrowseContentCard />
    <BrowseContentCard />
    <BrowseContentCard />
    <BrowseContentCard />
    <BrowseContentCard />
    <BrowseContentCard />
    <BrowseContentCard />
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
