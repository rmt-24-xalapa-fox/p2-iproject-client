<script>

export default {
  name: "HomePage"
}
</script>

<template>
  <section class="dark">
    <div class="container py-2">
      <article class="postcard dark red">
        <div>
          <img class="postcard__img"
            src="https://communication.binus.ac.id/files/2022/01/getty_626660256_2000108620009280158_388846-2.jpg"
            alt="Image Title" />
        </div>
        <div class="postcard__text">
          <h1 class="postcard__title red"><a href="#">TOP 10 CHART MUSIC</a></h1>
          <div class="postcard__bar"></div>
          <div class="postcard__preview-txt">Musik. Musik terdiri dari beberapa unsur, yaitu melodi, harmoni, ritme, dan
            timbre. Musik termasuk sejenis fenomena intuisi, untuk mencipta, memperbaiki, dan mempersembahkannya adalah
            suatu bentuk seni. Musik adalah sebuah fenomena unik yang dihasilkan oleh beberapa alat musik.</div>
        </div>
      </article>

      <article class="postcard dark red">
        <div>
          <img class="postcard__img"
            src="https://asset.kompas.com/crops/-oUyfkUJiCOdEjxXiDkxF-ds-jA=/1180x695:4937x3199/750x500/data/photo/2021/10/14/61683167d3ee7.jpg"
            alt="Image Title" />
        </div>
        <div class="postcard__text">
          <h1 class="postcard__title red"><a href="#">TOP 10 RADIO STATION</a></h1>
          <div class="postcard__bar"></div>
          <div class="postcard__preview-txt">Radio adalah teknologi yang digunakan untuk pengiriman sinyal dengan cara
            modulasi dan radiasi elektromagnetik. Gelombang ini melintas, dan merambat lewat udara, dan bisa juga
            merambat lewat ruang angkasa yang hampa udara, karena gelombang ini tidak memerlukan medium pengangkut</div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Baloo+2&display=swap");

/* This pen */
body {
  font-family: "Baloo 2", cursive;
  font-size: 16px;
  color: #ffffff;
  text-rendering: optimizeLegibility;
  font-weight: initial;

}

.dark {
  top: 300px;
  background-color: #424242
}

a,
a:hover {
  text-decoration: none;
}

#pageHeaderTitle {
  text-transform: uppercase;
  text-align: center;
  font-size: 2.5rem;
}

/* Cards */
.postcard {
  flex-wrap: wrap;
  display: flex;
  box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.66);
  border-radius: 10px;
  margin: 0 0 2rem 0;
  overflow: hidden;
  position: relative;
  color: #ffffff;
}

.postcard.dark {
  background-color: #18151f;
}

.postcard.light {
  background-color: #e1e5ea;
}

.postcard .t-dark {
  color: #18151f;
}

.postcard a {
  color: inherit;
}

.postcard h1,
.postcard .h1 {
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}

.postcard .small {
  font-size: 80%;
}

.postcard .postcard__title {
  font-size: 1.75rem;
}

.postcard .postcard__img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: relative;
}

.postcard .postcard__img_link {
  display: contents;
}

.postcard .postcard__bar {
  width: 50px;
  height: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #424242;
  transition: width 0.2s ease;
}

.postcard .postcard__text {
  padding: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
}

.postcard .postcard__preview-txt {
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  height: 100%;
}

.postcard .postcard__tagbox .tag__item {
  display: inline-block;
  background: rgba(83, 83, 83, 0.4);
  border-radius: 3px;
  padding: 2.5px 10px;
  margin: 0 5px 5px 0;
  cursor: default;
  user-select: none;
  transition: background-color 0.3s;
}

.postcard .postcard__tagbox .tag__item:hover {
  background: rgba(83, 83, 83, 0.8);
}



@media screen and (min-width: 769px) {
  .postcard {
    flex-wrap: inherit;
  }

  .postcard .postcard__title {
    font-size: 2rem;
  }

  .postcard .postcard__tagbox {
    justify-content: start;
  }

  .postcard .postcard__img {
    max-width: 500px;
    max-height: 100%;
  }

  .postcard .postcard__text {
    padding: 3rem;
    width: 100%;
  }

  .postcard .media.postcard__text:before {
    content: "";
    position: absolute;
    display: block;
    background: #18151f;
    top: -20%;
    height: 130%;
    width: 55px;
  }

  .postcard:hover .postcard__img {
    transform: scale(1.1);
  }

  .postcard:nth-child(2n+1) {
    flex-direction: row;
  }

  .postcard:nth-child(2n+0) {
    flex-direction: row-reverse;
  }

  .postcard:nth-child(2n+1) .postcard__text::before {
    left: -12px !important;
    /* transform: rotate(4deg); */
  }

  .postcard:nth-child(2n+0) .postcard__text::before {
    right: -12px !important;
    transform: rotate(-4deg);
  }
}

/* COLORS */
</style>
