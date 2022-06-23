<script>
import axios from 'axios';
import { mapActions } from 'pinia'
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  props: {
    msg: String
  },
  data(){
    return{
      email:"",
      password:"",
      phone:"",
      address:""
    }
  },
  computed: {
    ...mapWritableState(useCounterStore, ['isLogin','baseUrl','baseLogin','baseRegister','baseLoginGoogle'])
  },
  methods:{
    ...mapActions(useCounterStore, ['checkLogin','setError']),
    doLogin(event){
      event.preventDefault();
      console.log("Logged in")
      let tempThis=this;
      if(this.$router.currentRoute._value.name=="login"){
        axios.post(this.baseUrl+""+this.baseLogin,{email:this.email,password:this.password}).then((response)=>{
        console.log(response.data);
        localStorage.setItem("access_token",response.data.access_token);
        localStorage.setItem("user", response.data.email);
        this.setError("Logged in, please wait")
        tempThis.$router.push({path:'/'})
      }).catch((error)=>{
        console.log(error);
        this.setError(error.response.data.message)
      })
      }else{
        axios.post(this.baseUrl+""+this.baseRegister,{email:this.email,password:this.password,phoneNumber:this.phone,address:this.address}).then((response)=>{
        console.log(response.data);
        tempThis.$router.push({path:'/login'})
        this.setError("Registered, please login")
      }).catch((error)=>{
        console.log(error);
        this.setError(error.response.data.message)
      })
      }
      
    },
    onSignIn(googleUser) {
  console.log(googleUser.credential);
  axios.post(this.baseUrl + this.baseLoginGoogle, {
            token: googleUser.credential
          })
          .then((response) => {
            console.log(response);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("user", response.data.email);
          this.setError("Logged In, please wait")
          this.$router.push({path:'/'})
        })
        .catch(err => {
          this.setError(err.response.data.message)
          console.log(err);
        });
},
  },
  mounted(){
    // this.checkLogin();
    // if(this.isLogin){
    //   console.log("Logged in")
    //   this.$router.push({path:'/'})
    // }else{
    //   console.log("notLoggedIN");
    // }
    // console.log(this.$router.name);
  }
}
</script>

<template>
  <div class="col-12 col-md-4 mx-auto mt-3">
      <div class="card my-2">
        <img src="../assets/logo.png" class="card-img-top" />
        <div class="card-body d-flex flex-row">
          <form class="col-12" @submit.prevent="doLogin">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" v-model="email" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type ="password" v-model="password" class="form-control" required />
            </div>
            <div class="form-group" v-if="$router.currentRoute._value.name!='login'">
              <label for="phone">Phone Number</label>
              <input type ="text" v-model="phone" class="form-control" />
            </div>
            <div class="form-group" v-if="$router.currentRoute._value.name!='login'">
              <label for="address">Address</label>
              <input type ="text" v-model="address" class="form-control" />
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-info">{{$router.currentRoute._value.name}}</button>
            </div>

            <h2>
                    <label>Or Sign In via Google</label>
                    <br />
                  </h2>
                  <GoogleLogin :callback="onSignIn"/>
          </form>
        </div>
      </div>
    </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
