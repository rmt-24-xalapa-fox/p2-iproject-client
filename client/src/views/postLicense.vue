<script>
import { mapState, mapActions } from "pinia";
import { useIndexStore } from "../stores";
export default {
  name: "postLicense",
  data() {
    return {
      numberOfClimbers: 0,
    };
  },
  methods: {
    ...mapActions(useIndexStore, ["fetchMountainsById", "postLicenseStore"]),
    postLicensePage() {
      this.postLicenseStore(
        this.$route.params.MountainId,
        this.$route.params.QuotaId,
        this.numberOfClimbers,
        this.makeTotalPrice
      )
        .then(() => {
          Swal.fire("Success!", "License Waiting For Payment", "success");
        })
        .catch((err) => {
          let errMsg = err.response.data.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${errMsg}`,
          });
        });
    },
  },
  computed: {
    ...mapState(useIndexStore, ["mountainsById"]),
    makeTotalPrice() {
      return this.numberOfClimbers * this.mountainsById.licenseCost;
    },
  },
  created() {
    this.fetchMountainsById(this.$route.params.MountainId);
  },
};
</script>

<template>
  <div class="row middle">
    <div class="col-6">
      <h1>Form Add License</h1>
      <form @submit.prevent="postLicensePage">
        <div class="form-group">
          <label for="">Number Of Climbers</label>
          <input
            v-model="numberOfClimbers"
            type="number"
            class="form-control"
            placeholder="0"
          />
        </div>
        <div class="form-group">
          <h1>Total Price: Rp.{{ makeTotalPrice }}</h1>
        </div>
        <button type="submit" class="btn btn-primary">Buy License</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.middle {
  flex-direction: column;
  justify-content: center;
}
</style>
