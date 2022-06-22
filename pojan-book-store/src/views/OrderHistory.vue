<script>
import { mapState, mapActions } from "pinia";
import { useStore } from "@/stores/store";
import Navbar from "../components/Navbar.vue";
import HeroSection from "../components/HeroSection.vue";
import ProductsList from "../components/ProductsList.vue";
import Card from "../components/Card.vue";
export default {
  name: "OrderHistory",
  components: {
    Navbar,
    HeroSection,
    ProductsList,
    Card,
  },
  methods: {
    ...mapActions(useStore, ["readOrders"]),
    formatOrderId(val) {
      const theDate = val.createdAt.split("T")[0];
      const newDate = theDate.split("-").join("");
      const id = val.id;
      const code = `${newDate}-${id}`;
      return code;
    },
    formatDate(val, opt) {
      const date = new Date(val);
      let options;
      if (opt) {
        options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };
      } else {
        options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
      }
      return date.toLocaleString("en-GB", options);
    },
    formatToRupiah(val) {
      return val.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      });
    },
  },
  computed: {
    ...mapState(useStore, ["orders"]),
  },
  created() {
    this.readOrders();
  },
};
</script>

<template>
  <div>
    <Navbar />
    <HeroSection title="Your Order History" />
    <div
      v-for="order in this.orders.data"
      :key="order.id"
      class="order-history-container"
    >
      <h2>Order Information</h2>
      <table>
        <tbody>
          <tr>
            <td>Order Id</td>
            <td>{{ formatOrderId(order) }}</td>
          </tr>
          <tr>
            <td>Order Date</td>
            <td>{{ formatDate(order.createdAt, true) }}</td>
          </tr>
          <tr>
            <td>Estimated Arrival</td>
            <td>
              {{ formatDate(order.receivedDateMin) }} -
              {{ formatDate(order.receivedDateMax) }}
            </td>
          </tr>
          <tr>
            <td>Total Cost</td>
            <td>
              {{ formatToRupiah(order.price) }}
            </td>
          </tr>
          <tr>
            <td>Order Status</td>
            <td>
              {{ order.status }}
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Books Ordered</h2>
      <!-- <table>
        <thead>
          <th>Title</th>
          <th>Author</th>
          <th>Price</th>
        </thead>
        <tbody>
          <tr v-for="book in order.booksDetail" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ formatToRupiah(book.price) }}</td>
          </tr>
        </tbody>
      </table> -->
      <div class="order-card-container">
        <Card
          v-for="book in order.booksDetail"
          :key="book.id"
          :book="book"
          :inOrderPage="true"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
