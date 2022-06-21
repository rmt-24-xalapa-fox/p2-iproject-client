<template>
  <div class="card ms-3 m-2" style="width: 18rem">
    <img
      :src="player.imgUrl1"
      class="card-img-top"
      style="cursor: pointer"
      alt="image"
    />
    <div class="card-body">
      <h5 class="card-title" style="cursor: pointer">{{ player.name }}</h5>

      <button
        type="button"
        class="btn btn-primary btn-sm rounded-pill"
        disabled
      >
        {{ player.Category.name }}
      </button>
    </div>
    <a
      @click.prevent="funcAdd(player.id)"
      v-if="!player.Users[0]"
      href="#"
      class="ms-3 mb-2"
      ><ion-icon style="color: black" name="cart-outline"></ion-icon
    ></a>
    <p v-else class="ms-3" style="color: red">Sold</p>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useProductStore } from "../stores/product";

export default {
  name: `CardComponent`,
  props: ["player"],
  methods: {
    ...mapActions(useProductStore, ["addToList", "getProducts"]),
    async funcAdd(id) {
      try {
        await this.addToList(id);
        await this.getProducts();
        console.log(`success`);
        this.$swal.fire({
          icon: "success",
          title: `Success - 200`,
          text: `Success Add data`,
          timer: 1000,
        });
      } catch (err) {
        console.log(err);
        this.$swal.fire({
          icon: "error",
          title: `Error - ${err.response.data.statusCode}`,
          text: err.response.data.error.message,
          timer: 1000,
        });
      }
    },
  },
};
</script>
<style>
.card-img-top {
  width: 100%;
  height: 28vw;
  object-fit: cover;
}
ion-icon {
  font-size: 2vw;
}
</style>
