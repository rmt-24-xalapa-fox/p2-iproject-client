<template>
<div class="topnav">
  <router-link :to="{ name: 'home' }" :class="$route.name==='home'?'active':''" >Home</router-link>
  <router-link :to="{ path: '/statistic' }" :class="$route.path==='/statistic'?'active':''" >Statistic</router-link>
  <router-link :to="{ path: '/leaderboard' }" :class="$route.path==='/leaderboard'?'active':''" >Leaderboard</router-link>  
  <router-link :to="{ path: '/login' }" :class="$route.path==='/login'?'active':''" >Login</router-link>
</div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {

  },
}
</script>

<style>
/* Add a black background color to the top navigation */
.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #04AA6D;
  color: white;
}
</style>