<script>
import { mapActions } from "pinia";
import { useHeroStore } from "../stores/heroes";
import { RouterLink } from "vue-router";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  components: {
    RouterLink,
  },
  methods: {
    ...mapActions(useHeroStore, ["login", "fetchHeroes"]),
    async postLogin() {
      let data = {
        email: this.email,
        password: this.password,
      };
      let result = await this.login(data);
      if (result) {
        this.$router.push("/");
        this.fetchHeroes();
      }
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<template>
  <div class="py-5" style="background-color: rgb(192, 131, 130)">
    <div class="container">
      <div class="py-5 rounded-4" width="560" height="315" style="background-color: black">
        <div class="row justify-content-center py-5 rounded-5" width="200" height="200" style="background-color: pink">
          <div class="justify-content-center">
            <h3>LOGIN</h3>
          </div>
          <form @submit.prevent="postLogin" class="row g-3 text-dark">
            <div class="col-md-12">
              <label for="inputEmail4" class="form-label">Email</label>
              <input type="email" class="form-control" id="inputEmail4" v-model="email" />
            </div>
            <div class="col-md-12">
              <label for="inputPassword4" class="form-label">Password</label>
              <input type="password" class="form-control" id="inputPassword4" v-model="password" />
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-dark">Sign in</button>
            </div>
            <div class="col-12">
              <p>Don't have account? Please <RouterLink to="/register" href="">Register Here</RouterLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer-->
  <footer class="py-5 bg-dark">
    <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Be Pro 2022</p></div>
  </footer>
</template>
