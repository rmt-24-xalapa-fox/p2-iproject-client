<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores'
import router from '../router';
export default {
  name: "HeroCard",
  props: ["avatar", "data"],
  methods: {
    toDetailPage(id) {
      router.push(`/hero/${id}`)
    }
  }
}
</script>

<template>
  <div class="relative mx-auto w-full">
    <a @click.prevent="toDetailPage(data.hero_id)" href="#"
      class="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
      <div class="flex justify-center relative rounded-lg overflow-hidden h-28">
        <div class="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
        </div>
        <div class="absolute flex justify-center bottom-0">
          <img :src="avatar.imgUrl" alt="avatar">
        </div>
      </div>
    </a>
  </div>
</template>