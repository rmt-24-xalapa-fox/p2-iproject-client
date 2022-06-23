<script>
import axios from 'axios';

import { mapActions,mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  data(){
    return{
      text:"Favourite",
      postdata:{},
      comment:''
    }
  },
  computed: {
    ...mapWritableState(useCounterStore, ['baseUrl','basePost','baseFavourite','isLogin','postDetail','comments'])
  },
  created(){
    this.mountData();
  },
  watch(){

  },
  mounted(){
    this.mountData();

    console.log("Mounted with data:")
    console.log(this.postDetail);
  },
  methods:{
     ...mapActions(useCounterStore, ['setError','sendComment']),
    mountData() {
        let tempThis=this;
        console.log(this.$router.currentRoute._rawValue.params.id);
        console.log(this.baseUrl+this.basePost+"/"+this.$router.currentRoute._rawValue.params.id)
        axios
        .get(this.baseUrl+this.basePost+"/"+this.$router.currentRoute._rawValue.params.id)
        .then(res => {
          console.log("DATA IS HERE")
          console.log(res.data);
          tempThis.postDetail=res.data.Post;
          tempThis.comments=[]
          res.data.Comments.forEach(element => {
            tempThis.comments.push(element);
          });
          console.log(tempThis.postDetail);
        })
        .catch(e => {
          console.log(e.response.data);
          tempThis.setError(e.response.data.message);
        });
  },
  doAddComment(){
    this.sendComment({comment:this.comment,id:this.postDetail.id});
  }

  }
}
</script>

<template>
        <div class="d-flex justify-content-center">
        <div class="col-12 col-md-6">
            <h1>Post Details</h1>
          <div class="card mb-6">
            <img v-if="postDetail.media" :src="postDetail.media" class="card-img-top" />
            <!-- <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" v-if="movieDetail.media" :src="movieDetail.media"></iframe> -->
            <!-- </div> -->
            <div class="card-body card-body">
              <h1 class="card-title text-justify">{{postDetail.title}}</h1>
              <label><small class="text-muted"></small></label><p class="card-text">{{postDetail.description}}</p>
              <!-- <p class="card-text">Rating:{{movieDetail.rating}}</p> -->
              <div class="col-12 col-md-4 mx-auto mt-3">
      
        <h2>Add Comment</h2>
        <div class="card-body d-flex flex-row">
        <form @submit.prevent="doAddComment">
          <div class="form-group">
          <input type="text" v-model="comment">
          </div>
            <button type="submit" >Add</button>
        </form>
        </div>
      </div>
              <label><small class="text-muted">Comments:</small></label>
                <p v-for="comment in comments" :key="comment.id">{{comment.Comment.comment}} by {{comment.Comment.User.email}}</p>
                
              </div>
            </div>
            
          </div>
          </div>
</template>
