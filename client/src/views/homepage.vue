<script>
import { mapActions } from "pinia";
import { mapState } from "pinia";
import { useStore } from "@/stores/store";
import navbar from "../components/navbar.vue";

export default {
  name: "homepage",
  data() {
    return {
      offerName: "",
      offerSeries: "",
      requestName: "",
      requestSeries: "",
      uploadImg: "",
    };
  },
  components: {
    navbar,
  },
  computed: {
    ...mapState(useStore, ["cards"]),
  },
  methods: {
    ...mapActions(useStore, ["fetchCardForPost"]),
    createPostHandler() {
      this.fetchCardForPost(
        this.offerName,
        this.offerSeries,
        this.requestName,
        this.requestSeries,
        this.uploadImg
      );
    },
  },
};
</script>

<template>
  <navbar />

  <button class="rounded-full bg-teal-400 p-1" @click.prevent="cardDisplay">
    Fetch Cards
  </button>

  <form @submit.prevent="createPostHandler">
    <div>
      <label for="offerName">Offered Card Name</label>
      <input
        v-model="offeredName"
        type="text"
        name="offerName"
        id="offerName"
      />
    </div>
    <div>
      <label for="offerSeries">Offered Card Series</label>
      <input
        v-model="offeredSeries"
        type="text"
        name="offerSeries"
        id="offerSeries"
      />
    </div>
    <div>
      <label for="requestName">Requested Card Name</label>
      <input
        v-model="requestName"
        type="text"
        name="requestName"
        id="requestName"
      />
    </div>
    <div>
      <label for="requestSeries">Requested Card Series</label>
      <input
        v-model="requestSeries"
        type="text"
        name="requestSeries"
        id="requestSeries"
      />
    </div>
    <div>
      <label for="upload">Upload the image of offered card</label>
      <input v-model="uploadImg" type="text" name="upload" id="upload" />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
  <!-- <ul v-for="card in cards">
    <li>{{ card.name }}</li>
    <li><img :src="card.images.small" alt="" /></li>
    <li>{{ card.types[0] }}</li>
  </ul> -->
</template>
