<script>
import { mapActions, mapWritableState } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  name: "TransactionUser",
  data() {
    return {
      url: localStorage.getItem("redirect_url"),
    };
  },
  computed: {
    ...mapWritableState(useCounterStore, ["orders"]),
  },
  methods: {
    ...mapActions(useCounterStore, [
      "getDataOrder",
      "getTokenPayment",
      "editPayment",
    ]),

    async getPaymentToken(orderId, movieId) {
      await this.getTokenPayment({
        id: orderId,
        MovieId: movieId,
      });
      this.$router.push({
        name: "Payment",
        params: {
          id: orderId,
        },
      });
    },

    async editPayment(orderId) {
      await this.editPayment({
        id: orderId,
      });
    },
  },
  async created() {
    await this.getDataOrder();
    console.log(this.orders, "ini order tes");
  },
};
</script>

<template>
  <div class="shadow-lg">
    <table class="min-w-full rounded-2xl">
      <thead class="bg-silver-600 rounded-2xl">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
          >
            No.
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
          >
            Order Id
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
          >
            Movie Id
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
          >
            Created At
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(order, index) in orders" :key="order.id">
          <td class="px-6 py-4 whitespace-nowrap">
            {{ index + 1 }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-base text-gray-700">
            {{ order.id }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-base text-gray-700">
            {{ order.MovieId }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-base text-gray-700">
            {{ order.createdAt }}
          </td>

          <td class="px-6 py-4 whitespace-nowrap text-base text-gray-700">
            {{ order.status }}
          </td>

          <td
            class="flex flex-row items-center justify-around px-6 py-4 whitespace-nowrap text-base text-gray-700"
          >
            <button
              @click.prevent="
                getPaymentToken(order.id, order.MovieId), editPayment(order.id)
              "
              type="button"
              class="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide bg-cyan-600 hover:bg-orange-600 hover:text-black transition duration-200"
            >
              Pay
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
