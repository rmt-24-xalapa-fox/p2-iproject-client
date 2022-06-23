<template>
  <div class="col-12 col-md-4 mx-auto mt-3">
      
        <h2>Add Movie</h2>
        <div class="card-body d-flex flex-row">
        <form @submit="doAddPost">
          <div class="form-group">
          <label>Title:</label>
          <input type="text" v-model="title">
          </div>
          <div class="form-group">
          <label>Description:</label>
          <input type="text" v-model="description">
          </div>
          <div class="form-group">
          <label>Media:</label>
          <input type="text" v-model="media">
            <button type="submit" >Add</button>
            </div>
        </form>
        </div>
      </div>
</template>

<script>
import axios from "axios";
import { mapActions,mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'FormMovie',
  computed: {
    ...mapWritableState(useCounterStore, ['baseUrl','basePost'])
  },
  data(){
    return{
      title:'',
      description:'',
      media:''
    }
  },
  methods:{
    ...mapActions(useCounterStore, ['setError']),    
    doAddPost(event) {
      event.preventDefault();
      console.log(this.genres)
      console.log('axios fired')
      console.log(this.title)
      let access_token=localStorage.getItem("access_token")
      
        console.log(this.genres)
      axios.post(this.baseUrl + this.basePost, {
            title: this.title,
            description: this.description,
            media:this.media
          },{
            headers: { access_token }
          })
          .then((response) => {
            console.log(response);
            this.$router.push({path:'/'})
            this.setError("Post added")
        })
        .catch(err => {
            this.$emit('error', err)
          console.log(err);
        });
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
