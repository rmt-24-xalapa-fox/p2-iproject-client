<template>
  <div class="bg-white shadow-md rounded-xl">
    <div class="w-full">
      <div class="grid grid-cols-5 h-full">
        <div
          class="bg-rose-500 h-40 rounded-tl-xl color"
          :data-color="colorPalette.colors[0]"
          :style="{ 'background-color': colorPalette.colors[0] }"
        ></div>
        <div
          class="bg-rose-600 h-40 color"
          :data-color="colorPalette.colors[1]"
          :style="{ 'background-color': colorPalette.colors[1] }"
        ></div>
        <div
          class="bg-rose-700 h-40 color"
          :data-color="colorPalette.colors[2]"
          :style="{ 'background-color': colorPalette.colors[2] }"
        ></div>
        <div
          class="bg-rose-800 h-40 color"
          :data-color="colorPalette.colors[3]"
          :style="{ 'background-color': colorPalette.colors[3] }"
        ></div>
        <div
          class="bg-rose-900 h-40 rounded-tr-xl color"
          :data-color="colorPalette.colors[4]"
          :style="{ 'background-color': colorPalette.colors[4] }"
        ></div>
      </div>
      <div class="flex pt-4 pb-6 px-5">
        <div>
          <a
            href=""
            class="text-xl font-semibold text-slate-700 hover:text-slate-900"
            >{{ colorPalette.name }}</a
          >
          <h3 class="text-md mt-1">{{ colorPalette.User.name }}</h3>
        </div>
        <div class="ml-auto my-auto">
          <img :src="imageUrl" class="w-9 border rounded-full" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  name: "PaletteCard",
  props: ["colorPalette"],
  computed: {
    imageUrl() {
      const profilePicture = this.colorPalette.User.profilePicture;
      const formatFile = profilePicture.substr(profilePicture.length - 4);
      if (formatFile === ".png") {
        return profilePicture;
      } else {
        return `data:image/svg+xml;base64,${profilePicture}`;
      }
    },
  },
  mounted() {
    const colors = document.querySelectorAll(".color");
    colors.forEach((color) => {
      color.addEventListener("click", (event) => {
        navigator.clipboard.writeText(event.target.getAttribute("data-color"));
        swal("Success", "Color has been copied to clipboard", "success");
      });
    });
  },
};
</script>

<style scoped></style>
