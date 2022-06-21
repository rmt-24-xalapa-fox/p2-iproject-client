<script >
import { RouterLink } from 'vue-router'
export default {};

</script>

<template>
  <div class="flex">
    
    <RouterLink to="/">
      <img src="../assets/mF.png" alt="" />
    </RouterLink>

    <ul class="flex mt-5">
      <li>
        <RouterLink to="/" class="ml-5">
          Movies
        </RouterLink>
      </li>
      
      <li>
        <RouterLink to="/actors" class="ml-5">
          Actors
        </RouterLink>
      </li>
    </ul>
  </div>

</template>

<style>

</style>
