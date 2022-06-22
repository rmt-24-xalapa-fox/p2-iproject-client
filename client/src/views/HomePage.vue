<script>
import NavbarVue from "../components/Navbar.vue";
import axios from "axios";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useMainStore } from "../stores/main";
import PostCard from "../components/PostCard.vue";
import News from "../components/News.vue";
export default {
  components: { NavbarVue, PostCard, News },
  data() {
    return {
      imageUrl: "",
      caption: "",
      totalPosts: 0,
      totalFollowers: 0,
      totalFollowings: 0,
      search: "",
    };
  },
  computed: {
    ...mapWritableState(useMainStore, ["posts", "news"]),
    avatar() {
      return localStorage.getItem("avatar");
    },
    username() {
      return localStorage.getItem("username");
    },
    moto() {
      return localStorage.getItem("moto");
    },
  },
  methods: {
    ...mapActions(useMainStore, ["getPosts", "getNews"]),
    uploadFile() {
      this.imageUrl = this.$refs.file.files[0];
      console.log(this.imageUrl, "imageUrl");
    },
    async submitFile() {
      try {
        const formData = new FormData();
        formData.append("imageUrl", this.imageUrl);
        formData.append("caption", this.caption);
        console.log(">>>", formData);
        let res = await axios({
          method: "post",
          url: "http://localhost:3000/posts/upload",
          headers: {
            access_token: localStorage.getItem("access_token"),
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        // console.log(res);
        console.log("before get posts");
        await this.getPosts();
        console.log("after get posts");
        await this.getTotalPosts();
        console.log("after get totalposts");
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    getTotalPosts() {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await axios({
            method: "get",
            url: "http://localhost:3000/posts/myposts",
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          });
          // console.log(res.data.length);
          this.totalPosts = res.data.length;
          console.log("gett total post", res.data.length);
          resolve();
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
    },
    async getTotalFollowers() {
      try {
        let res = await axios({
          method: "get",
          url: `http://localhost:3000/followers/${localStorage.getItem("id")}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log(res.data.length);
        this.totalFollowers = res.data.length;
      } catch (err) {
        console.log(err);
      }
    },
    async getTotalFollowings() {
      try {
        let res = await axios({
          method: "get",
          url: `http://localhost:3000/followings/${localStorage.getItem("id")}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log(res.data.length);
        this.totalFollowings = res.data.length;
      } catch (err) {
        console.log(err);
      }
    },
    async getSearchNews() {
      try {
        let res = await axios({
          method: "get",
          url: `https://newsapi.org/v2/everything?q=${this.search}&apiKey=b67e3f1a0f9f4cf2a4723775a66277bd`,
        });
        this.news = res.data.articles;
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getPosts();
    this.getTotalPosts();
    this.getTotalFollowers();
    this.getTotalFollowings();
    this.getNews();
  },
};
</script>

<template>
  <NavbarVue></NavbarVue>
  <div class="flex justify-around mt-5">
    <!-- Mini Profile -->
    <div
      class="flex flex-col items-center h-[60vh] w-[20vw] bg-sky-300 shadow-lg rounded-lg"
    >
      <img
        :src="avatar"
        class="rounded-lg w-32 ring-2 ring-blue-500/50 mt-5"
        alt="Avatar"
      />
      <p class="font-bold text-lg">{{ username }}</p>
      <p
        class="text-base font-light leading-relaxed mt-5 mb-0 text-gray-800 text-center"
      >
        {{ moto }}
      </p>
      <footer class="block text-gray-600">- {{ username }}</footer>
      <ul class="flex justify-center">
        <li>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="heart"
            class="w-3.5 text-red-500 mr-1"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            ></path>
          </svg>
        </li>
        <li>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="star"
            class="w-4 text-yellow-600 mr-1"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            ></path>
          </svg>
        </li>
        <li>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="heart"
            class="w-3.5 text-red-500 mr-1"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            ></path>
          </svg>
        </li>
      </ul>
      <div class="mt-12 grid grid-cols-3 divide-x text-emerald-700">
        <div class="flex flex-col justify-center items-center">
          <p class="font-semibold text-lg">{{ totalPosts }}</p>
          <p>Post</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <p class="font-semibold text-lg">{{ totalFollowers }}</p>
          <p>Followers</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <p class="font-semibold text-lg">{{ totalFollowings }}</p>
          <p>Followings</p>
        </div>
      </div>
    </div>
    <!-- /Mini Profile-->

    <!-- Post Container -->
    <div class="flex flex-col w-[50vw] shadow-lg rounded-lg">
      <!-- Upload Panel -->
      <div
        class="flex justify-center items-center h-[40vh] w-[50vw] bg-green-400 rounded-t-lg"
      >
        <div
          class="flex flex-col items-center rounded-lg shadow-lg bg-white h-[35vh] w-[40vw]"
        >
          <div
            class="mt-5 text-center font-sans font-semibold text-2xl text-emerald-600"
          >
            Upload Your Posting
          </div>
          <div class="mt-5 w-[90%]">
            <form action="">
              <div class="rounded-md shadow-sm -space-y-px">
                <div>
                  <label class="font-sans font-medium">Image : </label>
                  <input
                    type="file"
                    @change="uploadFile"
                    ref="file"
                    accept="image/*"
                  />
                  <input
                    v-model="caption"
                    type="text"
                    class="mt-5 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="share your thoughts..."
                  />
                  <div class="flex justify-center">
                    <button
                      @click.prevent="submitFile"
                      class="mt-5 text-center inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- /Upload Panel -->

      <!-- Post Card -->
      <PostCard v-for="item in posts" :key="item.id" :item="item"></PostCard>
      <!-- /Post Card -->
    </div>
    <!-- /Post Container -->

    <!-- News Container -->
    <div
      class="flex flex-col items-center w-[20vw] bg-red-300 shadow-lg rounded-lg"
    >
      <form class="mt-3">
        <label
          for="search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >Your Email</label
        >
        <div class="relative">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            v-model="search"
            class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
          <button
            @click.prevent="getSearchNews"
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <News v-for="(item, index) in news" :key="index" :item="item"></News>
    </div>
    <!-- /New Container -->
  </div>
</template>
