<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 mt-3">
        <p style="font-size: 19px; font-weight: 600">My Cart</p>
        <CartCard v-for="dat in favorites" :key="dat.id" :mine="dat" />
      </div>
      <div class="col-md-4 mt-3">
        <div class="card text-bg-light mt-5" style="max-width: 20rem">
          <div class="card-header">Total Cart</div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <p class="card-title">Total Harga:</p>
              </div>
              <div class="col">{{ formatRupiah(favTotalPrice) }}</div>
            </div>
            <div class="row">
              <div class="col-12">
                <router-link to="/shippay" type="button" class="btn btn-primary"
                  >Buy</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useProductStore } from "../stores/product";
import CartCard from "../components/CartCard.vue";
export default {
  name: `CartPage`,
  data() {
    return {
      totalPrice: 0,
    };
  },
  computed: {
    ...mapState(useProductStore, ["favorites", "favTotalPrice"]),
  },
  methods: {
    ...mapActions(useProductStore, ["getFavorites"]),
    async fetchData() {
      try {
        await this.getFavorites();
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
    formatRupiah(num) {
      let formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(num);
    },
  },
  created() {
    this.fetchData();
  },
  components: { CartCard },
};
</script>
