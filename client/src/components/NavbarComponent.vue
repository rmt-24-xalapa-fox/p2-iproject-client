<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-cust">
    <div class="container-fluid">
      <router-link
        to="/"
        class="navbar-brand ms-4 line-text"
        style="font-family: sans-serif; font-size: 24px"
        >Cardbas</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav butupin">
          <li class="nav-item"></li>
          <li class="nav-item"></li>
          <li class="nav-item ms-3"></li>
          <li v-if="isLogin" class="nav-item dropdown ms-3">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="color: black"
            >
              Hi, Fellas
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link
                to="/cart"
                style="text-decoration: none; color: black"
                class="ms-1"
                ><ion-icon name="cart-outline"></ion-icon> Cart</router-link
              >
              <div class="dropdown-divider"></div>
              <router-link
                to="/collection"
                style="text-decoration: none; color: black"
                class="ms-1"
                ><ion-icon name="card-outline"></ion-icon>
                Collection</router-link
              >
              <div class="dropdown-divider"></div>
              <a
                style="text-decoration: none; color: black"
                href=""
                @click.prevent="logout"
                class="ms-1"
                ><ion-icon name="log-out-outline"></ion-icon> Sign Out</a
              >
            </div>
          </li>
          <li class="nav-item ms-2">
            <router-link
              v-if="!isLogin"
              to="/login"
              class="btn btn-outline-info butlog"
              >Sign In</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUserStore } from "../stores/user";
export default {
  name: `NavbarComp`,

  computed: {
    ...mapState(useUserStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(useUserStore, ["setIsLogin"]),
    logout() {
      localStorage.clear();
      this.$router.push("/");
      this.setIsLogin(false);
      this.$swal.fire({
        title: "Success!",
        text: "Succesfully logout from our system!",
        icon: "success",
      });
    },
  },
};
</script>

<style>
@media (min-width: 1200px) {
  .butupin {
    margin-left: 72vw;
  }
}
@media (min-width: 900px) {
  .butupin {
    margin-left: 72vw;
  }
}
.navbar-cust {
  box-shadow: 1px 1px #b3b3b3;
  background-color: #ffff !important;
}
.butlog {
}
</style>
