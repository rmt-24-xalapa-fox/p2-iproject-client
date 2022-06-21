<script>
export default {
  name: "CardCharacters",
  props: ["character"]
};
</script>

<template>
  <!-- <div class="cards"> -->
    <figure class="card">
      <img :src="character.url" />

      <figcaption>{{character.name}}</figcaption>
    </figure>

    <!-- <figure class="card">
      <img src="https://mrreiha.keybase.pub/codepen/hover-fx/3.jpg" />

      <figcaption>Minion Masters</figcaption>
    </figure>

    <figure class="card">
      <img src="https://mrreiha.keybase.pub/codepen/hover-fx/4.jpg" />

      <figcaption>KoseBoz!</figcaption>
    </figure> -->
  <!-- </div> -->
</template>
