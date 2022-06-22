<template>
  <div class="card ms-3 m-2" style="width: 18rem">
    <img
      @click.prevent="detailCard(player.id)"
      :src="player.imgUrl1"
      class="card-img-top"
      style="cursor: pointer"
      alt="image"
    />

    <div class="card-body" @click.prevent="detailCard(player.id)">
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
      v-if="!infor"
      href="#"
      class="btn btn-warning btn-sm ms-3 mb-2"
      ><ion-icon style="color: black" name="cart-outline"></ion-icon
    ></a>
    <p v-if="infor" class="ms-3" style="color: red; font-weight: 600">Sold</p>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useProductStore } from "../stores/product";

export default {
  name: `CardComponent`,
  props: ["player"],
  data() {
    return {
      infor: false,
    };
  },
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
        // console.log(err);
        this.$swal.fire({
          icon: "error",
          title: `Error - ${err.response.data.statusCode}`,
          text: err.response.data.error.message,
          timer: 1000,
        });
      }
    },
    splitData() {
      if (this.player.Users.length < 1) {
        return (this.infor = false);
      } else if (this.player.Users[0].CardUser.status == `unpaid`) {
        return (this.infor = false);
      }
      this.infor = true;
    },
    detailCard(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
  created() {
    this.splitData();
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
.btn-sm {
  background-color: #f7fcca;
}
</style>
