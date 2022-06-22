<script>
import { mapState, mapActions } from "pinia";
import { useHeroStore } from "../stores/heroes";
export default {
  name: "Tutorial",
  computed: {
    ...mapState(useHeroStore, ["ytApi"]),
  },
  methods: {
    ...mapActions(useHeroStore, ["getChannel"]),
  },
  created() {
    this.getChannel();
  },
};
</script>
<template>
  <section class="py-5" style="background-color: rgb(192, 131, 130)">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="row" v-for="(yt, i) in ytApi" :key="i" :yt="yt">
            <div class="col-md-6">
              <img :src="yt.snippet.thumbnails.medium.url" class="rounded-circle img-thumbnail" width="200" />
            </div>
            <div class="col-md-6">
              <h3>{{ yt.snippet.title }}</h3>
              <h4>Subscriber: {{ yt.statistics.subscriberCount }}</h4>
              <br />
              <h4>Total Video: {{ yt.statistics.videoCount }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-md-6">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/34-5XWjnEe0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div class="col-md-6">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/zUMv9M-dcdI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/55GU32e-0BU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div class="col-md-6">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/LSwBzcH5OtQ"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/UbWIpbDE0_M"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div class="col-md-6">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/fjHx85LfeZg"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer-->
  <footer class="py-5 bg-dark">
    <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Be Pro 2022</p></div>
  </footer>
</template>
