<script>
export default {
  name: "CardCharacters",
  props: ["character"],
};
</script>

<template>
  <figure class="card">
    <img :src="character.url" />
    <figcaption>{{ character.name }}</figcaption>
  </figure>
</template>
