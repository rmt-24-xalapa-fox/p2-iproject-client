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
      "deleteLicensesStore",
    ]),
    buttonMidtrans(token) {
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          Swal.fire("Success!", "Payment Success", "success");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          Swal.fire("Success!", "Payment Success", "success");
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
    },

    hitMidTransPage(LicenseId) {
      this.hitMidTransStore(LicenseId)
        .then(() => {
          this.buttonMidtrans(this.tokenMidtrans);
          return this.patchLicenseStore(LicenseId);
        })
        .then(() => {
          this.fetchLicensesStore();
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

    deleteLicensesPage(QuotaId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteLicensesStore(QuotaId)
            .then(() => {
              Swal.fire("Success!", "Delete license Success", "success");
              this.fetchLicensesStore();
            })
            .catch((err) => {
              let errMsg = err.response.data.message;
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${errMsg}`,
              });
            });
        }
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
          <td>
            <button
              v-if="el.status === 'Completed Payment'"
              type="button"
              class="btn btn-success disabled"
            >
              {{ el.status }}
            </button>
            <button v-else type="button" class="btn btn-warning disabled">
              {{ el.status }}
            </button>
          </td>
          <td>
            <div>
              <button
                type="button"
                class="btn btn-primary"
                v-if="el.status === 'Waiting For Payment'"
                @click.prevent="hitMidTransPage(el.id)"
                id="pay-button"
              >
                Pay Now!
              </button>
            </div>
            <div v-if="el.status === 'Waiting For Payment'" class="mt-2">
              <button
                @click.prevent="deleteLicensesPage(el.id)"
                type="button"
                class="btn btn-danger pl-2"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
