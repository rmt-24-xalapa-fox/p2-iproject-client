<script>
import { mapState, mapActions } from "pinia";
import { useHeroStore } from "../stores/heroes";
export default {
  name: "Detail",
  computed: {
    ...mapState(useHeroStore, ["detail"]),
  },
  methods: {
    ...mapActions(useHeroStore, ["detailHero"]),
  },
  created() {
    this.detailHero(this.$route.params.id);
  },
};
</script>

<template>
  <div class="py-md-5" style="background-color: rgb(192, 131, 130)">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <img :src="detail.cover_picture" alt="" class="border border-2 border-dark" />
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-2">
          <h1>{{ detail.name }}</h1>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-2">
          <h1>({{ detail.type }})</h1>
        </div>
      </div>

      <div class="row justify-content-start mt-3">
        <div class="col-5">
          <button type="button" class="btn btn-dark mb-2">
            <h3>SKILL</h3>
          </button>
          <div v-for="(listSkill, i) in detail.skill.skill" :key="i" :listSkill="listSkill">
            <img :src="listSkill.icon" alt="" class="rounded-circle border border-2 border-dark" />
            <h5>{{ listSkill.name }}</h5>
            <p style="background-color: black" class="text-light">
              {{ listSkill.des }}
            </p>
          </div>
        </div>
        <div class="col-7">
          <button type="button" class="btn btn-dark mb-2">
            <h3>Tips</h3>
          </button>
          <p style="background-color: black" class="text-light">
            {{ detail.skill.item.tips }}
          </p>
          <div class="mt-2">
            <img :src="item.equip.icon" alt="" class="rounded-circle border border-2 border-dark" v-for="(item, i) in detail.gear.out_pack" :key="i" :item="item" />
          </div>
          <p style="background-color: black" class="text-light mt-4">
            {{ detail.gear.out_pack_tips }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
