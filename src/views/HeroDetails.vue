<script >
import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores'
export default {
  name: "HeroDetails",
  methods: {
    ...mapActions(useMainStore, ["fetchHeroById", "detailImage"])
  },
  computed: {
    ...mapState(useMainStore, ["heroById", "heroDetailImage"])
  },
  created() {
    this.fetchHeroById(this.$route.params.id)
    this.detailImage(this.$route.params.id)
  }
}
</script>

<template>
  <section class="text-white body-font overflow-hidden">
    <div class=" container px-5 py-10 mx-auto">
      <div class="lg:w-3/4 mx-auto flex flex-wrap justify-center">
        <div class="lg:w-1/3">
          <img :src="heroDetailImage.imageUrl" alt="">
        </div>
        <div class="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0 pr-7 justify-evenly rounded-r-lg">
          <h2 class="text-2xl font-semibold title-font text-white tracking-widest">{{ heroById.hero_name }}</h2>
          <div class="flex mb-4 mt-2">
            <img v-if="heroById.hero_role === 'Tank'" class="w-7 h-7 mr-2"
              src="https://static.wikia.nocookie.net/mobile-legends/images/f/f0/Tank_Icon.png" alt="">
            <img v-else-if="heroById.hero_role == 'Assassin'" class="w-7 h-7 mr-2"
              src="https://static.wikia.nocookie.net/mobile-legends/images/3/3f/Assassin_Icon.png" alt="">
            <img v-else-if="heroById.hero_role === 'Marksman'" class="w-7 h-7 mr-2"
              src="https://static.wikia.nocookie.net/mobile-legends/images/1/10/Marksman_Icon.png" alt="">
            <img v-else-if="heroById.hero_role === 'Fighter'" class="w-7 h-7 mr-2"
              src="https://static.wikia.nocookie.net/mobile-legends/images/1/1a/Fighter_Icon.png" alt="">
            <img v-else-if="heroById.hero_role === 'Support'" class="w-7 h-7 mr-2"
              src="https://static.wikia.nocookie.net/mobile-legends/images/f/ff/Support_Icon.png" alt="">
            <img v-else-if="heroById.hero_role === 'Mage'" class="w-7 h-7 mr-2"
              src="https://static.wikia.nocookie.net/mobile-legends/images/5/53/Mage_Icon.png" alt="">
            <span>
              <p class="text-red-600 text-lg font-semibold">{{
                  heroById.hero_role
              }}</p>
            </span>

          </div>
          <p class="leading-relaxed text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente sit
            laborum animi
            corporis eaque adipisci fugiat sint ullam nesciunt, aliquid molestiae inventore aliquam explicabo id l
            voluptatum quis.</p>
          <div class="flex mt-6 items-center border-b-2 border-gray-200 mb-5">
            <div class="">
              <p class="leading-relaxed text-justify mb-2">
                Ability : {{ heroById.hero_overview.hero_ability }}
              </p>
              <p class="leading-relaxed text-justify mb-2">
                Difficulty : {{ heroById.hero_overview.hero_difficulty }}
              </p>
              <p class="leading-relaxed text-justify mb-2">
                durability : {{ heroById.hero_overview.hero_durability }}
              </p>
              <p class="leading-relaxed text-justify mb-2">
                offense : {{ heroById.hero_overview.hero_offence }}
              </p>
            </div>
          </div>
          <iframe class="text-center" :src="heroDetailImage.model"> </iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
</style>