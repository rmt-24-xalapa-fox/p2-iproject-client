<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "NewOrder",
  data() {
    return {
      service: "",
      kg: "",
    };
  },
  methods: {
    async newOrder() {
      try {
        const LaundryId = +this.$router.currentRoute.value.params.id;
        const newOrders = await axios({
          method: "POST",
          url: `https://laundryqilo.herokuapp.com/neworder/${LaundryId}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            service: this.service,
            kg: this.kg,
          },
        });

        this.$router.push("/myorder")
      } catch (err) {
        if (err.response.data.message === "Service is required") {
          swal("Please select Laundry Type");
        } else if (err.response.data.message === "Kg is required") {
          swal("Please input estimated weight");
        }
      }
    },
  },
};
</script>
<template>
  <div class="container">
    <div>
      <h1 class="text-center mt-4 mb-4">New<small style="color: #4d9c81">Order</small></h1>
    </div>

    <form>
      <select class="form-select form-select-lg mb-4 w-50 mx-auto" aria-label=".form-select-lg example" v-model="service">
        <option value="" selected disabled class="text-muted">Laundry Type</option>
        <option value="Regular">Regular (2-3 days) 6k / kg</option>
        <option value="Express">Express (1 day) 10k / kg</option>
      </select>
      <input class="form-control form-control-lg mb-4 w-50 mx-auto" type="number" placeholder="Estimated Weight (Kg)" aria-label="default input example" v-model="kg" />
      <h3 v-if="typeof this.kg == 'number' && this.service == 'Regular'" class="text-center">Estimated price: {{ 6000 * kg }}</h3>
      <h3 v-if="typeof this.kg == 'number' && this.service == 'Express'" class="text-center">Estimated price: {{ 10000 * kg }}</h3>
      <h3 v-if="typeof this.kg != 'number'" class="text-center">Estimated price: -</h3>
      <div class="d-flex justify-content-center mt-3">
        <button type="button" class="btn btn-dark" @click.prevent="newOrder">Order</button>
      </div>
    </form>
  </div>
</template>
<style></style>
