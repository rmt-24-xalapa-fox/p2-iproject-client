<script>
import { mapActions, mapWritableState } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  name: "MoviesDetail",
  computed: {
    ...mapWritableState(useCounterStore, ["moviesDetail", "prices"]),
  },
  methods: {
    ...mapActions(useCounterStore, [
      "dataPrice",
      "dataMovieDetail",
      "addTransaction",
    ]),
    async fetchDataMovieDetail() {
      await this.dataMovieDetail();
    },

    button3days(id) {
      this.addTransaction({
        MovieId: id,
        PriceId: this.prices[0].id,
      });
      this.$router.push({ name: "Transaction" });
    },

    button1week(id) {
      this.addTransaction({
        MovieId: id,
        PriceId: this.prices[1].id,
      });
      this.$router.push({ name: "Transaction" });
    },

    fetchDataPrice() {
      this.dataPrice;
    },
  },
  created() {
    this.dataMovieDetail();
    this.fetchDataPrice();
  },
};
</script>

<template>
  <div>
    <div
      class="min-w-screen min-h-screen bg-gray-800 flex items-center p-5 lg:p-10 overflow-hidden relative"
    >
      <div
        class="w-full max-w-4xl rounded bg-cyan-600 shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left"
      >
        <div class="md:flex items-center -mx-10">
          <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0 space-x-4">
            <div class="relative border-4 shadow-2xl">
              <img
                :src="`https://image.tmdb.org/t/p/original/${moviesDetail.poster_path}`"
                alt=""
              />
            </div>
          </div>
          <div
            class="w-full md:w-1/2 px-10 bg-gray-400 border-cyan-700 border-2 rounded-lg shadow-2xl py-6"
          >
            <div class="mb-5">
              <h1 class="font-bold uppercase text-2xl mb-5">
                {{ moviesDetail.original_title }}
              </h1>
              <p class="text-sm">
                {{ moviesDetail.overview }}
              </p>
            </div>
            <div>
              <div class="inline-block align-bottom mr-5">
                <div>
                  <span class="text-sm font-medium leading-none"
                    >Release Date :
                  </span>
                  <span>{{ moviesDetail.release_date }}</span>
                </div>
                <div>
                  <span class="text-sm font-medium leading-none"
                    >Rating :
                  </span>
                  <span>{{ moviesDetail.vote_average }}</span>
                </div>
              </div>
              <br class="border-2" />
              <div class="flex flex-row gap-4 py-4">
                <button
                  type="button"
                  @click.prevent="button3days(moviesDetail.id)"
                  class="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide bg-cyan-600 hover:bg-orange-600 hover:text-black transition duration-200"
                >
                  Rent 3-days
                </button>
                <button
                  type="button"
                  @click.prevent="button1week(moviesDetail.id)"
                  class="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide bg-cyan-600 hover:bg-orange-600 hover:text-black transition duration-200"
                >
                  Rent 1-week
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
