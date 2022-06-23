<template>
  <div class="card mb-3" style="max-width: 540px">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          style="cursor: pointer"
          @click.prevent="moveDetail(mine.Player.id)"
          :src="mine.Player.imgUrl1"
          class="img-fluid rounded-start"
          alt="..."
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <div class="row">
            <div class="col-9">
              <h5
                style="cursor: pointer"
                @click.prevent="moveDetail(mine.Player.id)"
                class="card-title"
              >
                {{ mine.Player.name }}
              </h5>
            </div>
            <div class="col-3 mt-1">
              <a
                class="btn btn-danger"
                @click.prevent="funcDelete(mine.id)"
                href=""
                ><ion-icon
                  style="color: whitesmoke"
                  name="trash-outline"
                ></ion-icon
              ></a>
            </div>
          </div>
          <p class="card-text">
            {{ formatRupiah(mine.Player.price) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useProductStore } from "../stores/product";

export default {
  name: `CartCard`,
  props: ["mine"],
  methods: {
    ...mapActions(useProductStore, ["deleteFavorites", "getFavorites"]),
    formatRupiah(num) {
      let formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(num);
    },
    async funcDelete(id) {
      try {
        // console.log(id);
        await this.deleteFavorites(id);
        await this.getFavorites();
        this.$swal.fire({
          icon: "success",
          title: `Success`,
          text: `Success delete data`,
          timer: 1000,
        });
      } catch (err) {
        this.$swal.fire({
          icon: "error",
          title: `Error - ${err.response.data.statusCode}`,
          text: err.response.data.error.message,
          timer: 1000,
        });
      }
    },
    moveDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
};
</script>
<style>
.img-fluid {
  width: 70%;
  height: 15vw;
  object-fit: cover;
}
</style>
