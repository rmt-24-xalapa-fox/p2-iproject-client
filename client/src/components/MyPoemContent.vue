<script>
import { mapActions, mapWritableState } from "pinia";
import axiosInstance from "../axiosInstance";
import { usePoemStore } from "../stores/poem";
import MyPoemContentCard from "./MyPoemContentCard.vue";

export default {
  name: "MyPoemContent",
  components: {
    MyPoemContentCard,
  },
  methods: {
    ...mapActions(usePoemStore, ["getMyPoem"])
  },
  computed: {
    ...mapWritableState(usePoemStore, ["myPoems"])
  },
  created() {
    this.getMyPoem();
  },
};
</script>
<template>
  <div class="content">
    <MyPoemContentCard v-for="myPoem in myPoems" :key="myPoem.id" :myPoem="myPoem" />
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
