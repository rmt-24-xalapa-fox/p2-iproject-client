<script>
export default {
  name: "ReadBrowseContent",
  components: {
    ReadContentCard
  },
};
</script>
<template>
  <div class="content">
    test
  </div>
</template>

<style scoped>
.content {
  height: 85vh;
  background-color: gray;
  width: 100%;
  padding: 20px;
  /* flex-wrap: wrap;
  overflow-y: auto; */
}

::-webkit-scrollbar {
  width: 0;
}
</style>
