<script>
import axios from 'axios';

import { mapActions,mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  props: {
    movie:Object,
    favourite: Object,
    msg:String,
  },
  data(){
    return{
      text:"Favourite",
      moviedata:{},
      hovered:false,
    }
  },
  computed: {
    ...mapWritableState(useCounterStore, ['baseUrl','baseFavourite','isLogin','movieDetail'])
  },
  mounted(){
    console.log("Mounted with data:")
    console.log(this.movie);
    if(this.msg!="home"){
      this.text="Unfavourite";
      console.log(this.favourite);
    }else{
      console.log("Movie list")
    }
  },
  methods:{
    ...mapActions(useCounterStore, ['populateFavourite','setError']),
    setDetail(){
      this.movieDetail=this.movie;
      this.$router.push({path:'/detail/'+this.movieDetail.id})
    },
    favourited(){
      let tempThis=this;
      if(this.msg=="home"){
        
        axios.post(this.baseUrl+""+this.baseFavourite+"/"+this.movie.id,{email:this.email,password:this.password},{headers:{access_token:localStorage.getItem("access_token")}}).then((response)=>{
          console.log(response.data);
          tempThis.$router.push({path:'/favourite'})
          this.setError("Post "+this.movie.title+" Favourited")
        }).catch((error)=>{
          this.setError(error.response.data.message)
          console.log(error);
        })
      }else{
        axios.delete(this.baseUrl+""+this.baseFavourite+"/"+this.favourite.id,{headers:{access_token:localStorage.getItem("access_token")},email:this.email,password:this.password}).then((response)=>{
          console.log(response.data);
          this.populateFavourite();
          tempThis.$router.push({path:'/favourite'})
          this.setError("Post  unfavourited")
        }).catch((error)=>{
          this.setError(error.response.data.message)
          console.log(error);
        })
      }
    }
  }
}
</script>

<template>
        <div class="col-12 col-md-4" @mouseover="hovered = true" @mouseleave="hovered = false">
          <div class="card mb-3">
            <img v-if="movie.media && !hovered" :src="movie.media" class="card-img-top" />
            <div class="card-body card-body">
              <h5 v-show="!hovered" class="card-title">{{movie.title}}</h5>
              <label v-show="hovered"><small class="text-muted">Description:</small></label><p v-show="hovered" class="card-text">{{movie.description}}</p>
              <p v-show="hovered" class="card-text">Favourited:{{movie.rating}}</p>
              
              <!-- <label><small class="text-muted">Genre:</small></label>
                <button class="btn btn-secondary" v-for="genre in movie.MovieGenres" :key="genre.GenreId">{{genre.Genre.name}}</button> -->
              </div>
              <button @click="setDetail">See details</button>
              <button v-if="isLogin" @click="favourited">{{text}}</button>
            </div>
            
          </div>
</template>
