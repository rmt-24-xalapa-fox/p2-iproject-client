<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "../stores";
export default {
  name: "detail",
  data() {
    return {};
  },
  components: {},
  methods: {
    ...mapActions(useMainStore, ["getDetails"]),
  },
  computed: {
    ...mapState(useMainStore, ["movies", "activeMovie"]),
    ...mapWritableState(useMainStore, [""]),
  },
  created() {
    this.getDetails(this.$route.params.id);
  },
};
</script>

<template>
  <section
    id="detail"
    class="text-white flex pt-10 flex-col text-verdana gap-5 opacity-95 flex flex-col self-center justify-self-center font-verdana rounded mx-4 my-8"
  >
    <div
      class="flex w-full content-center"
      v-if="this.activeMovie.id == this.$route.params.id"
    >
      <iframe
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        width="788.54"
        height="443"
        type="text/html"
        :src="this.activeMovie.trailer"
      ></iframe>
    </div>
    <div v-else>loading...</div>
  </section>
</template>
