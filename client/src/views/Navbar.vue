<script>
export default {
  name: "NavBar",
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
    <div class="content">
      <div class="hello">Welcome!</div>
      <nav>
        <ul>
          <li class="active"><p href="#">RED MARVEL</p></li>
          <li><router-link to="/card">Characters</router-link></li>
          <li><a href="#">Comics</a></li>
          <li><a href="#">Favourite</a></li>
          <li><a href="#">Memes</a></li>
          <!-- <li><a href="#">Trailer</a></li> -->
          <li><a href="#">Logout</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>


