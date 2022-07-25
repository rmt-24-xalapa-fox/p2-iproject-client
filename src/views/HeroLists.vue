<script >
import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores'
import HeroCard from '../components/HeroCard.vue'

export default {
  data() {
    return {
      roles: ["Marksman", "Mage", "Fighter", "Assassin", "Tank", "Support"]
    }
  },
  name: "HeroLists",
  components: {
    HeroCard
  },
  methods: {
    ...mapActions(useMainStore, ["fetchAvatars", "fetchHeroes"])
  },
  computed: {
    ...mapState(useMainStore, ["avatars", "heroes"]),
    function() {
      this.heroes.forEach(data => {
        console.log(data, "<<<<");
      })
    }
  },
  created() {
    this.fetchAvatars()
    this.fetchHeroes()
  }
}
</script>

<template>
  <div>
    <div class="mx-auto max-w-7xl flex justify-center flex-col">
      <div class="pt-16">
        <p class=" text-white font-semibold text-5xl text-center">
          Select Your Hero <br>
        </p><br>
      </div>
      <div class="w-full flex justify-center mb-10">
        <div class="w-1/2 text-white text-center">
          With more than 80 champions, you’ll find the perfect match for your playstyle. Master one, or master them all!
        </div>
      </div>
    </div>

    <!-- box heroes  -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-10 gap-4 w-full px-10 py-5">
      <!-- card  -->
      <HeroCard v-for="(avatar, index) in avatars" :avatar="avatar" :data="heroes[index]" :heroes="heroes"
        :key="avatar.id" />
      <!-- box heroes  -->
    </div>
    <!-- heroes -->
  </div>
</template>

<style>
</style>