<script>
export default {
  name: "navbar",
};
</script>

<template>
  <!-- Nabar -->
  <nav class="col-12">
    <div class="header">
      <div class="judul">
        <h1>Integrasi Simaksi Online</h1>
      </div>
      <div class="menu">
        <a class="pointer" style="text-decoration: none">List Gunung</a>
        <a class="pointer" style="text-decoration: none">My License</a>
        <a class="pointer" style="text-decoration: none">Logout</a>
        <a class="pointer" style="text-decoration: none">Login</a>
      </div>
    </div>
  </nav>
  <!-- End Nabar -->
</template>

<style scoped>
/* navbar */
.header {
  display: flex;
  padding: 10px;
  background: #000000;
  color: white;
  font-size: 30px;
  min-width: 100vw;
}
.header a {
  padding-left: 30px;
  padding-right: 30px;
  color: white;
}
.pointer {
  cursor: pointer;
}
.header h1 {
  margin-left: 20px;
  margin-right: 20px;
}
/* end navbar */
</style>
