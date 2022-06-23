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
  <table class="col-12">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Nama User</th>
          <th scope="col">Nama Gunung</th>
          <th scope="col">Date Simaksi</th>
          <th scope="col">Number Of Climbers</th>
          <th scope="col">Total Price</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(el, i) in licenses" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ el.User.name }}</td>
          <td>{{ el.Mountain.name }}</td>
          <td>{{ el.Quotum.date }}</td>
          <td>{{ el.numberOfClimbers }}</td>
          <td>Rp.{{ el.totalPrice }}</td>
          <td>{{ el.status }}</td>
          <td>
            <button
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
  </table>
</template>

<style scoped></style>
