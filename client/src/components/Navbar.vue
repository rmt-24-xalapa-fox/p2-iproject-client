<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLogin: localStorage.getItem("access_token"),
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.isLogin = false;
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark text-light">
    <div class="container">
      <router-link to="/" class="navbar-brand mb-0 h1" href="#">Laundry<span style="color:#6BAF92">Qilo</span> </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active">
            <router-link to="/" class="nav-link" href="">Home</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/myorder" class="nav-link" href="">My Order</router-link>
          </li>
        </ul>
        <button type="button" class="btn btn-outline-light btn-sm d-flex" @click.prevent="logout">Sign out</button>
      </div>
    </div>
  </nav>
</template>
<style></style>
