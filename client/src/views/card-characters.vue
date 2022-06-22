<script>
import axios from "axios";
import { mapState } from "pinia";
import { useMaarvelStore } from "../stores/marvel";
import CardCharacters from "../components/cardCharacters.vue";

export default {
  name: "card",
  components: { CardCharacters },

  data() {
    return {
      characters: [],
      urlCharacters: "",
      size: "standard_large.jpg",
      totalCharacters: 0,
      alphabet: "A",
      page: 1,
      totalPage: 0,
    };
  },
  methods: {
    async fetchCharacters() {
      try {
        const { data } = await axios.get(`${this.url}/characters`);
        this.totalCharacters = data.data.total;
        this.totalPage = Math.ceil(this.totalCharacters / 50);

        const result = data.data.results;
        result.forEach((el) => {
          // console.log(el);
          this.characters.push(el);
          el.url = `${el.thumbnail.path}/${this.size}`;
        });
      } catch (error) {
        console.log(error);
      }
    },

    async seachByAlphabet() {
      try {
        this.characters = [];
        this.totalCharacters = 0;
        const { data } = await axios.get(
          `${this.url}/characters?page=${this.page}&name=${this.alphabet}`
        );

        this.totalCharacters = data.data.total;
        this.totalPage = Math.ceil(this.totalCharacters / 50);
        const result = data.data.results;
        result.forEach((el) => {
          this.characters.push(el);
          el.url = `${el.thumbnail.path}/${this.size}`;
        });
      } catch (error) {
        console.log(error);
      }
    },

    changeAlphabet(alphabet) {
      this.alphabet = alphabet;
      this.seachByAlphabet();
    },

    previousPage() {
      this.page = this.page - 1;
      this.seachByAlphabet();
    },

    nextPage() {
      this.page = this.page + 1;
      this.seachByAlphabet();
    },
  },
  computed: {
    ...mapState(useMaarvelStore, ["url"]),
  },

  mounted() {
    this.fetchCharacters();
  },
};
</script>

<template>
  <!-- SEARCH BY ALPHABET  -->
  <div class="pagination">
    <a href="#" v-if="this.page > 1" v-on:click.prevent="previousPage">&laquo;</a>
    <a href="#" v-on:click.prevent="changeAlphabet('A')">A</a>
    <a href="#" v-on:click.prevent="changeAlphabet('B')">B</a>
    <a href="#" v-on:click.prevent="changeAlphabet('C')">C</a>
    <a href="#" v-on:click.prevent="changeAlphabet('D')">D</a>
    <a href="#" v-on:click.prevent="changeAlphabet('E')">E</a>
    <a href="#" v-on:click.prevent="changeAlphabet('F')">F</a>
    <a href="#" v-on:click.prevent="changeAlphabet('G')">G</a>
    <a href="#" v-on:click.prevent="changeAlphabet('H')">H</a>
    <a href="#" v-on:click.prevent="changeAlphabet('I')">I</a>
    <a href="#" v-on:click.prevent="changeAlphabet('J')">J</a>
    <a href="#" v-on:click.prevent="changeAlphabet('K')">K</a>
    <a href="#" v-on:click.prevent="changeAlphabet('L')">L</a>
    <a href="#" v-on:click.prevent="changeAlphabet('M')">M</a>
    <a href="#" v-on:click.prevent="changeAlphabet('N')">N</a>
    <a href="#" v-on:click.prevent="changeAlphabet('O')">O</a>
    <a href="#" v-on:click.prevent="changeAlphabet('P')">P</a>
    <a href="#" v-on:click.prevent="changeAlphabet('Q')">Q</a>
    <a href="#" v-on:click.prevent="changeAlphabet('R')">R</a>
    <a href="#" v-on:click.prevent="changeAlphabet('S')">S</a>
    <a href="#" v-on:click.prevent="changeAlphabet('T')">T</a>
    <a href="#" v-on:click.prevent="changeAlphabet('U')">U</a>
    <a href="#" v-on:click.prevent="changeAlphabet('V')">V</a>
    <a href="#" v-on:click.prevent="changeAlphabet('W')">W</a>
    <a href="#" v-on:click.prevent="changeAlphabet('X')">X</a>
    <a href="#" v-on:click.prevent="changeAlphabet('Y')">Y</a>
    <a href="#" v-on:click.prevent="changeAlphabet('Z')">Z</a>
    <a href="#" v-if="this.page < this.totalPage" v-on:click.prevent="nextPage"
      >&raquo;</a
    >
  </div>
  <!-- DISPLAY CHARACTERS CARD  -->
  <h2>
    <strong
      >All Characters<span class="total-char">( {{ totalCharacters }} )</span></strong
    >
  </h2>

  <div class="cards">
    <CardCharacters
      v-for="(character, i) in characters"
      :key="i"
      :character="character"
    />
  </div>
