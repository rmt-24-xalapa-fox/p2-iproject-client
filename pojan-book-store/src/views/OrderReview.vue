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
    ...mapActions(useStore, ["fetchCarts", "moveToRoute", "fetchCities"]),
    formatToRupiah(val) {
      return val.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      });
    },
  },
  computed: {
    ...mapState(useStore, ["carts", "cities"]),
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
    this.fetchCities().then(() => console.log(this.cities));
  },
};
</script>

<template>
  <div>
    <Navbar /> <HeroSection title="Your Order" />
    <div v-if="carts" class="order-review-container">
      <!-- <h1>Your Order</h1> -->
      <h2>Books Ordered</h2>
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
      <h2>Shipping Information</h2>
      <form action="">
        <input
          list="city"
          autocomplete="off"
          class="input-box"
          type="text"
          name=""
          id=""
          placeholder="Destination City"
        />
        <datalist id="city">
          <option
            v-for="city in cities"
            :key="city.city_id"
            :value="city.city_name"
          >
            {{ city.city_name }}
          </option>
        </datalist>

        <input
          class="input-box"
          type="text"
          name=""
          id=""
          placeholder="Your Address"
        />
      </form>
    </div>
  </div>
</template>

<style></style>
