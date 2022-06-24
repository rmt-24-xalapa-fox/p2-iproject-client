<script>
import CardItem from '@/components/CardItem.vue'
import { mapActions,mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import axios from 'axios';

export default {
  props:{
    msg:String
  },
  data(){
    
    return{
      type:"Favourite",
      // genreList:[],
      // selection:[1,2,3,4,5,6,7,8,9,10],
      // selected:1,
      // selectedGenre:[],
      title:"",
      toggled:false,
      paginationDisplay:[],
      paginationLimit:4,
      haveSearched:false,
      paginationLessThanLimit:false,
      paginationMoreThanLimit:false,
      updated:false
    }
  },
  components: {
    CardItem
  },
  computed: {
    ...mapWritableState(useCounterStore, ['posts','favourites','isLogin','baseUrl','currentPages','totalPages'])
  },
  created(){
    this.updatePagination();
  },
  watch:{
    totalPages(newValue,oldValue){
      if(oldValue!=newValue){
        this.updatePagination();
      }
    }
  },
  mounted(){
    // console.log(this.msg + " THIS IS THE ROUTER NAME");
    
    if(this.msg=="home"){
      console.log("This is home page")
      this.type="Home"
    }else if(this.msg=="mypost"){
      this.type="My list"
    }
    else{
      this.type="Favourite"
      console.log("This is favourite "+this.msg)
    }
    if(this.isLogin){
    }
    this.updatePagination();
    
  },
  methods:{
    ...mapActions(useCounterStore, ['populateData','setError']),
    applySearch(){
      console.log(this.title)
      this.currentPages=0
      this.populateData({title:this.title})
      this.haveSearched=true;
      this.setError("Search result displayed")
    },
    toggleSearch(){
      this.toggled=!this.toggled;
      if(!this.toggled){
        if(this.haveSearched){
          this.populateData();
          this.haveSearched=false;
        }
      }
    },
    updatePagination(){
      this.paginationDisplay=[]
      this.paginationLessThanLimit=false;
      this.paginationMoreThanLimit=false;
      if(this.currentPages>0){
        for(let i =this.paginationLimit-1;i>0;i--){
          if((this.currentPages+1 - i)>0){
            this.paginationDisplay.push(this.currentPages+1 - i)
          }else{
            console.log("Page triggered "+(this.currentPages+1 - i))
            this.paginationLessThanLimit=true;
          }
        }
      }else{
        this.paginationLessThanLimit=true;
      }
        this.paginationDisplay.push(this.currentPages+1)
      
      
      for(let j =1;j<=this.paginationLimit;j++){
          if((this.currentPages+1 + j)<this.totalPages){
            this.paginationDisplay.push(this.currentPages+1 + j)
          }else{
            if((this.currentPages+1 + j)==this.totalPages){
                this.paginationDisplay.push(this.currentPages+1 + j);
            }
            
            this.paginationMoreThanLimit=true;
            break;
          }
      }
      console.log("Limit: "+this.paginationLessThanLimit +" "+this.paginationMoreThanLimit)
    },
    goToPages(number){
      console.log("GOING TO FETCH PAGE: "+(number-1)+" from page"+this.currentPages);
      this.currentPages=number-1;
      this.populateData({title:this.title});
      this.updated=true;
      this.updatePagination();
      this.updated=false;
    }

  }

}
</script>

<template>

  <div class="container">
      <h1 class="text-white">{{type}}</h1>
      <button v-if="isLogin" @click="toggleSearch">Toggle Search Option</button>
      <form v-if="isLogin && toggled" @submit.prevent="applySearch">
      <label class="form-check-label text-light">Post Title:</label>
      <input type="text" v-model="title"/>       
      <button type="submit" >Search</button>
      </form>
      <div v-if="msg=='home' && !updated" class="d-flex justify-content-center">
        <h3 class="text-white">Pages:</h3>
        <br>
        <button v-if="currentPages+1>paginationLimit" @click="goToPages(1)">1</button>
        <button v-for="pages in paginationDisplay" @click="goToPages(pages)" :key="pages">{{pages}}</button>  
        <button v-if="!paginationMoreThanLimit" @click="goToPages(totalPages)">{{totalPages}}</button>
      </div>
      <div v-if="msg=='home'" class="row justify-content-start">
        <h1 v-if="posts.length==0">No Post Yet</h1>
        <CardItem v-for="post in posts" :key="post.id" :post="post" :msg="msg"/>
      </div>
      <div v-else-if="msg=='mypost'" class="row justify-content-start">
        <h1 v-if="posts.length==0">No Post Yet, Add one</h1>
        <CardItem v-for="post in posts" :key="post.id" :post="post" :msg="msg"/>
      </div>
      <div v-else class="row justify-content-start">
        <h1 v-if="favourites.length==0">No Favourite Yet</h1>
        <CardItem v-for="favourite in favourites" :key="favourite.id" :post="favourite.Post" :favourite="favourite" :msg="msg"/>
      </div>
      <div v-if="msg=='home' && !updated" class="d-flex justify-content-center">
        <h3 class="text-white">Pages:</h3>
        <br>
        <button v-if="currentPages+1>paginationLimit" @click="goToPages(1)">1</button>
        <button v-for="pages in paginationDisplay" @click="goToPages(pages)" :key="pages">{{pages}}</button>  
        <button v-if="!paginationMoreThanLimit" @click="goToPages(totalPages)">{{totalPages}}</button>
      </div>
    </div>
</template>
