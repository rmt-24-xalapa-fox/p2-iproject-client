<template>
<div class="topnav">
  <div class="nav-menu">
    <router-link :to="{ name: 'home' }" :class="$route.name==='home'?'active':''" ><span>Home</span></router-link>    
    <router-link :to="{ path: '/statistic' }" :class="$route.path==='/statistic'?'active':''" v-show="roundlog.length > 0" ><span>Statistic</span></router-link>
    <router-link :to="{ path: '/leaderboard' }" :class="$route.path==='/leaderboard'?'active':''" ><span>Leaderboard</span></router-link>  
  </div>
  <div class="nav-login">
    <router-link :to="{ path: '#' }" @click.prevent="logout" v-show="logedIn"><span>Log Out!</span></router-link>
    <div v-show="!logedIn"
      id="g_id_onload"
      data-client_id="627408864298-atkg2vi3r33rqtd0k701h7hmol8q05k2.apps.googleusercontent.com"
      data-context="use"
      data-ux_mode="popup"
      data-auto_prompt="false"
    >
    </div>
  </div>  
</div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores'

export default {
  name: "Navbar",
  methods: {
    ...mapActions(useMainStore, ["LoginHandler", "setLogin"]),

    logout(){
      localStorage.removeItem('access_token'),
      this.setLogin(false)
    },

    async handleCredentialResponse(response) {
      // console.log("Encoded JWT ID token: " + response.credential);
      await this.LoginHandler({ credential: response.credential });
      google.accounts.id.disableAutoSelect();
    },
  },
  // end methods

  computed: {
    ...mapState(useMainStore, ["logedIn", "roundlog"])
  },

  mounted() {
    google.accounts.id.initialize({
      client_id:
        "627408864298-atkg2vi3r33rqtd0k701h7hmol8q05k2.apps.googleusercontent.com",
      callback: this.handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("g_id_onload"),
      { theme: "filled_black", size: "large" } // customization attributes
    );
    google.accounts.id.disableAutoSelect();
  },
}
</script>

<style>
/* Add a black background color to the top navigation */
.topnav {
  display: flex;
  justify-content: space-between;
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a span {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover span {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active span {
  background-color: #04AA6D;
  color: white;
}

.nav-login {
  margin: auto 5px;
}
</style>