<script>
import { mapState, mapActions } from "pinia";
import { useStore } from "@/stores/store";
import Navbar from "../components/Navbar.vue";
import HeroSection from "../components/HeroSection.vue";
export default {
  name: "OrderReview",
  components: {
    Navbar,
    HeroSection,
  },
  methods: {
    ...mapActions(useStore, ["fetchCarts", "moveToRoute"]),
    formatToRupiah(val) {
      return val.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      });
    },
  },
  computed: {
    ...mapState(useStore, ["carts"]),
    totalPrice() {
      let sum = 0;
      this.carts.forEach((el) => {
        sum += el.Book.price;
      });
      return this.formatToRupiah(sum);
    },
  },
  created() {
    this.fetchCarts();
  },
};
</script>

<template>
  <div>
    <Navbar /> <HeroSection title="Order Review" />
    <div v-if="carts" class="order-review-container">
      <h1>Your Order</h1>
      <table>
        <thead>
          <th>Title</th>
          <th>Price</th>
          <th>Quantity</th>
        </thead>
        <tbody>
          <tr v-for="cart in carts" :key="cart.id">
            <td>
              {{ cart.Book.title }}
            </td>
            <td class="center">
              {{ formatToRupiah(cart.Book.price) }}
            </td>
            <td class="center">
              <!-- <input class="input-box" type="number" value="1" /> -->
              1
            </td>
          </tr>
          <tr>
            <td>Total Price</td>
            <td colspan="2">{{ totalPrice }}</td>
          </tr>
        </tbody>
      </table>
      <!-- <button class="btn btn-card width-normal">Continue Order</button> -->
    </div>
  </div>
</template>

<style></style>
