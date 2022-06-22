<script>
import { mapActions, mapWritableState } from "pinia";
import axiosInstance from "../axiosInstance";
import { usePoemStore } from "../stores/poem";
import Navbar from "../components/Navbar.vue";

export default {
  name: "AddPoem",
  components: {
    Navbar,
  },
  data() {
    return {
      title: "",
      author: "",
      content: "",
    };
  },
  methods: {
    ...mapActions(usePoemStore, ["getPoem"]),
    async createPoem() {
      try {
        console.log("masukkk");
        console.log(title);
        console.log(author);
        console.log(content);
        const { data } = await axiosInstance.post("/create-poem", {
          title: this.title,
          author: this.author,
          content: this.content,
        });
        console.log(data);
        this.getPoem();
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <Navbar />
  <div class="container mt-5">
    <div class="row">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title mb-3 text-center">Create Your Poem</h3>
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                v-model="title"
                type="text"
                class="form-control"
                id="title"
              />
            </div>
            <div class="mb-3">
              <label for="author" class="form-label">Author</label>
              <input
                v-model="author"
                type="text"
                class="form-control"
                id="author"
              />
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">Content</label>
              <textarea
                v-model="content"
                type="text"
                class="form-control"
                id="content"
                style="height: 25vh"
              />
            </div>
            <div>
              <button
                @click.prevent="createPoem()"
                class="button"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* button */

.button {
  transition-duration: 0.5s;
  background-color: white;
  height: 40px;
  width: 100%;
  border-radius: 5px;
  color: #292828;
  border-color: #292828;
}

.button:hover {
  background-color: #292828; /* Green */
  color: white;
  border: none;
}
</style>
