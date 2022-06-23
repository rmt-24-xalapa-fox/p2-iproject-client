<script>
export default {
  name: "slider",
  data() {
    return {
      images: [
        "https://img.inews.co.id/media/822/files/inews_new/2022/04/10/10_hal_menarik_tentang_gunung_gede_pangrango.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/1/12/MtmerbabuA45d.jpg",
        "https://asset.kompas.com/crops/mFdBEa8GySNDniLD7cudDsNhzJQ=/37x0:951x609/750x500/data/photo/2017/06/02/3529039154.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Uprising-mount_kerinci.jpg/280px-Uprising-mount_kerinci.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Semeru.jpg/280px-Semeru.jpg",
      ],
      timer: null,
      currentIndex: 0,
    };
  },
  methods: {
    startSlide: function () {
      this.timer = setInterval(this.next, 5000);
    },
    next: function () {
      this.currentIndex += 1;
    },
    prev: function () {
      this.currentIndex -= 1;
    },
  },
  computed: {
    currentImg: function () {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
  },
  mounted() {
    this.startSlide();
  },
};
</script>

<template>
  <div class="col-9">
    <h1>Picture Of Mountain</h1>
    <div class="fade-enter-active fade-leave-active">
      <div v-for="i in [currentIndex]" :key="i">
        <img :src="currentImg" />
      </div>

      <a class="prev" @click="prev" href="#">&#10094; Previous</a>
      <a class="next" @click="next" href="#">&#10095; Next</a>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.9s ease;
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width: 75%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  width: 100%;
  opacity: 0;
}

img {
  height: 600px;
  width: 100%;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
}

.next {
  right: 0;
}

.prev {
  left: 0;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
