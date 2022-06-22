<script>

export default {
  name: "SignupPage"
}
</script>

<template>
  <div class="container">
    <div id="kotak">
      <div class="row content">
        <div class="col-md-6">
          <img src="https://vtara36.com/wp-content/uploads/2021/11/radio-music1.jpg" class="img-fluid" alt="image"
            id="imageInput" />
        </div>
        <div class="col-md-6">
          <h3 class="signin-text mb-3">Sign Up</h3>
          <form action="" class="signUpform">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" name="username" v-model="username" placeholder="" class="form-control" />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" name="email" v-model="email" placeholder="" class="form-control" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" name="password" v-model="password" placeholder="" class="form-control" />
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" name="address" v-model="address" placeholder="" class="form-control" />
            </div>
            <div class="form-group">
              <label for="address">Phone Number</label>
              <input type="number" name="phoneNumber" v-model="phoneNumber" placeholder="" class="form-control" />
            </div>
            <div class="mb-3">
              <button @click.prevent="completeSignUp" class="btn btn-block text-uppercase">
                Sign Up
              </button>
            </div>
          </form>

          <hr class="my-4" id="kotak" />

          <div class="text-center mb-2">
            have an account?
            <a href="#" @click.prevent="toLogin" class="register-link">
              Log in here
            </a>
          </div>
        </div>
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
  top: 120px;
}




/* ============================ */
</style>
