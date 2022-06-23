<script>
import ReadBrowseContentCard from "./ReadBrowseContentCard.vue";
export default {
  name: "ReadBrowseContent",
  components: {
    ReadBrowseContentCard,
  },
};
</script>
<template>
  <div class="content">
    <ReadBrowseContentCard />
  </div>
</template>

<style scoped>
.content {
  height: 85vh;
  /* background-color: gray; */
  width: 60%;
  padding: 20px;
  /* flex-wrap: wrap;
  overflow-y: auto; */
}

::-webkit-scrollbar {
  width: 0;
}
</style>
