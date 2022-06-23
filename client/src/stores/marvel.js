import { defineStore } from 'pinia'
import axios from 'axios'

export const useMaarvelStore = defineStore({
  id: 'marvel',
  state: () => ({
    url: 'http://localhost:5550/marvel',
    characterId: 0,
    character: [],
    characters: [],
    imageUrl: '',
    name:'',
    description: '',
    isComics: false,
    isCharacters: false,
    currentPage: 1,
    totalPage: 0,
    alphabet: "A",
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    //* GET DETAIL
    async seachByAlphabet() {
      try {
        console.log(this.alphabet);
        this.characters = [];
        this.totalCharacters = 0;
        const { data } = await axios.get(
          `${this.url}/characters?page=${this.currentPage}&name=${this.alphabet}`
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
  }
})
