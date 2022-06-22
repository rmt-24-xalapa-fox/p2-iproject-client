<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "HomePage",
  data() {
    return {
      access: localStorage.getItem("access_token"),
      map: "",
      lat: "-6.1766",
      lon: "106.8272",
      searchbar: ""
    };
  },
  methods: {
    async searchMaps() {
        console.log(this.searchbar);
      try {
        const {data} = await axios({
          method: "GET",
          url: "http://api.positionstack.com/v1/forward",
          params: {
            access_key: "579a4d8e9ca95d2b019160f95132f635",
            query: this.searchbar,
          },
        });

        this.lat = data.data[0].latitude
        this.lon = data.data[0].longitude
        this.showMaps()
      } catch (err) {}
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

        this.map = `https://cartes.io/embeds/maps/${data.uuid}#14/${this.lat}/${this.lon}?type=map`;
      } catch (err) {}
    },
  },

  created() {
    this.showMaps();
  },
};
</script>
<template>
  <div class="container-fluid">
    <iframe :src="this.map" width="100%" height="500" frameborder="0"></iframe>
  </div>
  <div class="container">
    <h1 class="text-center mt-3 mb-3"><small style="color: #4d9c81">Qilo</small>Search</h1>
    <form class="w-75 mx-auto" >
      <div class="input-group mb-3 p-2">
        <input v-on:keydown.enter.prevent="searchMaps" type="text" class="form-control" aria-label="Search" aria-describedby="button-addon2" v-model="searchbar" />
        <button class="btn btn-dark btn-sm" type="button" id="button-addon2" @click.prevent="searchMaps">Search</button>
      </div>
    </form>
  </div>
</template>
<style></style>
