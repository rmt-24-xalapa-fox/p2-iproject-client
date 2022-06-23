import { defineStore } from 'pinia'
import axios from 'axios'

export const useMaarvelStore = defineStore({
  id: 'marvel',
  state: () => ({
    url: 'http://localhost:5550/marvel',
    // url: 'https://redmarvel24.herokuapp.com/marvel',
    characterId: 0,
    character: [],
    characters: [],
    comics: [],
    imageUrl: '',
    name: '',
    description: '',
    isComics: false,
    isCharacters: false,
    isLogin: false,
    currentPage: 1,
    totalPage: 0,
    totalComics: 0,
    alphabet: "A",
    pageComics: 1,
    comicSize: "portrait_xlarge.jpg",
    ID_Comic: 0,
    year: "",
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

    async fetchComics() {
      try {
        this.comics = [];
        const { data } = await axios.get(
          `${this.url}/comics?page=${this.pageComics}&year=${Number(this.year)}`
        );

        console.log(data);
        this.totalComics = data.data.total;
        this.totalPage = Math.ceil(this.totalComics / 20);

        const result = data.data.results;

        result.forEach((el) => {
          this.comics.push(el);
          el.url = `${el.thumbnail.path}/${this.comicSize}`;
        });
        this.year = "";
      } catch (error) {
        console.log(error);
      }
    },

    async getDetailComics(id) {
      try {
        console.log(id, 'okeeeeeee');
        const { data } = await axios.get(
          `${this.url}/comics/${id}`
        );
        console.log(data);

      } catch (error) {
        console.log(error);
      }
    }
  }
})
