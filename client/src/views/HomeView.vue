<template>
  <div class="row">
    <div class="col-md-6">
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src="https://cdn.vox-cdn.com/thumbor/5jAvxyzRddrD-DbKu4TL1D0n-44=/0x0:5401x3601/1200x800/filters:focal(2168x636:3032x1500)/cdn.vox-cdn.com/uploads/chorus_image/image/70986162/1403378931.0.jpg"
              alt="First slide"
            />
            <div class="carousel-caption">
              <a
                href="https://www.washingtonpost.com/sports/2022/06/16/nba-finals-game-6/"
                style="cursor: pointer"
                target="_blank"
              >
                Winning a title without KD ...
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-5 kanan">
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src="https://assets-cms.thescore.com/uploads/image/file/515711/cropped_GettyImages-1240925849.jpg?ts=1653623954"
              alt="First slide"
            />
            <div class="carousel-caption">
              <a
                class="acurry"
                href="https://www.cbssports.com/nba/news/2022-nba-finals-stephen-curry-wins-his-first-finals-mvp-award-after-leading-golden-state-to-title/"
                style="cursor: pointer"
                target="_blank"
              >
                Curry's 1st Final MVP ...
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row" style="align-items: center">
      <div class="col-5 mt-3 ms-2">
        <input
          onchange=""
          type="text"
          class="form-control"
          placeholder="Search Name"
          name="searchName"
          v-model="localSearchName"
        />
      </div>
      <div class="col-5 mt-3">
        <button
          @click.prevent="searchData"
          type="submit"
          class="btn btn-outline-success submitSearch"
        >
          Search
        </button>
      </div>
    </div>
    <div class="col-md-12 ms-lg-4 mt-1">
      <div class="row">
        <CardComponentVue v-for="dat in card" :key="dat.id" :player="dat" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useProductStore } from "../stores/product";
import CardComponentVue from "../components/CardComponent.vue";
export default {
  data() {
    return {
      localSearchName: this.$route.query.name,
    };
  },
  components: {
    CardComponentVue,
  },
  computed: {
    ...mapState(useProductStore, ["card"]),
    ...mapWritableState(useProductStore, ["searchName"]),
  },
  methods: {
    ...mapActions(useProductStore, ["getProducts", "addToList"]),
    searchData() {
      this.searchName = this.localSearchName;
      this.$router.push({
        path: this.$route.fullPath,
        query: {
          name: this.localSearchName,
        },
      });
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
    // console.log(this.card);
  },
};
</script>

<style>
a {
  color: white;
  font-size: 20px;
}
.kanan {
  margin-top: 10vh;
}
.acurry {
  color: black;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5vh;
}
</style>
