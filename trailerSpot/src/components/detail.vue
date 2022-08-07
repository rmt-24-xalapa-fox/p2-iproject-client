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
};
</script>

<template>
  <section
    id="detail"
    class="text-white flex pt-10 flex-col text-verdana gap-5 opacity-95 flex flex-col self-center justify-self-center font-verdana rounded mx-4 my-8"
  >
    <div>Movie ID: {{ this.$route.params.id }}</div>
  </section>
</template>
