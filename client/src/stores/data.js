import { defineStore } from "pinia";
import axios from "axios";
import swal from "sweetalert";

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    laundries: [],
    myOrder: [],
  }),
  getters: {},
  actions: {
    async getLaundries() {
      try {
        const { data } = await axios({
          method: "GET",
          url: "http://localhost:3000/laundries",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.laundries = data;
      } catch (err) {
        swal(err.response.data.message);
      }
    },

    async getMyOrder() {
      try {
        const { data } = await axios({
          method: "GET",
          url: "http://localhost:3000/myorders",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.myOrder = data;
      } catch (err) {
        swal(err.response.data.message);
      }
    },
  },
});
