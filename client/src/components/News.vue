<script>
export default {
  props: ["item"],
};
</script>

<template>
  <div
    class="my-5 flex w-[90%] flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg"
  >
    <div class="p-6 flex flex-col justify-start">
      <h5 class="text-gray-900 text-s font-medium mb-2">{{ item.title }}</h5>
      <p class="text-gray-700 text-xs mb-4">
        {{ item.description }}
      </p>
      <a :href="item.url" target="_blank" class="text-gray-600 text-xs"
        >Read more...</a
      >
    </div>
  </div>
</template>
