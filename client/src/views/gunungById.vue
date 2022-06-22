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
  <div class="row">
    <div class="page">
      <div class="col-12 picture">
        <img class="entity-id" :src="mountainsById.imageUrl" alt="img" />
      </div>

      <div class="col-6">
        <!-- <h6 style="padding: 10px">
            <span>Created By: </span>{{ displayNewsById.User.email }}
          </h6> -->
        <h1 style="padding: 10px">{{ mountainsById.name }}</h1>
        <p style="padding: 10px">Height: {{ mountainsById.height }}</p>
        <p style="padding: 10px">
          License Cost: Rp. {{ mountainsById.licenseCost }}
        </p>
        <p style="padding: 10px">{{ mountainsById.description }}</p>
      </div>
      <div class="col-6">
        <h1 style="padding: 10px">Quota {{ mountainsById.name }}</h1>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Date</th>
              <th scope="col">Quota Tersisa</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(el, i) in mountainsById.Quota" :key="el.id">
              <td>{{ i + 1 }}</td>
              <td>{{ el.date }}</td>
              <td>{{ el.quotaUse }}/{{ el.quotaMax }}</td>
              <td>
                <button
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
    </div>
  </div>
</template>

<style scoped>
/* Gunung By Id */
.page {
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
}
.picture {
  height: 500px;
}
.entity-id {
  height: 100%;
  width: 100%;
}
h1 {
  text-align: center;
}
/* global */
.middle {
  flex-direction: column;
  justify-content: center;
}
/* end Gunung By Id */
</style>
