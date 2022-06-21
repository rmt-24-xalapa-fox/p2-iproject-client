<script>
export default {
  name: "NavBar",
  methods: {
    home() {
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <header>
    <!-- <div class="main">
      <div class="top half">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/avengers2.jpg" />
      </div>
      <div class="bottom half">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/avengers2.jpg" />
      </div>
      <button class="super-button">ENTER</button>
      <div class="overlay"></div>
      <div class="button-line left">
        <div class="inner"></div>
      </div>
      <div class="button-line right">
        <div class="inner"></div>
      </div>
    </div> -->
    <div class="nav-bar">
      <!-- <div class="hello">Welcome!</div> -->
      <nav>
        <ul>
          <li class="active"><router-link to="/">RED MARVEL</router-link></li>
          <li><router-link to="/characters">Characters</router-link></li>
          <li><router-link to="/comics">Comics</router-link></li>
          <li><a href="#">Favourite</a></li>
          <li><a href="#">Memes</a></li>
          <!-- <li><a href="#">Trailer</a></li> -->
          <li><a href="#">Logout</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style>
@font-face {
  font-family: decade;
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/decade.ttf");
}

body {
  font-family: decade;
}

.nav-bar {
  position: sticky;
  padding: 50px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  background-color: #1d1f20;
}

.nav-bar nav {
  margin: 0 auto;
  border: 2px solid #fff;
  max-width: 1000px;
}
.nav-bar nav ul {
  font-size: 0;
}
.nav-bar nav ul li {
  display: inline-block;
  font-size: 25px;
  text-transform: uppercase;
  color: #fff;
  padding: 5px 10px;
  border-right: 2px solid #fff;
}
.nav-bar nav ul li:last-child {
  border-right: none;
}
.nav-bar nav ul li.active {
  color: #ff5954;
}
.nav-bar nav ul li:hover {
  color: #ff5954;
}

/*# sourceMappingURL=entry.css.map */
</style>
