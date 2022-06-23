import { defineStore } from "pinia";
import axios from "axios";

const baseURLServer = "http://localhost:3000";
const baseURLPokemon = "https://api.pokemontcg.io/v2";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    cards: [],
  }),
  getters: {},
  actions: {
    async createPost(
      requestName,
      requestSeries,
      uploadImg,
      fetchedOfferName,
      fetchedOfferSeries,
      fetchedOfferImg
    ) {
      try {
        await axios.post(`${baseURLServer}/posts`, {
          requestName,
          requestSeries,
          uploadImg,
          fetchedOfferName,
          fetchedOfferSeries,
          fetchedOfferImg,
        });
      } catch (err) {
        console.log(err);
      }
    },

    async fetchCardForPost(
      offerName,
      offerSeries,
      requestName,
      requestSeries,
      uploadImg
    ) {
      try {
        const query = `!name:${offerName} set.name:${offerSeries}`;
        const fetchOfferedData = await axios.get(`${baseURLPokemon}/cards`, {
          headers: {
            "X-Api-Key": "047f2e9c-070d-4318-864b-482631284e47",
          },
          params: {
            q: query,
            pageSize: 1,
            select: "name,series,images",
          },
        });

        this.createPost(
          requestName,
          requestSeries,
          uploadImg,
          fetchOfferedData.name,
          fetchOfferedData.series,
          fetchOfferedData.images.small
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
});
