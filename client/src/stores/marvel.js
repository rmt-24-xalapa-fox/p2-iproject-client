import { defineStore } from 'pinia'
import { SECRET_KEY, PUBLIC_KEY } from '../API/marvel-api-keys'
import axios from 'axios'
// import { search } from '../../../../p2-iproject-server/routers/marvel-router'

export const useMaarvelStore = defineStore({
  id: 'marvel',
  state: () => ({
    // url: 'https://gateway.marvel.com:443/v1/public/'
    url: 'http://localhost:5550/marvel'
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    //* SEARCH IN GET COMICS
    // async 
  }
})
