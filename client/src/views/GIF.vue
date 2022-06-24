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
    copyUrl() {
      const copy = this.$refs.url.select();
      document.execCommand("copy", false, copy);
    },
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
      <img class="gift-display" :src="gif.images.original.url" alt="" />
      <div>
        <form action="">
          <input
            class="copy-gift"
            type="text"
            ref="url"
            :value="`${gif.images.original.url}`"
          />
          <button class="copy-btn" v-on:click="copyUrl">Copy</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.gift-container {
  margin-top: 300px;
  display: flex;
  flex-wrap: wrap;
}

.gift {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}

button.copy-btn {
  margin-top: 10px;
  background: #e54040;
  color: #fff;
  border: 0;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
  width: 21%;
  height: 40px;
  font-size: 20px;
}

img.gift-display {
  width: 320px;
  height: 320px;
  margin: 10px;
}

input.copy-gift {
  margin: 10px;
  width: 70%;
  height: 40px;
  padding: 10px 5px;
  float: left;
  font: bold 17px "lucida sans", "trebuchet MS", "Tahoma";
  border: 0;
  background: #eee;
  -moz-border-radius: 3px 0 0 3px;
  -webkit-border-radius: 3px 0 0 3px;
  border-radius: 5px;
}
</style>
