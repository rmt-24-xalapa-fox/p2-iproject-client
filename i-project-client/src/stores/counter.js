import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router/index.js'

export const useMusicYuhu = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
