<script>
import { mapState, mapActions } from "pinia";
import { useHeroStore } from "../stores/heroes";
import { RouterLink } from "vue-router";
export default {
  name: "Navbar",
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(useHeroStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(useHeroStore, ["fetchHeroes", "getItem"]),
    toLogin() {
      this.$router.push(`/login`);
    },

    toLogout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, LogOut!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("LogOut!", "Success to Logout", "success");
        }
        localStorage.clear();
        this.$router.push(`/`);
        this.fetchHeroes();
      });
    },
  },
  created() {
    this.fetchHeroes();
  },
};
</script>
<template>
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container px-4 px-lg-5">
      <RouterLink to="/" class="navbar-brand fst-italic" href="">
        <img src="../assets/img/Be-pro-v2.png" alt="" width="40" height="40" />
        Be Pro
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item"><RouterLink to="/" class="nav-link active" aria-current="page" href="">Hero</RouterLink></li>
          <li class="nav-item"><RouterLink to="/tutorial" class="nav-link active" aria-current="page" href="">Tutorial</RouterLink></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">Build</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><RouterLink to="/build" class="dropdown-item" href="">List Build Item</RouterLink></li>
              <li><RouterLink to="/add" class="dropdown-item" href="" @click.prevent="getItem">Add Build Item</RouterLink></li>
            </ul>
          </li>
        </ul>
        <button v-if="!isLogin" class="btn btn-outline-light" type="submit" @click.prevent="toLogin">Login</button>
        <button v-if="isLogin" class="btn btn-outline-light" type="submit" @click.prevent="toLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>
