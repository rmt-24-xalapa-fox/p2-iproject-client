<script>
import { mapActions,mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    ...mapWritableState(useCounterStore, ['isLogin','loggedinEmail'])
  },
  methods: {
    ...mapActions(useCounterStore, ['checkLogin','doLogout']),
    addPost(){
      console.log("To form add post")
      this.$router.push({path:'/addpost'})
    }
  },


}
</script>

<template>
<div class="nav-box">
  <nav class="navbar navbar-inverse fixed-top">
      
      <div class="container-fluid navbar-dark bg-dark">
    <div class="navbar-header">
      <router-link class="navbar-brand" to="/" >Insta Vue</router-link>  
       
    </div>
    
    <div>
    <ul class="nav nav-tabs">
      <li><router-link class="nav-item nav-link text-white" to="/" >Home</router-link></li>
      <li v-if="isLogin==true"><router-link class="nav-item nav-link text-white" to="/favourite" >Favourite</router-link></li>
      <li v-if="isLogin==true"><router-link class="nav-item nav-link text-white" to="/coin" >Buy Coin</router-link></li>
      <li v-if="isLogin==true"><router-link class="nav-item nav-link text-white" to="/mypost" >My Post</router-link></li>
      <li v-if="isLogin==false"><router-link class="nav-item nav-link text-white" to="/login" >Login</router-link></li>
      <li v-if="isLogin==false"><router-link class="nav-item nav-link text-white" to="/register" >Register</router-link></li>
      </ul>
      </div>
    <div v-if="isLogin==true">
      <ul class="nav nav-tabs ml-auto mt-2 mt-lg-0">
      <div>
       <li><p class="text-white ">Hello {{loggedinEmail}}</p></li>
      <li><router-link class="nav-item nav-link text-white" to="/login" @click="doLogout">Logout</router-link></li>
      </div>
      </ul>
      
      </div>
      <div v-else>
      <ul class="nav nav-tabs ml-auto mt-2 mt-lg-0">
      <div>
       <li><p class="text-white">Hello {{loggedinEmail}}, please login for more feature</p></li>
      </div>
      </ul>
      
      </div>
  </div>
  <div v-if="isLogin==true" class="ml-auto">
      <button class="btn btn-secondary btn-lg float-right btn-block navbar-dark bg-dark" @click="addPost">Add new Post</button>
    </div>      
    </nav>
    </div>
</template>
