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
        <ul class="navbar-ul">
          <li class="active">
            <router-link to="/" class="active">RED MARVEL</router-link>
          </li>
          <li><router-link to="/characters">Characters</router-link></li>
          <li><router-link to="/comics">All Comics</router-link></li>
          <li><a href="#">Favourite</a></li>
          <li><a href="#">Memes</a></li>
          <!-- <li><a href="#">Trailer</a></li> -->
          <li><a href="#">Logout</a></li>
        </ul>
      </nav>

      <!-- SEARCH  -->
      <form class="form-wrapper cf" v-on:submit.prevent="searchLocalHandler">
        <input
          name="year"
          type="number"
          placeholder="Search by year..."
          required
          v-model="this.year"
        />
        <button type="submit">Search</button>
      </form>

       <!-- SEARCH BY ALPHABET  -->
  <div class="pagination">
    <a href="#" v-if="this.page > 1" v-on:click.prevent="previousPage">&laquo;</a>
    <a href="#" v-on:click.prevent="changeAlphabet('A')">A</a>
    <a href="#" v-on:click.prevent="changeAlphabet('B')">B</a>
    <a href="#" v-on:click.prevent="changeAlphabet('C')">C</a>
    <a href="#" v-on:click.prevent="changeAlphabet('D')">D</a>
    <a href="#" v-on:click.prevent="changeAlphabet('E')">E</a>
    <a href="#" v-on:click.prevent="changeAlphabet('F')">F</a>
    <a href="#" v-on:click.prevent="changeAlphabet('G')">G</a>
    <a href="#" v-on:click.prevent="changeAlphabet('H')">H</a>
    <a href="#" v-on:click.prevent="changeAlphabet('I')">I</a>
    <a href="#" v-on:click.prevent="changeAlphabet('J')">J</a>
    <a href="#" v-on:click.prevent="changeAlphabet('K')">K</a>
    <a href="#" v-on:click.prevent="changeAlphabet('L')">L</a>
    <a href="#" v-on:click.prevent="changeAlphabet('M')">M</a>
    <a href="#" v-on:click.prevent="changeAlphabet('N')">N</a>
    <a href="#" v-on:click.prevent="changeAlphabet('O')">O</a>
    <a href="#" v-on:click.prevent="changeAlphabet('P')">P</a>
    <a href="#" v-on:click.prevent="changeAlphabet('Q')">Q</a>
    <a href="#" v-on:click.prevent="changeAlphabet('R')">R</a>
    <a href="#" v-on:click.prevent="changeAlphabet('S')">S</a>
    <a href="#" v-on:click.prevent="changeAlphabet('T')">T</a>
    <a href="#" v-on:click.prevent="changeAlphabet('U')">U</a>
    <a href="#" v-on:click.prevent="changeAlphabet('V')">V</a>
    <a href="#" v-on:click.prevent="changeAlphabet('W')">W</a>
    <a href="#" v-on:click.prevent="changeAlphabet('X')">X</a>
    <a href="#" v-on:click.prevent="changeAlphabet('Y')">Y</a>
    <a href="#" v-on:click.prevent="changeAlphabet('Z')">Z</a>
    <a href="#" v-if="this.page < this.totalPage" v-on:click.prevent="nextPage"
      >&raquo;</a
    >
  </div>
  
 
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

.navbar-ul {
  height: 70px;
  align-items: center;
  justify-content: center;
}

a {
  font-size: 35px;
  align-items: center;
  justify-content: center;
}

.nav-bar {
  /* position: sticky; */
  position: fixed;
  padding: 50px;
  top: 0;
  left: 0;
  width: 100%;
  /* height: 2px; */
  z-index: 40;
  background-color: #1d1f20;
}

.nav-bar nav {
  margin: 0 auto;
  /* border: 2px solid #fff; */
  max-width: 1300px;
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
.nav-bar nav ul li a.active {
  color: #ff5954;
}
.nav-bar nav ul li a:hover {
  color: #ff5954;
}

/*# sourceMappingURL=entry.css.map */
</style>
