<script>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
      NavBar
  },
  methods: {
    
  },
  created() {
   
  //   window.fbAsyncInit = function() {
  //   FB.init({
  //     appId      : '403560191717297',
  //     cookie     : true,
  //     xfbml      : true,
  //     version    : 'v14.0'
  //   });
      
  //   FB.AppEvents.logPageView();   
      
  // };

  // (function(d, s, id){
  //    var js, fjs = d.getElementsByTagName(s)[0];
  //    if (d.getElementById(id)) {return;}
  //    js = d.createElement(s); js.id = id;
  //    js.src = "https://connect.facebook.net/en_US/sdk.js";
  //    fjs.parentNode.insertBefore(js, fjs);
  //  }(document, 'script', 'facebook-jssdk'));
  }
}
</script>

<template>
  
  <NavBar />
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hahmlet&display=swap');
</style>
