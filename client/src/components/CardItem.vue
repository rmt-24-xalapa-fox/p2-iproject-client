<script>
import axios from 'axios';

import { mapActions,mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  props: {
    post:Object,
    favourite: Object,
    msg:String,
  },
  data(){
    return{
      text:"Favourite",
      postdata:{},
      hovered:false,
    }
  },
  computed: {
    ...mapWritableState(useCounterStore, ['baseUrl','baseFavourite','isLogin','postDetail'])
  },
  mounted(){
    console.log("Mounted with data:")
    console.log(this.post);
    if(this.msg!="home"){
      this.text="Unfavourite";
      console.log(this.favourite);
    }else{
      console.log("Post list")
    }
  },
  methods:{
    ...mapActions(useCounterStore, ['populateFavourite','setError','doGift']),
    setDetail(){
      this.postDetail=this.post;
      this.$router.push({path:'/detail/'+this.postDetail.id})
    },
    promoted(){
      axios.post(this.baseUrl+"/post/"+this.post.id+"/promoted",{},{headers:{access_token:localStorage.getItem("access_token")}}).then((response)=>{
          console.log(response.data);
          tempThis.$router.push({path:'/'})
          this.setError("Post "+this.post.title+" promoted")
        }).catch((error)=>{
          this.setError(error.response.data.message)
          console.log(error);
        })
    },
    favourited(){
      let tempThis=this;
      if(this.msg=="home"){
        
        axios.post(this.baseUrl+""+this.baseFavourite+"/"+this.post.id,{},{headers:{access_token:localStorage.getItem("access_token")}}).then((response)=>{
          console.log(response.data);
          tempThis.$router.push({path:'/favourite'})
          this.setError("Post "+this.post.title+" Favourited")
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
    },
    GiftCoin(){
      doGift(this.post.UserId)
    }
  }
}
</script>

<template>
        <div class="col-12 col-md-4" @mouseover="hovered = true" @mouseleave="hovered = false">
          <div class="card mb-3">
            <img v-if="post.media && !hovered" :src="post.media" class="card-img-top" />
            <div class="card-body card-body">
              <h5 v-show="!hovered" class="card-title">{{post.title}}</h5>
              <label v-show="hovered"><small class="text-muted">Description:</small></label><p v-show="hovered" class="card-text">{{post.description}}</p>
              <p v-show="hovered" class="card-text">By:{{post.User.email}}</p>
              
              <!-- <label><small class="text-muted">Genre:</small></label>
                <button class="btn btn-secondary" v-for="genre in movie.MovieGenres" :key="genre.GenreId">{{genre.Genre.name}}</button> -->
              </div>
              <button @click="setDetail">See details</button>
              <button v-if="isLogin && post.canDonate!=true" @click="promoted">Promote this post</button>
              <button v-if="isLogin && post.canDonate==true" @click="GiftCoin">Gift Coin</button>
              <button v-if="isLogin" @click="favourited">{{text}}</button>
            </div>
            
          </div>
</template>
