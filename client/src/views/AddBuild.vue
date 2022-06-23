<script>
import { mapState, mapActions } from "pinia";
import { useHeroStore } from "../stores/heroes";
export default {
  name: "Add",
  data() {
    return {
      UserId: localStorage.getItem("id"),
      HeroId: 0,
      Item1: 0,
      Item2: 0,
      Item3: 0,
      Item4: 0,
      Item5: 0,
      Item6: 0,
      Item7: 0,
    };
  },
  computed: {
    ...mapState(useHeroStore, ["heroes", "items"]),
  },
  methods: {
    ...mapActions(useHeroStore, ["addBuild"]),
    async postAdd() {
      try {
        let data = {
          UserId: this.UserId,
          HeroId: this.HeroId,
          Item1: this.Item1,
          Item2: this.Item2,
          Item3: this.Item3,
          Item4: this.Item4,
          Item5: this.Item5,
          Item6: this.Item6,
          Item7: this.Item7,
        };
        await this.addBuild(data);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.HeroId = 0;
        this.Item1 = 0;
        this.Item2 = 0;
        this.Item3 = 0;
        this.Item4 = 0;
        this.Item5 = 0;
        this.Item6 = 0;
        this.Item7 = 0;
      }
    },
  },
};
</script>
<template>
  <div class="py-5" style="background-color: rgb(192, 131, 130)">
    <div class="container">
      <div class="py-5 rounded-4" width="560" height="315" style="background-color: black">
        <div class="row justify-content-center py-5 rounded-5" width="200" height="200" style="background-color: pink">
          <div class="justify-content-center">
            <h3>Add Build</h3>
          </div>
          <form class="row g-3 text-dark" @submit.prevent="postAdd">
            <div>
              <label for="">Hero</label>
              <select class="form-select" aria-label="Default select example" v-model="HeroId">
                <option selected disabled>Choose Hero</option>
                <option v-for="hero in heroes" :key="hero.id" :hero="hero" :value="hero.heroid">{{ hero.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 1</label>
              <select class="form-select" aria-label="Default select example" v-model="Item1">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>

            <div>
              <label for="">Item 2</label>
              <select class="form-select" aria-label="Default select example" v-model="Item2">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 3</label>
              <select class="form-select" aria-label="Default select example" v-model="Item3">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 4</label>
              <select class="form-select" aria-label="Default select example" v-model="Item4">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 5</label>
              <select class="form-select" aria-label="Default select example" v-model="Item5">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 6</label>
              <select class="form-select" aria-label="Default select example" v-model="Item6">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 7</label>
              <select class="form-select" aria-label="Default select example" v-model="Item7">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-dark">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer-->
  <footer class="py-5 bg-dark">
    <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Be Pro 2022</p></div>
  </footer>
</template>
