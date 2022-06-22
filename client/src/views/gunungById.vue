<script>
export default {
  name: "gunungById",
};
</script>

<template>
  <div class="row">
    <div class="page">
      <div class="col-12 picture">
        <img
          class="entity-id"
          src="https://img.inews.co.id/media/822/files/inews_new/2022/04/10/10_hal_menarik_tentang_gunung_gede_pangrango.jpg"
          alt="img"
        />
      </div>

      <div class="col-6">
        <!-- <h6 style="padding: 10px">
            <span>Created By: </span>{{ displayNewsById.User.email }}
          </h6> -->
        <h1 style="padding: 10px">Gunung Gede</h1>
        <p style="padding: 10px">
          Gunung Gede-Pangrango merupakan dua gunung yang terdiri dari gunung
          Gede dan Gunung Pangrango. Walaupun seperti menyatu, ketinggian gunung
          Gede Pangrango berbeda. Ketinggian Gunung Gede adalah 2.958 m dpl
          (diatas permukaan laut). Sedangkan ketinggian gunung Pangrango adalah
          3.019 m dpl. Kedua gunung ini dihubungkan oleh gigir gunung serupa
          sadel pada ketinggian +_ 2.400 m dpl, yang kita kenal saat ini sebagai
          daerah Kandang Badak. Gunung Pangrango yang lebih tinggi , memiliki
          puncak berbentuk kerucut yang relatif mulus. Ini menandakan tipe
          gunung yang usianya relatif masih muda dan belum pernah meletus. Untuk
          Gunung Gede walau ketinggiannya lebih rendah, namun masih aktif. Ini
          daapat kita lihat dari keberadaan kawah-kawah aktif antara lain Kawah
          Wadon, Kawah Ratu, Kawah Baru, dan Kawah Lanang.Titik puncak Gunung
          Gede terletak di atas tebing atau gigir kawah yang baru, namun gigir
          ini tak lagi utuh karena telah dihancurkan oleh letusan volkanik yang
          terjadi berulang kali. Gigir yang lebih tua adalah punggung gunung
          yang dikenal sebagai Gunung Gumuruh (2.929 m dpl); kawah-kawah dan
          puncak Gunung Gede yang sekarang terletak pada bekas kawah Gunung
          Gumuruh lama yang telah punah. Di antara gigir Gunung Gede dan gigir
          Gunung Gumuruh itulah terletak lembah dataran tinggi bernama Alun-alun
          Suryakancana (2.750 m dpl), yang penuh tertutupi oleh rumpun edelweis
          jawa yang cantik.
        </p>
      </div>
      <div class="col-6 barcode">
        <h1 style="padding: 10px">Quota Gunung Gede</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Quota Tersisa</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>Gunung Gede</td>
            <td>2022-06-23</td>
            <td>30/60</td>
            <td>
              <button>Buy License</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Gunung By Id */
.page {
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
}
.picture {
  height: 500px;
}
.entity-id {
  height: 100%;
  width: 100%;
}
.barcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
/* global */
.middle {
  flex-direction: column;
  justify-content: center;
}
/* end Gunung By Id */
</style>
