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
  data() {
    return {
      shippingObj: {
        origin: 22, //Bandung
        destination: 0,
        weight: 0,
        courier: 0,
      },
      indexShippingOption: 0,
    };
  },
  methods: {
    ...mapActions(useStore, [
      "fetchCarts",
      "moveToRoute",
      "fetchCities",
      "submitRajaOngkir",
    ]),
    formatToRupiah(val) {
      return val.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      });
    },
    getCityId() {
      return new Promise(async (resolve, reject) => {
        try {
          const cityName = document.getElementById("city").value;

          const cityId = document.querySelector(
            "#cities option[value='" + cityName + "']"
          ).dataset.value;
          this.shippingObj.destination = Number(cityId);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    },
    changeLocation() {
      this.getCityId().then(() => {
        if (this.shippingObj.courier !== 0) {
          this.submitRajaOngkir(this.shippingObj);
        }
      });
    },
  },
  computed: {
    ...mapState(useStore, [
      "carts",
      "cities",
      "shippingOption",
      "isAlreadyChooseCourier",
    ]),
    totalPrice() {
      let sum = 0;
      this.carts.forEach((el) => {
        sum += el.Book.price;
      });
      return this.formatToRupiah(sum);
    },
    totalPriceAndCost() {
      if (this.shippingOption[this.indexShippingOption]) {
        let bookPrice = 0;
        this.carts.forEach((el) => {
          bookPrice += el.Book.price;
        });
        const totalCost =
          this.shippingOption[this.indexShippingOption].cost[0].value +
          bookPrice;
        return totalCost;
      }
    },
  },
  created() {
    this.fetchCarts().then(
      () => (this.shippingObj.weight = this.carts.length * 200)
    );
    this.fetchCities();
  },
};
</script>

<template>
  <div>
    <Navbar /> <HeroSection title="Your Order" />
    <div v-if="carts" class="order-review-container">
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
            <td>Total Books Price</td>
            <td colspan="2">{{ totalPrice }}</td>
          </tr>
        </tbody>
      </table>
      <h2>Shipping Information</h2>
      <form action="">
        <input
          @change.prevent="changeLocation()"
          list="cities"
          autocomplete="off"
          class="input-box"
          type="text"
          name=""
          id="city"
          placeholder="Destination City"
        />
        <datalist id="cities">
          <option
            v-for="city in cities"
            :key="city.city_id"
            :data-value="city.city_id"
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
        <select
          @change.prevent="submitRajaOngkir(shippingObj)"
          v-model="shippingObj.courier"
          class="input-box"
        >
          <option disabled selected value="0">Select Courier</option>
          <option value="jne">JNE</option>
          <option value="tiki">TIKI</option>
          <option value="pos">POS Indonesia</option>
        </select>

        <select
          v-model="indexShippingOption"
          class="input-box"
          v-if="shippingOption.length !== 0"
          placeholder="Choose shipping option"
        >
          <option disabled selected value="">Choose shipping option</option>
          <option v-for="(ship, idx) in shippingOption" :key="idx" :value="idx">
            {{ ship.description }}
          </option>
        </select>
        <input
          v-if="
            shippingOption.length !== 0 && shippingOption[indexShippingOption]
          "
          class="input-box"
          type="text"
          disabled
          :value="`Shipping Cost: ${formatToRupiah(
            shippingOption[indexShippingOption].cost[0].value
          )}`"
        />

        <input
          v-if="
            shippingOption.length !== 0 && shippingOption[indexShippingOption]
          "
          class="input-box"
          type="text"
          disabled
          :value="`Estimated Time of Delivery: ${formatToRupiah(
            shippingOption[indexShippingOption].cost[0].etd.split(' ')[1]
              ? shippingOption[indexShippingOption].cost[0].etd.split(' ')[0]
              : shippingOption[indexShippingOption].cost[0].etd
          )} days`"
        />
        <h4 v-if="shippingOption.length === 0 && isAlreadyChooseCourier">
          This shipping option is not available
        </h4>
        <button
          v-if="
            shippingOption.length !== 0 && shippingOption[indexShippingOption]
          "
          type="submit"
          class="btn"
        >
          Continue to Payment <br style="margin-bottom: 10px" />
          ({{ formatToRupiah(totalPriceAndCost) }})
        </button>
      </form>
    </div>
  </div>
</template>

<style></style>
