import { defineStore } from "pinia";
import axios from "axios"

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    baseUrl: "http://localhost:3000"
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async sendNotif(userEmail) {
      try {
        const response = await axios({
          method: "post",
          url:`${this.baseUrl}/send-notif`,
          data: {
            userEmail
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
    
  },
});
