<template>
  <div class="row container mt-3">
    <div class="col-md-6 ms-2">
      Complete or Update Your address
      <form>
        <div class="form-row">
          <div class="col-lg-8 mt-4">
            <input
              v-model="userData.email"
              disabled
              type="email"
              id="emailrc"
              class="form-control"
              placeholder="Email Address"
            />
          </div>
          <div class="col-lg-8 mt-3">
            <input
              v-model="userData.username"
              type="text"
              id="customerrc"
              class="form-control"
              placeholder="Username"
              required
            />
          </div>
          <div class="col-lg-8 mt-3">
            <input
              v-model="userData.phoneNumber"
              type="number"
              id="phonenumberrc"
              class="form-control"
              placeholder="Phone Number"
              required
            />
          </div>
          <div class="col-lg-8 mt-3">
            <div class="row">
              <div class="col-lg-6">
                <select
                  v-model="userData.province"
                  @change="triggerCity($event)"
                  class="form-select form-select mb-3"
                  aria-label=".form-select-lg example"
                  required
                >
                  <option selected disabled value="0">Select Province</option>
                  <option
                    v-for="dat in province"
                    :value="dat.province_id"
                    :key="dat.province_id"
                  >
                    {{ dat.province }}
                  </option>
                </select>
              </div>
              <div class="col-lg-6">
                <select
                  v-if="userData.province > 0"
                  class="form-select form-select mb-3"
                  aria-label=".form-select-lg example"
                  v-model="userData.city"
                  required
                >
                  <option selected disabled>Select City</option>
                  <option
                    v-for="dat in city"
                    :key="dat.city_id"
                    :value="dat.city_id"
                  >
                    {{ dat.city_name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-8 mt-3">
            <textarea
              v-model="userData.address"
              type="text"
              id="addressrc"
              class="form-control"
              placeholder="Address"
              required
            ></textarea>
          </div>
          <div class="form-row">
            <div class="mt-3">
              <button
                type="submit"
                @click.prevent="submitUpdate"
                class="btn btn-dark"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="col-md-4">
      <div class="card text-bg-light mt-3" style="max-width: 30rem">
        <div class="card-header">Total Cart</div>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <p class="card-title">Total Product:</p>
            </div>
            <div class="col">{{ formatRupiah(favTotalPrice) }}</div>
          </div>
          <div class="row">
            <div class="col">
              <p class="card-title">Shipment Price:</p>
            </div>
            <div class="col">{{ formatRupiah(shipmentPrice) }}</div>
          </div>
          <div class="row">
            <div class="col">
              <p class="card-title" style="font-size: 19px">Total Price:</p>
            </div>
            <div class="col">
              {{ formatRupiah(this.favTotalPrice + this.shipmentPrice) }}
            </div>

            <button
              @click.prevent="purchase"
              type="button"
              class="btn btn-primary mt-2"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
//element loading buat nutupin.. di show dan hide mainnya
import { mapActions, mapWritableState, mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import { useProductStore } from "../stores/product";
export default {
  name: `ShipPayPage`,
  data() {
    return {
      dataProv: [],
      doneUp: false,
      totalPrice: 0,
    };
  },
  computed: {
    ...mapState(useUserStore, ["province", "city"]),
    ...mapState(useProductStore, ["favTotalPrice", "shipmentPrice"]),
    ...mapWritableState(useUserStore, ["userData"]),
  },
  methods: {
    ...mapActions(useUserStore, [
      "getUser",
      "getProvince",
      "getCity",
      "updateUser",
    ]),
    ...mapActions(useProductStore, [
      "getFavorites",
      "getShipPrice",
      "purchase",
    ]),
    formatRupiah(num) {
      let formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(num);
    },
    async fetchUser() {
      try {
        await this.getUser();
      } catch (err) {
        this.$swal.fire({
          icon: "error",
          title: `Error - ${err.response.data.statusCode}`,
          text: err.response.data.error.message,
          timer: 1000,
        });
      }
    },
    async dataProvinces() {
      try {
        await this.getProvince();
        this.triggerCity(this.userData.province);
        // console.log(this.province);
      } catch (err) {
        console.log(err);
      }
    },
    async dataCity(id) {
      try {
        await this.getCity(id);
      } catch (err) {}
    },
    triggerCity(event) {
      if (event > 0) {
        this.dataCity(event);
      } else {
        // console.log(event.target.value);
        this.dataCity(event.target.value);
      }
    },
    async submitUpdate() {
      try {
        if (
          !this.userData.username ||
          !this.userData.phoneNumber ||
          !this.userData.province ||
          !this.userData.city ||
          !this.userData.address
        ) {
          this.$swal.fire({
            icon: "error",
            title: `Error - 400`,
            text: `Fill all the field`,
            timer: 1000,
          });
        }
        await this.updateUser(this.userData);
        this.doneUp = true;
        this.getPrice();
        // console.log(this.userData.city);
        this.getShipPrice(this.userData.city);
        this.$swal.fire({
          icon: "success",
          title: `success - 200`,
          text: `Success updateData`,
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
      //   console.log(this.userData);
    },
    async getPrice() {
      try {
        await this.getFavorites();
      } catch (err) {
        this.$swal.fire({
          icon: "error",
          title: `Error - ${err.response.data.statusCode}`,
          text: err.response.data.error.message,
          timer: 1000,
        });
      }
    },
  },
  created() {
    this.fetchUser();
    this.dataProvinces();
    this.getPrice();
    console.log(this.favTotalPrice);
    // console.log(this.userData);
    if (this.userData.province > 0) {
      this.triggerCity(this.userData.province);
    }
    // console.log(this.userData);
  },
};
</script>
