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
          this.$router.push("/licenses");
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
  <div id="intro" class="bg-image shadow-2-strong" style="margin-top: 0px">
    <div class="mask d-flex align-items-center h-100">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-5 col-md-8">
            <form
              class="bg-white rounded-5 shadow-5-strong p-5"
              @submit.prevent="postLicensePage"
            >
              <h1 class="h1-responsive font-weight-bold text-center my-4">
                Form Add License
              </h1>
              <!-- Number of climbers input -->
              <p class="text-center">Number Of Climbers</p>
              <div class="mb-4 mx-4 text-center">
                <input
                  v-model="numberOfClimbers"
                  type="number"
                  id="name"
                  name="name"
                  class="mt-3"
                  style="
                    height: 50px;
                    font-size: 30px;
                    width: 100px;
                    margin-top: 50px;
                    padding-left: 10px;
                  "
                  placeholder="0"
                />
              </div>
              <div class="mt-5 mb-4 text-center">
                <h5>Total Price: Rp.{{ makeTotalPrice }}</h5>
              </div>
              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block">
                Add License
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#intro {
  height: 89.3vh;
}

/* Height for devices larger than 576px */
@media (min-width: 992px) {
  #intro {
    margin-top: -58.59px;
  }
}
</style>
