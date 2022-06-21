<script>
import { mapActions, mapWritableState } from "pinia";
import { usePoemStore } from "../stores/poem";

export default {
  name: "ReadContentCard",
  methods: {
    ...mapActions(usePoemStore, ["getPoemDetail"]),
  },
  computed: {
    ...mapWritableState(usePoemStore, ["poemDetail"]),
  },
  created() {
    this.getPoemDetail();
  },
};
</script>
<template>
  <div
    class="card text-center mb-3 card-content"
    style="height: 100%; width: 100%"
  >
    <div class="card-body" style="padding-left: 30%; padding-right: 30%">
      <h2 class="card-title">
        <i>{{ poemDetail.title }}</i>
      </h2>
      <p>
        By: {{poemDetail.author}}
      </p>
      <p style="font-size: 20px">
        {{ poemDetail.content }}
      </p>
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
