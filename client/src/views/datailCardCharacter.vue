<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMaarvelStore } from "../stores/marvel";

export default {
  name: "DetailCard",

  methods: {
    ...mapActions(useMaarvelStore, ["getDetailCharacter"]),
  },
  computed: {
    ...mapState(useMaarvelStore, ["description", "imageUrl", "name"]),
    ...mapWritableState(useMaarvelStore, ["isCharacters"]),
  },

  mounted() {
    // this.getDetailCharacter()
    this.isCharacters = false
  },
};
</script>

<template>
  <section class="tv-content">
    <!-- <div class="bg"> -->
      <div class="content">
        <div class="image">
          <img :src="imageUrl" />
        </div>
        <div class="info">
          <div class="title">
            <a href="#">
              <h2>{{ name }}</h2>
            </a>
            <!-- <span>(2019)</span> -->
          </div>
          <div class="about">
            <div class="overview">
              <h3>Description</h3>
              <p>{{ description }}.</p>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </section>
</template>

<style>
html {
  font-size: 10px;
}

.tv-content {
  list-style: none;
  text-decoration: none;
  padding: 0;
  box-sizing: border-box;
}

/* *:focus {
  outline: none;
} */

h3 {
  font-size: 22px;
  font-weight: 600;
  margin: 50px 10px 10px 30px;
}

p {
  font-size: 20px;
    margin: 3px 10px 10px 30px;
}
a {
  color: #fff;
}

.content {
  display: flex;
  margin: 200px auto auto 545px;
  width: 100rem;
  height: 55rem;
}
.image {
  width: 40rem;
}
.info {
  color: #fff;
  width: 700rem;
  background-color: rgba(19.61%, 21.96%, 23.53%);
  padding: 4rem 2rem;
}
.title {
  padding-bottom: 1rem;
}
.title a h2 {
  display: inline-block;
  font-size: 3.84rem;
  color: #fff;
}
.title span {
  opacity: 0.6;
  font-size: 2.72rem;
  font-weight: 400;
}
</style>
