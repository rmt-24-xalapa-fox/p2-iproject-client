<script>
import axios from "axios";

export default {
  name: "ReadBrowseContentCard",
  data() {
    return {
      poemDetail: [],
    };
  },
  methods: {
    async getBrowseDetail() {
      try {
        const title = localStorage.getItem("selected");
        const { data } = await axios.get(`https://poetrydb.org/title/${title}`);
        this.poemDetail = data[0];
        // console.log(data[0]);
        console.log(this.poemDetail);
        this.poemDetail.lines = this.poemDetail.lines.toString();
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getBrowseDetail();
  },
};
</script>
<template>
  <div
    class="card text-center mb-3 card-content"
    style="height: 100%; width: 100%"
  >
    <div class="card-body" style="padding-left: 20%; padding-right: 20%">
      <h2 class="card-title">
        <i>{{ this.poemDetail.title }}</i>
      </h2>
      <p>By: {{ this.poemDetail.author }}</p>
      <p style="font-size: 20px">{{ this.poemDetail.lines }}</p>
    </div>
  </div>
</template>

<style scoped>
.card-content {
  flex-wrap: wrap;
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 0;
}
</style>
