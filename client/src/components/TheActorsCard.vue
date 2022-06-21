<script>
export default {
  name: "TheActorsCard",
  props: ["actor"],
  computed: {
    profileImage() {
      return (
        "https://image.tmdb.org/t/p/w235_and_h235_face/" +
        this.actor.profile_path
      );
    },
  },
};
</script>

<template>
  <div>
    <div>
      <img :src="profileImage" alt="" />
      <h3>{{ actor.name }}</h3>
    </div>
  </div>
</template>

<style></style>
