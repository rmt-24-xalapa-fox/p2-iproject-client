<script>
export default {
  name: "header",
};
</script>

<template>
  <svg
    style="position: absolute; z-index: -999"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
  >
    <path
      fill="#0099ff"
      fill-opacity="1"
      d="M0,224L48,192C96,160,192,96,288,90.7C384,85,480,139,576,165.3C672,192,768,192,864,192C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    ></path>
  </svg>
  <div class="d-flex container" style="margin-top: 5%">
    <div class="col-6" style="margin-top: 10%">
      <div>
        <h1>Explore Indonesia !</h1>
      </div>
      <div>
        <p>
          Travel adalah pilihan terbaik untuk menjelajah wisata Indonesia. hanya
          dengan satu sentuhan anda bisa mendapatkan fasilitas yang lengkap,
          Mulai dari, Hotel, Tiket pesawat hingga penginapan bisa anda dapatkan
          hanya dengan satu sentuhan!
        </p>
      </div>
    </div>
    <div class="rounded" style="overflow: hidden">
      <img
        src="../assets/elizeu-dias-RN6ts8IZ4_0-unsplash.jpg"
        alt=""
        style="height: 400px; width: 500px"
      />
    </div>
  </div>
</template>

<style>
body {
  padding: 0;
  margin: 0;
}
</style>
