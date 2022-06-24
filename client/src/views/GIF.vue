<script>
import { mapActions, mapWritableState } from "pinia";
import { useMaarvelStore } from "../stores/marvel";

export default {
  name: "GIF",
  computed: {
    ...mapWritableState(useMaarvelStore, [
      "isLogin",
      "isGifs",
      "gifs",
      "isCharacters",
      "isComics",
      "searchDataGif",
      "gifs",
    ]),
  },
  methods: {
    ...mapActions(useMaarvelStore, ["input"]),
  },

  mounted() {
    this.isGifs = true;
    this.isLogin = true;
    this.isCharacters = false;
    this.isComics = false;
    this.searchDataGif = "";
    this.gifs = [];
  },
};
</script>

<template>
  <div class="gift-container">
    <div class="gift" v-for="gif in gifs" :key="gif.id">
    <div>
      <img class="gift-display" :src="gif.images.original.url" alt="" />
      <input class="gift-display" type="text" />
    </div>
    </div>
  </div>
</template>

<style>
.gift-container {
  margin-top: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

img.gift-display {
  width: 300px;
  height: 300px;
  margin: 10px;
}
</style>
