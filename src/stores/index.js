import axios from 'axios'
import { defineStore } from 'pinia'

const baseUrl = 'http://localhost:3000'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    avatars: [],
    heroes: [],
    heroById: {},
    heroRole: "",
    heroDetailImage: []
  }),
  getters: {

  },
  actions: {
    async fetchHeroes() {
      try {
        const response = await axios.get(`${baseUrl}/heroes`)
        console.log(response.data.hero);
        this.heroes = response.data.hero
      } catch (err) {
        console.log(err);
      }
    },

    async fetchAvatars() {
      try {
        const response = await axios.get(`${baseUrl}/avatars`)
        console.log(response.data, "<<<<<< supabase");
        this.avatars = response.data
      } catch (err) {
        console.log(err);
      }
    },

    async fetchHeroById(id) {
      try {
        const response = await axios.get(`${baseUrl}/hero/${id}`)
        console.log(response.data.hero[0]);
        this.heroById = response.data.hero[0]
      } catch (err) {
        console.log(err);
      }
    },

    async detailImage(id) {
      try {
        const response = await axios.get(`${baseUrl}/detailImage/${id}`)
        console.log(response.data[0]);
        this.heroDetailImage = response.data[0]
      } catch (err) {
        console.log(err);
      }
    },
  }
})
