<script>
import { mapActions, mapState } from "pinia";
import { useIndexStore } from "../stores";
import slider from "../components/slider.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
export default {
  name: "home",
  components: {
    slider,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      images: [
        "https://img.inews.co.id/media/822/files/inews_new/2022/04/10/10_hal_menarik_tentang_gunung_gede_pangrango.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/1/12/MtmerbabuA45d.jpg",
        "https://asset.kompas.com/crops/mFdBEa8GySNDniLD7cudDsNhzJQ=/37x0:951x609/750x500/data/photo/2017/06/02/3529039154.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Uprising-mount_kerinci.jpg/280px-Uprising-mount_kerinci.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Semeru.jpg/280px-Semeru.jpg",
      ],
    };
  },
  methods: {
    ...mapActions(useIndexStore, ["fetchWeather"]),
  },
  computed: {
    ...mapState(useIndexStore, ["weather"]),
  },
  created() {
    this.fetchWeather();
  },
};
</script>

<template>
  <div class="container">
    <carousel :items-to-show="1.5">
      <slide v-for="slide in images" :key="slide">
        <img
          :src="slide"
          alt="Mountain"
          style="
            max-width: 100%;
            max-height: 100%;
            min-width: 100%;
            min-height: 100%;
          "
        />
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
    <div class="row">
      <hr class="mt-5" />
      <h1 class="text-center mt-4">Weather</h1>

      <img
        v-if="weather.length === 0"
        src="https://motiongraphicsphoebe.files.wordpress.com/2018/10/8ee212dac057d412972e0c8cc164deee.gif?w=545&h=409"
        alt="Loading"
      />

      <div
        v-if="weather"
        v-for="(el, i) in weather"
        :key="i"
        class="col-lg-4 col-md-12"
      >
        <section class="mx-auto my-5" style="max-width: 30rem">
          <div class="card" style="height: 400px">
            <div class="card-body">
              <h5 class="card-title font-weight-bold">Gunung {{ el.name }}</h5>
              <p class="card-text">{{ Date(now) }}</p>
              <div class="d-flex justify-content-between">
                <p class="display-1 degree">{{ el.data.kelembapan }}</p>
                <i class="fas fa-sun-o fa-5x pt-3 text-warning"></i>
              </div>
              <div class="d-flex justify-content-between mb-4">
                <p>
                  <i class="fas fa-tint fa-lg text-info pe-2"></i
                  >{{ el.data.suhu }}
                </p>
                <p>
                  <i class="fas fa-leaf fa-lg text-muted pe-2"></i>Mountain
                  Weather
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
