import { defineStore } from "pinia";
import axios from "axios";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    counter: 0,
    map: [],
    tour: [],
    baseUrl: "http://localhost:5656",
    authorId: 0,
    email: "",
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
        console.log(response.data);
        return response.data.candidates[0].geometry;
      } catch (err) {
        console.log(err);
      }
    },
    async allTour() {
      try {
        let response = await axios.get(
          "https://triplocator.net/api/rest/get/tours"
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    async googleSign(credential) {
      try {
        let res = await axios({
          method: "POST",
          url: `${this.baseUrl}/google-sign`,
          data: {
            credential,
          },
        });
        localStorage.setItem("access_token", res.data.data.access_token);
        return true;
      } catch (err) {
        console.log(err, "store");
        return false;
      }
    },
    async loginHandler(email, password) {
      try {
        let response = await axios({
          method: "POST",
          url: this.baseUrl + "/login",
          data: {
            email,
            password,
          },
        });
        localStorage.setItem("access_token", response.data.access_token);
        return true;
      } catch (err) {
        return false;
      }
    },
    async registerHandler(obj) {
      try {
        const { username, email, password, phoneNumber, address } = obj;
        await axios({
          method: "POST",
          url: this.baseUrl + "/register",
          data: {
            username,
            email,
            password,
            phoneNumber,
            address,
          },
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});
