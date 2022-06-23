<script>
import axios from "axios";
import swal from "sweetalert";
import { mapActions, mapWritableState } from "pinia";
import { useDataStore } from "../stores/data";

export default {
  name: "HomePage",
  data() {
    return {
      access: localStorage.getItem("access_token"),
      map: "",
      lat: "-6.1766",
      lon: "106.8272",
      searchbar: "",
      zoom: "14",
      distance: 0,
    };
  },
  methods: {
    ...mapActions(useDataStore, ["getLaundries"]),
    async searchMaps() {
      try {
        const { data } = await axios({
          method: "GET",
          url: "http://api.positionstack.com/v1/forward",
          params: {
            access_key: "579a4d8e9ca95d2b019160f95132f635",
            query: this.searchbar,
          },
        });

        this.lat = data.data[0].latitude;
        this.lon = data.data[0].longitude;
        this.showMaps();
      } catch (err) {
        if (err.response.data.error.context.query.message === "query must have at 3 character's") {
          swal("location not found");
        }
      }
    },

    async showMaps() {
      try {
        const { data } = await axios({
          method: "GET",
          url: "https://cartes.io/api/maps/77303a29-6816-475f-9729-12754a17cfff",
          params: {
            api_key:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUyNmRiMzM3OGFjMGViZjlhMmEwYzA3ZDEwZmE2MjIzYWZlZDhjNjMxODYwZmYwY2ZmYmYyNjRiZWRlNjE0NThhZTFjZGVlMDk1M2E4MGRhIn0.eyJhdWQiOiIxIiwianRpIjoiZTI2ZGIzMzc4YWMwZWJmOWEyYTBjMDdkMTBmYTYyMjNhZmVkOGM2MzE4NjBmZjBjZmZiZjI2NGJlZGU2MTQ1OGFlMWNkZWUwOTUzYTgwZGEiLCJpYXQiOjE2NTU4MDIwNjUsIm5iZiI6MTY1NTgwMjA2NSwiZXhwIjoxNjg3MzM4MDY1LCJzdWIiOiI4NCIsInNjb3BlcyI6W119.SZCAgfdFeR-4Pse5WkCOE6k8DtwJBlANvhLxE-pwbqzW7Vmm5QLNYIfwET8lMBKYL8k4pCv5m8P8zdAzOl02w1d8Qx57syKiIwXCkSuA3kT2pbz1u49NauDhsja3yK0hNbhP6F5lin4bQYTRMbimTVsAuckiO-s3CaqZyXVquGFUtAsU9UyHCmoamH-QHU7SvfFhWsbBLwtDTnD05tWfDtzaVsyEEabQgwyPzvzHpnjyUkBxNNnCccnCp2INT4paCbvKJeDEA5u8k6JwasrX5T03D6_EJ3a6PGYoISm9nDPnbHvq3LQZLNdVmY9oHFKQKKBujMocPxReUTrvdUf4Hhv4GY8MymlwltMhzh3UPJWmeHT6BO_6X8WdIsjMEe3H8Bb3w1u2vXDGXOepJD0MU2XtIFz9hNtLXNA5SuGWWcpVOpbQKhoSYPlXsDVSJIidWCz6_pK2sBGQWCoOrYvDMPEgFqbfn_8Y1NpOxQ9LlXABP-2Ra-IzxmP1ZPYlzcFnu16hmVnCzT8OpfhRLNWE2jXJGbSbVfR1hTBZokGe5MqOSSOJOA5HKkVvCZSKJyJ0Ebu6JFLnTtDSnlFerGgH-dHpI69eUDkrkOb95qveEsSy5JNJbDkPzzBnXYrgAvV8S1-l2uq2c592Jt3UImdUoogsZ_rwF7iqPwmmncQGRrk",
          },
        });

        this.map = `https://cartes.io/embeds/maps/${data.uuid}#${this.zoom}/${this.lat}/${this.lon}?type=map`;
      } catch (err) {
        swal("Internal server error");
      }
    },

    getLocation(lat, lon) {
      console.log(lat, lon);
      this.lat = lat;
      this.lon = lon;
      this.zoom = 18;
      this.showMaps();
    },

    getDistance(latitude1, longitude1, latitude2, longitude2) {
      let p = 0.017453292519943295;
      let c = Math.cos;
      let a = 0.5 - c((latitude2 - latitude1) * p) / 2 + (c(latitude1 * p) * c(latitude2 * p) * (1 - c((longitude2 - longitude1) * p))) / 2;
      let R = 6371;
      let dist = 2 * R * Math.asin(Math.sqrt(a));
      return dist;
    },

    newOrder(id) {
      this.$router.push(`/neworder/${id}`)
    }
  },
  computed: {
    ...mapWritableState(useDataStore, ["laundries"]),
  },

  created() {
    this.showMaps();
    this.getLaundries();

    this.laundries.forEach((el) => {
      console.log(this.getDistance(this.lat, this.lon, el.latitude, el.longitude));
    });
  },
};
</script>
<template>
  <div class="container-fluid">
    <iframe :src="this.map" width="100%" height="400" frameborder="0" allow="geolocation"></iframe>
  </div>
  <div class="container">
    <h1 class="text-center mt-3 mb-3"><small style="color: #4d9c81">Qilo</small>Search</h1>
    <form class="w-50 mx-auto">
      <div class="input-group mb-4 mt-3">
        <input v-on:keydown.enter.prevent="searchMaps" type="text" class="form-control text-center" aria-label="Search" aria-describedby="button-addon2" v-model="searchbar" placeholder="enter your location"/>
        <button class="btn btn-dark" type="button" id="button-addon2" @click.prevent="searchMaps">Search</button>
      </div>
    </form>
    <div v-for="laundry in laundries" :key="laundry.id" class="d-flex justify-content-center mb-3">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-success shadow" style="background-color: #4d9c81; width: 150px">{{ laundry.name }}</button>
        <button type="button" class="btn btn-success shadow" style="background-color: #4d9c81" @click="getLocation(laundry.latitude, laundry.longitude)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
        </button>
        <button type="button" class="btn btn-success shadow" style="background-color: #4d9c81" @click.prevent="newOrder(laundry.id)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check-fill" viewBox="0 0 16 16">
            <path
              d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z"
            />
          </svg>
        </button>
        <!-- <button v-if="this.getDistance(this.lat, this.lon, laundry.latitude, laundry.longitude) <= 1" type="button" class="btn btn-success shadow" style="background-color: #4d9c81; width: 150px">{{ laundry.name }}</button>
        <button v-if="this.getDistance(this.lat, this.lon, laundry.latitude, laundry.longitude) <= 1" type="button" class="btn btn-success shadow" style="background-color: #4d9c81" @click="getLocation(laundry.latitude, laundry.longitude)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
        </button>
        <button v-if="this.getDistance(this.lat, this.lon, laundry.latitude, laundry.longitude) <= 1" type="button" class="btn btn-success shadow" style="background-color: #4d9c81" @click.prevent="newOrder(laundry.id)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check-fill" viewBox="0 0 16 16">
            <path
              d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z"
            />
          </svg>
        </button> -->
      </div>
    </div>
  </div>
</template>
<style></style>
