import axios from 'axios'
import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsYXB5c3NiZXplY3NjeXpyYWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU4NjYyOTMsImV4cCI6MTk3MTQ0MjI5M30.Xu8VZ7py66loGQAhKWCdyt6nciQlqpzJJ1aNej5P_Iw'
const SUPABASE_URL = "https://klapyssbezecscyzrajq.supabase.co"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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

    async loginHandler(email) {
      try {
        const user = await supabase.auth.signIn({
          email
        })
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    }
  }
})
