<script>

export default {
  name: "LandingPage"
}
</script>

<template>
  <div id="headerPage">
    <h1>Music Yuhu!</h1>
    <p>see the top 10 music and radio station in the world</p>
    <div class="allBtN">
      <div id="signupHome">
        <a href="signUp.html" class="button">Sign Up</a>
      </div>
      <div id="signinHome">
        <a href="loginForm.html" class="button">log In</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
#headerPage {
  background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url("https://vtara36.com/wp-content/uploads/2021/11/radio-music1.jpg");
  /* background-image: url("https://vtara36.com/wp-content/uploads/2021/11/radio-music1.jpg"); */
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  line-height: 1.6;
  justify-content: center;
  align-items: center;
}

#headerPage h1 {
  font-size: 50px;
  color: white;
  display: flex;
  align-items: center;
}

#headerPage .button {
  font-size: 18px;
  text-decoration: none;
  color: white;
  border: white 1px solid;
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 20px;
}

#headerPage p {
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

#signupHome {
  position: relative;
  right: 10px;

}

#signinHome {
  position: relative;
  left: 10px;
}


.allBtN {
  position: relative;
  display: flex;
  align-items: center;
}
</style>
