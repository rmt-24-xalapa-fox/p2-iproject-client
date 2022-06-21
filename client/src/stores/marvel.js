import { defineStore } from 'pinia'
import { SECRET_KEY, PUBLIC_KEY } from '../API/marvel-api-keys'
import axios from 'axios'

export const useMaarvelStore = defineStore({
  id: 'marvel',
  state: () => ({
    characters: [],
    comics: [],
    url: 'https://gateway.marvel.com:443/v1/public/'
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async fetchCharacters() {
      try {
        const { data } = await axios.get(`${this.url}/characters?apikey=${PUBLIC_KEY}`)

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
})
