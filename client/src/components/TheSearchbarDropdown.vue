<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  
};
</script>

<template>
 <div class="relative">
    <!-- KLIK UNTUK MEMBUKA -->
    <button @click="isOpen = !isOpen" class="focus:outline-none">
      <img
        src="../../assets/images/user.jpg"
        alt=""
        class="h-10 rounded-full mr-1"
      />
    </button>

    <!-- KLIK UNTUK MENUTUP -->
    <button
      @click="isOpen = false"
      v-if="isOpen"
      class="fixed top-0 right-0 bottom-0 w-full h-full cursor-default bg-black opacity-50 "
    ></button>

    <!-- DROPDOWN -->
    <div
      v-if="isOpen"
      class="absolute bg-white py-2 rounded-lg w-48 right-0 mr-3 shadow-xl"
      >
    </div>

  </div>
</template>

<style>

</style>