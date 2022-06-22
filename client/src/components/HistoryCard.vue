<template>
  <div
    class="card mb-3 rounded-start"
    @click.prevent="moveDetail(dataHistory.Player.id)"
    style="max-width: 50vw; cursor: pointer"
  >
    <div class="row g-0">
      <div class="col-md-4">
        <img
          :src="dataHistory.Player.imgUrl1"
          class="img-fluid rounded-start"
          alt="..."
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ dataHistory.Player.name }}</h5>
          <p class="card-text">
            {{ formatRupiah(dataHistory.Player.price) }}
          </p>
          <p class="card-text">
            {{ dataHistory.Player.description }}
          </p>
          <p class="card-text">
            <small class="text-muted">{{
              dataHistory.updatedAt.split("T")[0]
            }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `historyCard`,
  props: ["dataHistory"],
  methods: {
    formatRupiah(num) {
      let formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(num);
    },
    moveDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
};
</script>
