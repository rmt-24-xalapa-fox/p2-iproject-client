<script>

export default {
  name: "NavbarPage"
}
</script>

<template>
  <nav
      class="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      id="navbarAll"
    >
      <div class="container-fluid" id="navbarAlltest">
        <RouterLink to="/" style="cursor: pointer" class="navbar-brand">Music</RouterLink>
        <RouterLink to="/" style="cursor: pointer" class="navbar-brand">Radio</RouterLink>
        <RouterLink to="/" style="cursor: pointer" class="navbar-brand">Premium</RouterLink>


        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav" id="textnavbar">
            <li class="nav-item">
              <a style="cursor: pointer" class="navbar-brand" id="logout">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<style scoped>
#navbarAlltest {
    background-color: rgb(0, 0, 0);
    height: 70px;
}

#navbarAll #navbarAlltest .navbar-brand {
    color: rgb(255, 255, 255);
}


</style>
