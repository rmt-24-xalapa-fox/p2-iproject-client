<script>
import { mapActions, mapState } from "pinia";
import { useIndexStore } from "../stores";
export default {
  name: "license",
  methods: {
    ...mapActions(useIndexStore, [
      "fetchLicensesStore",
      "hitMidTransStore",
      "patchLicenseStore",
    ]),
    async buttonMidtrans(token) {
      try {
        await window.snap.pay(token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            console.log("payment success!");
            console.log(result);
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            console.log("wating your payment!");
            console.log(result);
          },
          onError: function (result) {
            /* You may add your own implementation here */
            console.log("payment failed!");
            console.log(result);
          },
          onClose: function () {
            /* You may add your own implementation here */
            console.log("you closed the popup without finishing the payment");
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    hitMidTransPage(LicenseId) {
      this.hitMidTransStore(LicenseId)
        .then(() => {
          this.buttonMidtrans(this.tokenMidtrans);
          this.patchLicenseStore(LicenseId);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Hit Midtrans`,
          });
        });
    },
  },
  computed: {
    ...mapState(useIndexStore, ["licenses", "tokenMidtrans"]),
  },
  created() {
    this.fetchLicensesStore();
  },
};
</script>

<template>
  <div class="container">
    <!-- table -->
    <table class="table table-responsive mt-5 mb-5">
      <thead class="thead-inverse">
        <tr class="text-center">
          <th>No</th>
          <th>Nama User</th>
          <th>Nama Gunung</th>
          <th>Date Simaksi</th>
          <th>Number Of Climbers</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="(el, i) in licenses" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ el.User.name }}</td>
          <td>{{ el.Mountain.name }}</td>
          <td>{{ el.Quotum.date.substring(0, 10) }}</td>
          <td>{{ el.numberOfClimbers }}</td>
          <td>Rp.{{ el.totalPrice }}</td>
          <td>{{ el.status }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              v-if="el.status === 'Waiting For Payment'"
              @click.prevent="hitMidTransPage(el.id)"
              id="pay-button"
            >
              Payment Online
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
