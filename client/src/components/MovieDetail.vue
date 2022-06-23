<script>
import axios from 'axios';

import { mapActions,mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  data(){
    return{
      text:"Favourite",
      moviedata:{},
      comments:[]
    }
  },
  computed: {
    ...mapWritableState(useCounterStore, ['baseUrl','basePost','baseFavourite','isLogin','movieDetail'])
  },
  created(){
    this.mountData();
  },
  mounted(){
    this.mountData();

    console.log("Mounted with data:")
    console.log(this.movieDetail);
  },
  methods:{
     ...mapActions(useCounterStore, ['setError']),
    mountData() {
        let tempThis=this;
        console.log(this.$router.currentRoute._rawValue.params.id);
        console.log(this.baseUrl+this.basePost+"/"+this.$router.currentRoute._rawValue.params.id)
        axios
        .get(this.baseUrl+this.basePost+"/"+this.$router.currentRoute._rawValue.params.id)
        .then(res => {
          console.log("DATA IS HERE")
          console.log(res.data);
          tempThis.movieDetail=res.data.Post;
          tempThis.comments=[]
          res.data.Comments.forEach(element => {
            tempThis.comments.push(element);
          });
          console.log(tempThis.movieDetail);
        })
        .catch(e => {
          console.log(e.response.data);
          tempThis.setError(e.response.data.message);
        });
      
    
  }
  }
}
</script>

<template>
        <div class="d-flex justify-content-center">
        <div class="col-12 col-md-6">
            <h1>Post Details</h1>
          <div class="card mb-6">
            <img v-if="movieDetail.media" :src="movieDetail.media" class="card-img-top" />
            <!-- <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" v-if="movieDetail.media" :src="movieDetail.media"></iframe> -->
            <!-- </div> -->
            <div class="card-body card-body">
              <h1 class="card-title text-justify">{{movieDetail.title}}</h1>
              <label><small class="text-muted"></small></label><p class="card-text">{{movieDetail.description}}</p>
              <!-- <p class="card-text">Rating:{{movieDetail.rating}}</p> -->
              
              <label><small class="text-muted">Comments:</small></label>
                <p v-for="comment in comments" :key="comment.id">{{comment.Comment.comment}}</p>
                <!-- <button class="btn btn-secondary" v-for="genre in movieDetail.MovieGenres" :key="genre.GenreId">{{genre.Genre.name}}</button> -->
              </div>
            </div>
            
          </div>
          </div>
</template>
