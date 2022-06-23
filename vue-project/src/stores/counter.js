import { defineStore } from "pinia";
import axios from "axios";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    counter: 0,
    map: "",
    dataTour: [],
    oneData: [],
    baseUrl: "http://localhost:5656/",
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    async findMap(location) {
      try {
        const options = {
          method: "GET",
          url: "https://google-maps28.p.rapidapi.com/maps/api/place/findplacefromtext/json",
          params: {
            inputtype: "textquery",
            fields:
              "business_status,formatted_address,geometry,icon,icon_mask_base_uri,icon_background_color,name,permanently_closed,photo,place_id,plus_code,type,opening_hours,price_level,rating,user_ratings_total",
            input: location,
            language: "en",
          },
          headers: {
            "X-RapidAPI-Key":
              "e874aa12ffmsh72d510a658c2033p135b54jsnbb3ebd2532a9",
            "X-RapidAPI-Host": "google-maps28.p.rapidapi.com",
          },
        };
        let response = await axios.request(options);
        return response.data.candidates[0].geometry;
      } catch (err) {
        console.log(err);
      }
    },
    async fetchData() {
      try {
        let res = await axios.get(this.baseUrl + "tour");
        this.dataTour = res.data.response;
      } catch (err) {
        console.log(err);
      }
    },
    async fetchOneData(id) {
      try {
        let response = await axios.get(this.baseUrl + `tour/${id}`);
        this.oneData = response.data.response;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
