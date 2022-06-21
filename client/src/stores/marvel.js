import { defineStore } from 'pinia'
import { SECRET_KEY, PUBLIC_KEY } from '../API/marvel-api-keys'
import axios from 'axios'

export const useMaarvelStore = defineStore({
  id: 'marvel',
  state: () => ({
    url: 'https://gateway.marvel.com:443/v1/public/'
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
  }
})
