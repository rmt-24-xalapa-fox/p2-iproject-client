<script>
import {mapActions, mapWritableState} from 'pinia'
import {useMusicYuhu} from '../stores/counter.js'

export default {
  name: "NavbarPage",
  methods:{
    ...mapActions(useMusicYuhu, ["logoutprocess"])
  }
}
</script>

<template>
  <nav
      class="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      id="navbarAll"
    >
      <div class="container-fluid" id="navbarAlltest">
        <RouterLink to="/home" style="cursor: pointer" class="navbar-brand">Home</RouterLink>
        <RouterLink to="/home/song" style="cursor: pointer" class="navbar-brand">Music</RouterLink>
        <RouterLink to="/home/radio" style="cursor: pointer" class="navbar-brand">Radio</RouterLink>
        <RouterLink to="/home/premium" style="cursor: pointer" class="navbar-brand">Premium</RouterLink>


        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav" id="textnavbar">
            <li class="nav-item">
              <a style="cursor: pointer" @click.prevent="logoutprocess" class="navbar-brand" id="logout">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<style scoped>
#navbarAlltest {
    background-color: rgb(0, 0, 0);
    height: 70px;
}

#navbarAll #navbarAlltest .navbar-brand {
    color: rgb(255, 255, 255);
}


</style>
