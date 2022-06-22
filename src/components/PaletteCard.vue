<template>
  <div class="bg-white shadow-md rounded-xl">
    <div class="w-full">
      <div class="grid grid-cols-5 h-full">
        <div class="bg-rose-500 h-40 rounded-tl-xl"></div>
        <div class="bg-rose-600 h-40"></div>
        <div class="bg-rose-700 h-40"></div>
        <div class="bg-rose-800 h-40"></div>
        <div class="bg-rose-900 h-40 rounded-tr-xl"></div>
      </div>
      <div class="flex pt-4 pb-6 px-5">
        <div>
          <a
            href=""
            class="text-xl font-semibold text-slate-700 hover:text-slate-900"
            >Crimson Red</a
          >
          <h3 class="text-md mt-1">RidhoKhalis</h3>
        </div>
        <div class="ml-auto my-auto">
          <img
            src="https://avatars.dicebear.com/api/identicon/user.png"
            class="w-9 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaletteCard",
};
</script>

<style scoped></style>
