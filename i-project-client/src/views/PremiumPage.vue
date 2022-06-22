<script>
import NavbarPageVue from '../components/NavbarPage.vue'
import { mapActions, mapWritableState } from 'pinia'
import { useMusicYuhu } from '../stores/counter.js'

export default {
  name: "PremiumPage",
  components:{
    NavbarPageVue
  },
  methods: {
    ...mapActions(useMusicYuhu, ["premiumpurchase"])
  },
  computed: {
    ...mapWritableState(useMusicYuhu, ["userpremium"])
  },
  created(){
    
  }
}
</script>

<template>
<NavbarPageVue/>
  <div class="container">
    <div class="row content">
      <div class="col-md-6">
        <img src="https://vtara36.com/wp-content/uploads/2021/11/radio-music1.jpg" class="img-fluid" alt="image"
          id="imageInput">
      </div>
      <div class="col-md-6">
        <h3 class="signin-text mb-3">PREMIUM PURCHASING</h3>
        <form action="" class="loginForm">
          <div class="form-group">
            <label for="email">Name</label>
            <input type="email" name="name" v-model="userpremium.name" placeholder="" class="form-control">
          </div>
          <div class="form-group">
            <label for="password">Phone Number</label>
            <input type="password" name="password" v-model="userpremium.phoneNumber" placeholder="" class="form-control">
          </div>
          <div class="mb-3">
            <button type="submit" @click.prevent="premiumpurchase" class="btn btn-block text-uppercase">
              Continue
            </button>
          </div>
        </form>
        
        

        <hr class="my-4">

      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
    url("https://vtara36.com/wp-content/uploads/2021/11/radio-music1.jpg");
}

.content {
  background-color: #4d8d83;
  position: relative;
  margin: 8%;
  padding: 4rem 1rem 4rem 1rem;
  box-shadow: 0 0 5px 5px;
}

.form-control {
  display: block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}

#imageInput {
  position: relative;
  top: 10px;
}




/* ============================ */
</style>
