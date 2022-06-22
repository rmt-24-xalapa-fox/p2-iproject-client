<script>
import { mapActions, mapState } from "pinia";
import { useIndexStore } from "../stores";
export default {
  name: "listGunung",
  methods: {
    ...mapActions(useIndexStore, ["fetchMountains"]),
    toMountainsIdPage(MountainId) {
      this.$router.push(`/mountains/${MountainId}`);
    },
  },
  computed: {
    ...mapState(useIndexStore, ["mountains"]),
  },
  created() {
    this.fetchMountains()
      .then(() => {})
      .catch(() => {
        let errMsg = err.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errMsg}`,
        });
      });
  },
};
</script>

<template>
  <div class="row">
    <!-- list -->
    <h1>List Gunung</h1>

    <!-- card -->
    <div class="col-12 data-card">
      <div
        v-for="el in mountains"
        :key="el.id"
        @click.prevent="toMountainsIdPage(el.id)"
        class="card pointer"
      >
        <img :src="el.imageUrl" />
        <div class="container">
          <h4 class="middle input-card">{{ el.name }}</h4>
          <p>Height: {{ el.height }}</p>
          <p>{{ el.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* List Gunung */
.data-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  height: auto;
  margin-top: 50px;
  text-align: center;
}
.card img {
  width: 100%;
  height: 40%;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  padding: 15px 16px;
}
.input-card {
  padding: auto;
  margin-bottom: 10px;
}

h1 {
  padding: 20px;
  padding-left: 100px;
  padding-top: 50px;
}
.pointer {
  cursor: pointer;
}
/* end List Gunung */
</style>
