<script>
import ReadContentCard from "./ReadContentCard.vue";
export default {
  name: "ReadContent",
  components: {
    ReadContentCard,
  },
};
</script>
<template>
  <div class="content">
    <ReadContentCard />
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
