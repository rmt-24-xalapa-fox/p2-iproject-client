<script>
import NavbarPageVue from '../components/NavbarPage.vue'

export default {
  name: "SongPage",
  components:{
    NavbarPageVue
  }
}
</script>

<template>
<NavbarPageVue/>
  <div class="team-boxed">
    <div class="container">
      <div class="intro">
        <h2 class="text-center">TOP 10 CHART TRACKS</h2>
      </div>
      <div class="row people">
        <div class="col-md-6 col-lg-4 item">
          <div class="box">
            <h3 class="name">Ben Johnson</h3>
            <h4 class="title">Running up That Hill (A Deal with God) [2018 Remaster]</h4>
            <p class="description">RATING : 100</p>
            <p class="description">ALBUM : Hounds of Love (2018 Remaster)</p>
            <div class="social"><a href="#">SEE MORE</a></div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 item">
          <div class="box">
            <h3 class="name">Ben Johnson</h3>
            <p class="title">Running up That Hill (A Deal with God) [2018 Remaster]</p>
            <p class="description">RATING : 100</p>
            <p class="description">ALBUM : Hounds of Love (2018 Remaster)</p>
            <div class="social"><a href="#">SEE MORE</a></div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 item">
          <div class="box">
            <h3 class="name">Ben Johnson</h3>
            <p class="title">Running up That Hill (A Deal with God) [2018 Remaster]</p>
            <p class="description">RATING : 100</p>
            <p class="description">ALBUM : Hounds of Love (2018 Remaster)</p>
            <div class="social"><a href="#">SEE MORE</a></div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 item">
          <div class="box">
            <h3 class="name">Ben Johnson</h3>
            <p class="title">Running up That Hill (A Deal with God) [2018 Remaster]</p>
            <p class="description">RATING : 100</p>
            <p class="description">ALBUM : Hounds of Love (2018 Remaster)</p>
            <div class="social"><a href="#">SEE MORE</a></div>
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
