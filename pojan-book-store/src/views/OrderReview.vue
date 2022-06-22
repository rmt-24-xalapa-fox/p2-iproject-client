<script>
import { mapState, mapActions, mapWritableState } from "pinia";
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
      isAlreadyChooseCity: false,
      orderObj: {
        books: [],
        price: 0,
        receivedDateMin: new Date(),
        receivedDateMax: new Date(),
      },
    };
  },
  methods: {
    ...mapActions(useStore, [
      "fetchCarts",
      "moveToRoute",
      "fetchCities",
      "submitRajaOngkir",
      "callMidtrans",
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
        this.isAlreadyChooseCity = true;
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
    ...mapWritableState(useStore, ["indexShippingOption"]),
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
        this.orderObj.price = totalCost;
        return totalCost;
      }
    },
    DateMin() {
      if (this.shippingOption[this.indexShippingOption]) {
        let num = this.shippingOption[
          this.indexShippingOption
        ].cost[0].etd.split(" ")[1]
          ? this.shippingOption[this.indexShippingOption].cost[0].etd.split(
              " "
            )[0]
          : this.shippingOption[this.indexShippingOption].cost[0].etd.split(
              "-"
            )[0];
        Date.prototype.addDays = function (days) {
          this.setDate(this.getDate() + parseInt(days));
          return this;
        };
        let now = new Date();
        this.orderObj.receivedDateMin = now.addDays(num);
        return this.receivedDateMin;
      }
    },
    DateMax() {
      if (this.shippingOption[this.indexShippingOption]) {
        let num2 = this.shippingOption[
          this.indexShippingOption
        ].cost[0].etd.split(" ")[1]
          ? this.shippingOption[this.indexShippingOption].cost[0].etd.split(
              " "
            )[0]
          : this.shippingOption[this.indexShippingOption].cost[0].etd.split(
              "-"
            )[1];

        if (!num2) {
          num2 = this.shippingOption[this.indexShippingOption].cost[0].etd;
        }
        Date.prototype.addDays = function (days) {
          this.setDate(this.getDate() + parseInt(days));
          return this;
        };
        let now = new Date();
        this.orderObj.receivedDateMax = now.addDays(num2);
        return this.receivedDateMax;
      }
    },
  },
  created() {
    this.fetchCarts().then(() => {
      this.shippingObj.weight = this.carts.length * 200;
      this.carts.forEach((el) => {
        this.orderObj.books.push(el.BookId);
      });
    });
    this.fetchCities();
    this.isAlreadyChooseCity = false;
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
          class="input-box"
          type="text"
          name=""
          id=""
          placeholder="Your Address"
        />
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

        <select
          v-if="isAlreadyChooseCity"
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
          v-if="
            shippingOption.length !== 0 &&
            isAlreadyChooseCourier &&
            isAlreadyChooseCity
          "
          placeholder="Choose shipping option"
        >
          <option disabled selected value="">Choose shipping option</option>
          <option v-for="(ship, idx) in shippingOption" :key="idx" :value="idx">
            {{ ship.description }}
          </option>
        </select>
        <input
          v-if="
            shippingOption.length !== 0 &&
            shippingOption[indexShippingOption] &&
            isAlreadyChooseCourier &&
            isAlreadyChooseCity
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
            shippingOption.length !== 0 &&
            shippingOption[indexShippingOption] &&
            isAlreadyChooseCourier &&
            isAlreadyChooseCity
          "
          class="input-box"
          type="text"
          disabled
          :value="`Estimated Time of Delivery: ${
            shippingOption[indexShippingOption].cost[0].etd.split(' ')[1]
              ? shippingOption[indexShippingOption].cost[0].etd.split(' ')[0]
              : shippingOption[indexShippingOption].cost[0].etd
          } days`"
        />
        <h4 v-if="shippingOption.length === 0 && isAlreadyChooseCourier">
          This shipping option is not available
        </h4>
        <button
          @click.prevent="this.callMidtrans(totalPriceAndCost, orderObj)"
          v-if="
            shippingOption.length !== 0 &&
            shippingOption[indexShippingOption] &&
            isAlreadyChooseCourier &&
            isAlreadyChooseCity
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
