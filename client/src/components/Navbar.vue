<script>
export default {
  name: "Navbar",
};
</script>
<template>
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container px-4 px-lg-5">
      <a class="navbar-brand fst-italic" href="">
        <img src="../assets/img/Be-pro-v2.png" alt="" width="40" height="40" />
        Be Pro
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="">Hero</a></li>
          <li class="nav-item"><a class="nav-link" href="">Tutorial</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">Build</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="">List Build Item</a></li>
              <li><a class="dropdown-item" href="">Add Build Item</a></li>
            </ul>
          </li>
        </ul>
        <button class="btn btn-outline-light" type="submit">Login</button>
        <button class="btn btn-outline-light" type="submit">Logout</button>
      </div>
    </div>
  </nav>
</template>
