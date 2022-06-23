<script>
import { mapActions, mapWritableState } from "pinia";
import { useDataStore } from "../stores/data";
import axios from "axios";
import swal from "sweetalert";

export default {
  name: "MyOrder",
  methods: {
    ...mapActions(useDataStore, ["getMyOrder"]),

    async updateStatus(OrderId, status) {
      try {
        const id = OrderId;
        const update = status;
        const newStats = await axios({
          method: "PATCH",
          url: `https://laundryqilo.herokuapp.com/myorders/${+id}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            newStatus: update,
          },
        });

        this.getMyOrder();
      } catch (err) {
        swal(err.response.data.message);
      }
    },
  },
  computed: {
    ...mapWritableState(useDataStore, ["myOrder"]),
  },
  created() {
    this.getMyOrder();
  },
};
</script>
<template>
  <div class="container">
    <div>
      <h1 class="text-center mt-4 mb-4">My<small style="color: #4d9c81">Order</small></h1>
    </div>
    <!-- <h1>{{myOrder}}</h1> -->

    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Laundry's Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Laundry Type</th>
            <th scope="col">Estimated Weight (Kg)</th>
            <th scope="col">Cost (IDR)</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="laundry in myOrder" :key="laundry.id">
            <td>{{ laundry.Laundry.name }}</td>
            <td>{{ laundry.Laundry.email }}</td>
            <td>{{ laundry.Laundry.phone }}</td>
            <td>{{ laundry.service }}</td>
            <td>{{ laundry.kg }}</td>
            <td>{{ laundry.cost }}</td>
            <td>{{ laundry.status }}</td>
            <td>
              <button v-if="laundry.status == 'waiting for payment'" class="btn btn-success text-light btn-sm text-center" style="background-color: #4d9c81" type="button" @click.prevent="updateStatus(laundry.id, 'in progress')">Pay</button>
              <button v-else-if="laundry.status == 'in progress'" class="btn btn-success text-light btn-sm text-center" style="background-color: #4d9c81" type="button" @click.prevent="updateStatus(laundry.id, 'complete')">Complete</button>
              <button v-else-if="laundry.status == 'complete'" class="btn btn-success text-light btn-sm text-center disabled" style="background-color: #4d9c81" type="button" @click.prevent="">Complete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style></style>
