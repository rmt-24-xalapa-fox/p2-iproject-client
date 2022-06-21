<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    aria-label="Ninth navbar example"
    style="background-color: black"
  >
    <div class="container-xl">
      <a class="navbar-brand retrofont" href="#">GACHAMON</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample07XL"
        aria-controls="navbarsExample07XL"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample07XL">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/mydigimon">
              <a class="nav-link active" href="#">My Digimon</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/topup">
              <a class="nav-link active" href="#">Topup</a>
            </router-link>
          </li>
          <!-- <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="dropdown07XL"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Dropdown</a
            >
            <ul class="dropdown-menu" aria-labelledby="dropdown07XL">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li>
                <a class="dropdown-item" href="#">Something else here</a>
              </li>
            </ul>
          </li> -->
        </ul>
        <!-- <form role="search">
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form> -->

        <h6
          class="text-light retrofont"
          style="margin-right: 5px; font-size: 11px"
        >
          {{ userCoin }}
        </h6>
        <h6
          class="retrofont"
          style="color: gold; margin-right: 20px; font-size: 11px"
        >
          Koin
        </h6>
        <!-- <button class="btn btn-primary" style="margin-right: 30px">
            Topup
          </button> -->
        <button @click="clickLogout" class="btn btn-danger">Logout</button>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useMainStore } from "../stores";
export default {
  computed: {
    ...mapState(useMainStore, ["userCoin"]),
  },
  methods: {
    ...mapActions(useMainStore, ["setIsLogin", "fetchGachaCoin"]),
    clickLogout: function () {
      localStorage.clear();
      this.setIsLogin(false);
      this.$router.push("/login");
    },
  },
  created() {
    this.fetchGachaCoin();
  },
};
</script>
