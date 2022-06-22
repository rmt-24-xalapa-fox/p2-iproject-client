<script>
import NavbarPageVue from '../components/NavbarPage.vue'
import {mapActions, mapWritableState} from 'pinia'
import {useMusicYuhu} from '../stores/counter.js'

export default {
  name: "SongPage",
  components:{
    NavbarPageVue
  },
  methods: {
    ...mapActions(useMusicYuhu, ["getallSong"])
  },
  computed: {
    ...mapWritableState(useMusicYuhu, ["allsong"])
  },
  created(){
    this.getallSong()
  }
}
</script>

<template>
<NavbarPageVue/>
<br><br><br>
  <div class="team-boxed">
    <div class="container">
      <div class="intro">
        <h2 class="text-center">TOP 10 CHART TRACKS</h2>
      </div>
      <div class="row people">
        <div class="col-md-6 col-lg-4 item" v-for="(el, i) in allsong" v:bind-key="i">
          <div class="box">
            <h3 class="name">{{el.artistName}}</h3>
            <h4 class="title">{{el.title}}</h4>
            <p class="description">RATING : {{el.rating}}</p>
            <p class="description">ALBUM : {{el.album}}</p>
            <div class="social"><a :href="el.songUrl">SEE MORE</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-boxed {
  color: #383b3d;
  background-color: #383b3d;
}

.team-boxed p {
  color: black;
}

.team-boxed h2 {
  font-weight: bold;
  margin-bottom: 40px;
  padding-top: 40px;
  color: black;
}

@media (max-width:767px) {
  .team-boxed h2 {
    margin-bottom: 25px;
    padding-top: 25px;
    font-size: 24px;
  }
}

.team-boxed .intro {
  font-size: 16px;
  max-width: 500px;
  margin: 0 auto;
}

.team-boxed .intro p {
  margin-bottom: 0;
  color: black;
}

.team-boxed .people {
  padding: 50px 0;
}

.team-boxed .item {
  text-align: center;
}

.team-boxed .item .box {
  text-align: center;
  padding: 30px;
  background-color: #fff;
  margin-bottom: 30px;
}

.team-boxed .item .name {
  font-weight: bold;
  margin-top: 28px;
  margin-bottom: 8px;
  color: inherit;
}

.team-boxed .item .title {
  color: black;

  text-transform: uppercase;
  font-weight: bold;
  color: black;
  letter-spacing: 2px;
  font-size: 13px;
}

.team-boxed .item .description {
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 20px;
}

.team-boxed .item img {
  max-width: 160px;
}

.team-boxed .social {
  font-size: 18px;
  color: black;
}

.team-boxed .social a {
  color: black;
  margin: 0 10px;
  display: inline-block;
  opacity: 0.7;
}

.team-boxed .social a:hover {
  opacity: 1;
}

body {
  background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url("https://vtara36.com/wp-content/uploads/2021/11/radio-music1.jpg");
}
</style>
