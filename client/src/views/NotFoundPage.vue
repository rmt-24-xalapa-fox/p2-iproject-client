<template>
  <div class="container error-container">
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col-md-12 text-center">
        <h1 class="big-text">Oops!</h1>
        <h2 class="small-text">404 - PAGE NOT FOUND</h2>
      </div>
      <div class="col-md-6 text-center">
        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>

        <router-link
          to="/"
          href="# "
          class="button button-dark-blue iq-mt-15 text-center"
          >HOME PAGE</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotfoundPage",
};
</script>

<style>
body {
  background: #fff;
}
.error-container {
  height: 85vh !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: montserrat, sans-serif;
}
.big-text {
  font-size: 200px;
  font-weight: 900;
  font-family: sans-serif;
  background: url(https://upload.wikimedia.org/wikipedia/id/thumb/0/01/Golden_State_Warriors_logo.svg/1200px-Golden_State_Warriors_logo.svg.png)
    no-repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: cover;
  background-position: center;
}
.small-text {
  font-family: montserrat, sans-serif;
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
}
.form-group {
  display: flex;
}
.button {
  color: black;
  padding: 12px 36px;
  font-weight: 600;
  border: none;
  position: relative;
  font-family: "Raleway", sans-serif;
  display: inline-block;
  text-transform: uppercase;
  -webkit-border-radius: 90px;
  -moz-border-radius: 90px;
  border-radius: 90px;
  margin: 2px;
  margin-top: 2px;
  background-image: linear-gradient(
    to right,
    #edea4c 0%,
    #1c7eed 51%,
    #98fb98 100%
  );
  background-size: 200% auto;
  flex: 1 1 auto;
  text-decoration: none;
}
.button:hover,
.button:focus {
  color: black;
  background-position: right center;
  -webkit-box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}
</style>