</template>

<style>
.pagination {
  display: inline-block;
  align-items: center;
  display: flex;
  justify-content: center;
}

.total-char {
  color: whitesmoke;
  font-size: 20px;
}
.pagination a {
  color: whitesmoke;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  font-size: 20px;
}
.abs,
h2:after,
.cards .card figcaption,
.cards .card:after,
.news .card figcaption,
.news .card:after,
.news .article figcaption {
  position: absolute;
}
.rel,
h2,
h2 strong,
.cards .card,
.news .card,
.news .article {
  position: relative;
}
.fix {
  position: fixed;
}
.dfix {
  display: inline;
}
.dib {
  display: inline-block;
}
.db {
  display: block;
}
.dn {
  display: none;
}
.df,
.cards,
.news {
  display: flex;
  /* text-align: center; */
}
.dif {
  display: inline-flex;
}
.dg {
  display: grid;
}
.dig {
  display: inline-grid;
}
.vm,
h2,
h2 strong,
h2 span {
  vertical-align: middle;
}
body {
  background: #24282f;
  /* font-family: "Alegreya Sans"; */
}
.wrapper {
  padding: 15px;
}
h2 {
  padding: 10px;
  padding-left: 25px;
  color: #ccc;
  margin: 0;
}
h2 strong {
  z-index: 2;
  background: #24282f;
  padding: 4px 8px;
}
h2 span {
  font-size: 0.7em;
  color: #aaa;
  margin-left: 10px;
}
h2:after {
  content: "";
  z-index: 1;
  bottom: 50%;
  margin-bottom: -2px;
  height: 2px;
  left: 0;
  right: 0;
  background: #373d47;
}
.cards,
.news {
  flex-flow: row wrap;
  /* text-align: center; */
}
.cards .card,
.news .card {
  margin: 20px;
  width: 180px;
  height: 270px;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.8);
  transform-origin: center top;
  transform-style: preserve-3d;
  transform: translateZ(0);
  transition: 0.3s;
  /* text-align: center; */
}
.cards .card img,
.news .card img {
  width: 100%;
  min-height: 100%;
  /* text-align: center; */
}
.cards .card figcaption,
.news .card figcaption {
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  padding-bottom: 10px;
  font-size: 20px;
  background: none;
  /* color: #fff; */
  color: red;
  transform: translateY(100%);
  transition: 0.3s;
  /* text-align: center; */
  text-align: left;
  /* justify-content: center; */
}
.cards .card:after,
.news .card:after {
  content: "";
  z-index: 10;
  width: 200%;
  height: 100%;
  top: -90%;
  left: -20px;
  opacity: 0.1;
  transform: rotate(45deg);
  background: linear-gradient(to top, transparent, #fff 15%, rgba(255, 255, 255, 0.5));
  transition: 0.3s;
}
.cards .card:hover,
.news .card:hover,
.cards .card:focus,
.news .card:focus,
.cards .card:active,
.news .card:active {
  box-shadow: 0 8px 16px 3px rgba(0, 0, 0, 0.6);
  transform: translateY(-3px) scale(1.05) rotateX(15deg);
}
.cards .card:hover figcaption,
.news .card:hover figcaption,
.cards .card:focus figcaption,
.news .card:focus figcaption,
.cards .card:active figcaption,
.news .card:active figcaption {
  transform: none;
}
.cards .card:hover:after,
.news .card:hover:after,
.cards .card:focus:after,
.news .card:focus:after,
.cards .card:active:after,
.news .card:active:after {
  transform: rotate(25deg);
  top: -40%;
  opacity: 0.15;
}
.news .article {
  overflow: hidden;
  width: 350px;
  height: 235px;
  margin: 20px;
}
.news .article img {
  width: 100%;
  min-height: 100%;
  transition: 0.2s;
}
.news .article figcaption {
  font-size: 14px;
  text-shadow: 0 1px 0 rgba(51, 51, 51, 0.3);
  color: #fff;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 40px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  background: rgba(6, 18, 53, 0.6);
  opacity: 0;
  transform: scale(1.15);
  transition: 0.2s;
}
.news .article figcaption h3 {
  color: #3792e3;
  font-size: 16px;
  margin-bottom: 0;
  font-weight: bold;
}
.news .article:hover img,
.news .article:focus img,
.news .article:active img {
  filter: blur(3px);
  transform: scale(0.97);
}
.news .article:hover figcaption,
.news .article:focus figcaption,
.news .article:active figcaption {
  opacity: 1;
  transform: none;
}
</style>
