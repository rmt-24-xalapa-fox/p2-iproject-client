<script>
import Navbar from './components/Navbar.vue'
export default {
  name: "app",
  components: {
    Navbar,
  },
  data(){
    return {
      
    }
  },
  methods: {
  },
  computed:{
  },
  created(){
    // call initState() from store
  }
}
</script>

<template>
  <Navbar />
  <div class="content-container">
    <router-view />
  </div>
</template>

<style>
@import "@/assets/base.css";

body {
  min-width: 600px;
  min-height: 456px;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #222;
}

.content-container {
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100vw;
  min-width: 600px;
  min-height: 400px;
  border: green 10px solid;
}
</style>