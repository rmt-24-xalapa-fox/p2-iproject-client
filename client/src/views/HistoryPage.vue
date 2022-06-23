<template>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-2 mt-2 ms-3">
      <p style="font-weight: 600; font-size: 28px">My Card</p>
    </div>
    <div class="col-7 mt-2">
      <HistoryCardVue v-for="dat in history" :key="dat.id" :dataHistory="dat" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useProductStore } from "../stores/product";
import HistoryCardVue from "../components/HistoryCard.vue";
export default {
  name: `HistoryPage`,
  methods: {
    ...mapActions(useProductStore, ["getHistory"]),
    async fetchHistory() {
      try {
        await this.getHistory();
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
  computed: {
    ...mapState(useProductStore, ["history"]),
  },
  created() {
    this.fetchHistory();
  },

  components: {
    HistoryCardVue,
  },
};
</script>

<style>
.wrapper {
  border-radius: 1px 1px;
}
</style>
