<script>
import { mapActions, mapState } from "pinia";
import { useIndexStore } from "../stores";

export default {
  name: "listGunung",
  methods: {
    ...mapActions(useIndexStore, ["fetchMountains"]),
    toMountainsIdPage(MountainId) {
      this.$router.push(`/mountains/${MountainId}`);
    },
  },
  computed: {
    ...mapState(useIndexStore, ["mountains"]),
  },
  created() {
    this.fetchMountains()
      .then(() => {})
      .catch(() => {
        let errMsg = err.response.data.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errMsg}`,
        });
      });
  },
};
</script>

<template>
  <div class="container">
    <!--Section: Blog v.2-->
    <section
      class="section extra-margins pb-3 wow fadeIn"
      data-wow-delay="0.3s"
    >
      <!--Section heading-->
      <h3 class="text-center my-5 text-center h3 pt-3">List Gunung</h3>

      <!--Grid row-->
      <div class="row">
        <!--Grid column (card)-->
        <div
          v-for="el in mountains"
          :key="el.id"
          class="col-lg-4 col-md-12 mb-5"
        >
          <!--Card Light-->
          <div class="card">
            <!--Card image-->
            <div class="view overlay">
              <img
                :src="el.imageUrl"
                class="card-img-top"
                alt=""
                style="height: 200px"
              />
            </div>
            <!--/.Card image-->
            <!--Card content-->
            <div class="card-body">
              <!--Title-->
              <h4 class="card-title">{{ el.name }}</h4>
              <!--Text-->
              <p class="card-text">
                {{ el.height }}
              </p>
              <hr />
              <p class="card-text">
                {{ el.description.substring(0, 100) }} ...
              </p>
              <button
                @click.prevent="toMountainsIdPage(el.id)"
                type="button"
                class="btn btn-primary"
              >
                Read More
              </button>
            </div>
            <!--/.Card content-->
          </div>
          <!--/.Card Light-->
        </div>
        <!--Grid column-->
      </div>
      <!--Grid row-->
    </section>
    <!--Section: Blog v.2-->
  </div>
</template>

<style scoped></style>
