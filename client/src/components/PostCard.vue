<script>
import axios from "axios";
import { mapActions } from "pinia";
import { useMainStore } from "../stores/main";

export default {
  props: ["item"],
  computed: {
    decodeBase64() {
      let src = `data:image/png;base64, ${this.item.imageUrl}`;
      return src;
    },
    isLikeAble() {
      let UserId = localStorage.getItem("id");
      let isTrue = true;
      this.item.Likes.forEach((el) => {
        if (el.UserId == UserId) {
          isTrue = false;
        }
      });

      return isTrue;
    },
  },
  methods: {
    ...mapActions(useMainStore, ["getPosts"]),
    async like() {
      try {
        let res = await axios({
          method: "post",
          url: `https://instalite-i-project.herokuapp.com/posts/likes/${this.item.id}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(res.data);
        await this.getPosts();
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<template>
  <div class="flex justify-center items-center h-[100vh] w-[50vw] bg-green-400">
    <div class="rounded-lg shadow-lg bg-white w-[610px]">
      <div class="fill object-cover h-96 rounded-t">
        <!-- <img
          src="https://cdn.britannica.com/17/83817-050-67C814CD/Mount-Everest.jpg"
          alt=""
        /> -->
        <img :src="decodeBase64" alt="image" />
      </div>
      <div
        class="w-24 -mt-9 overflow-hidden border-2 border-white rounded-full mx-auto bg-white"
      >
        <img :src="item.User.avatar" />
      </div>
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">
          {{ item.User.username }}
        </h5>
        <p class="text-gray-700 text-base mb-4">
          {{ item.caption }}
        </p>
        <div class="flex">
          <svg
            v-if="!isLikeAble"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="heart"
            class="w-5 text-red-500 mr-1"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            ></path>
          </svg>
          <button @click.prevent="like">
            <svg
              v-if="isLikeAble"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="heart"
              class="w-5 text-red-500"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
              ></path>
            </svg>
          </button>
          <span class="ml-1">{{ item.Likes.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.fill img {
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
}
</style>
