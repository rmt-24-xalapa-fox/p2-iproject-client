<script>
import HomeFavourite from '@/components/HomeFavourite.vue'
import { mapActions } from 'pinia'
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
    HomeFavourite
  },
  
  data(){
    return{
      movie:[],
      path:"home"
    }
  },
  
  computed: {
    ...mapWritableState(useCounterStore, ['isLogin','baseUrl','baseMovies','baseFavourite','movies','favourites'])
  },
  methods:{
    ...mapActions(useCounterStore, ['checkLogin','populateData','populateFavourite']),
   
    
  },
  mounted(){
    
  },
  created(){
    console.log("Convert path name into")
    console.log(this.$router.currentRoute._value.name);
    this.path=this.$router.currentRoute._value.name;
    this.checkLogin();
    if(this.isLogin){
      console.log("Logged in")
      if(this.path=="favourite"){
        this.populateFavourite();
      }else{
        this.populateData();
      }
    }else{
      console.log("notLoggedIN");
      this.populateData();
      // this.$router.push({path:'/login'})
    }
  }
}
</script>

<template>
  <main class="bg-secondary">
    <HomeFavourite :msg="path"/>
  </main>
</template>
