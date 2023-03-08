<script>
import { mapActions, mapState } from "pinia";
import { useIndexStore } from "../stores";
export default {
  name: "gunungById",
  methods: {
    ...mapActions(useIndexStore, ["fetchMountainsById"]),
    toPostLicensePage(MountainId, QuotaId) {
      this.$router.push(`/licenses/${MountainId}/${QuotaId}`);
    },
  },
  computed: {
    ...mapState(useIndexStore, ["mountainsById"]),
  },
  created() {
    this.fetchMountainsById(this.$route.params.MountainId);
  },
};
</script>

<template>
  <main>
    <div class="container">
      <!--Section: Blog v.4-->
      <section class="section mt-5 pb-3 wow fadeIn">
        <!--Grid row-->
        <div class="row">
          <div class="col-md-12">
            <!-- Card -->
            <div class="card card-cascade wider reverse">
              <!-- Card image -->
              <div class="view view-cascade overlay">
                <img
                  class="card-img-top"
                  :src="mountainsById.imageUrl"
                  alt="Mountain By Id"
                />
                <a href="#!">
                  <div class="mask rgba-white-slight"></div>
                </a>
              </div>
            </div>

            <!--Excerpt-->
            <div class="excerpt mt-5 wow fadeIn" data-wow-delay="0.3s">
              <h1 class="mb-3 text-center">
                {{ mountainsById.name }}
              </h1>
              <h5 class="mb-3 text-center">
                Height: {{ mountainsById.height }}
              </h5>
              <div class="text-center">
                <button class="btn btn-info disabled" style="font-size: 14px">
                  License Cost: Rp. {{ mountainsById.licenseCost }}
                </button>
              </div>
              <p class="mt-5">{{ mountainsById.description }}</p>
            </div>
          </div>
        </div>
        <!--Grid row-->
      </section>

      <!-- table -->

      <table class="table table-responsive mt-5 mb-5">
        <thead class="thead-inverse">
          <tr class="text-center">
            <th>No</th>
            <th>Date</th>
            <th>Quota</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center"
            v-for="(el, i) in mountainsById.Quota"
            :key="el.id"
          >
            <td>{{ i + 1 }}</td>
            <td>{{ el.date.substring(0, 10) }}</td>
            <td>{{ el.quotaUse }}/{{ el.quotaMax }}</td>
            <td>
              <button
                class="btn btn-primary"
                type="button"
                v-if="el.quotaMax - el.quotaUse > 0"
                @click.prevent="toPostLicensePage(mountainsById.id, el.id)"
              >
                Get License
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped>
table {
  width: 100%;
}

td {
  width: 25%;
}
</style>
