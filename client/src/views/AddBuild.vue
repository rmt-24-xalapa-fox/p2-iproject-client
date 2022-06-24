<script>
import { mapState, mapActions } from "pinia";
import { useHeroStore } from "../stores/heroes";
export default {
  name: "Add",
  data() {
    return {
      UserId: localStorage.getItem("id"),
      HeroId: 0,
      Item1Id: 0,
      Item2Id: 0,
      Item3Id: 0,
      Item4Id: 0,
      Item5Id: 0,
      Item6Id: 0,
      Item7Id: 0,
    };
  },
  computed: {
    ...mapState(useHeroStore, ["heroes", "items", "heroNotApi"]),
  },
  methods: {
    ...mapActions(useHeroStore, ["addBuild", "getHeroNotApi"]),
    async postAdd() {
      try {
        let data = {
          UserId: this.UserId,
          HeroId: this.HeroId,
          Item1Id: this.Item1Id,
          Item2Id: this.Item2Id,
          Item3Id: this.Item3Id,
          Item4Id: this.Item4Id,
          Item5Id: this.Item5Id,
          Item6Id: this.Item6Id,
          Item7Id: this.Item7Id,
        };
        await this.addBuild(data);
        this.$router.push("/build");
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
  created() {
    this.getHeroNotApi();
  },
};
</script>
<template>
  <div class="py-3" style="background-color: rgb(192, 131, 130)">
    <div class="container">
      <div class="py-5 px-5 rounded-4" width="560" height="315" style="background-color: black">
        <div class="row justify-content-center py-5 rounded-5" width="200" height="200" style="background-color: pink">
          <div class="justify-content-center">
            <h3>Add Build</h3>
            <p>Note: Item1 for jungler or roamer equipment. If not please use item7 to optional equipment</p>
          </div>
          <form class="row g-3 text-dark" @submit.prevent="postAdd">
            <div>
              <label for="">Hero</label>
              <select class="form-select" aria-label="Default select example" v-model="HeroId">
                <option selected disabled>Choose Hero</option>
                <option v-for="hero in heroNotApi" :key="hero.id" :hero="hero" :value="hero.id">{{ hero.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 1</label>
              <select class="form-select" aria-label="Default select example" v-model="Item1Id">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>

            <div>
              <label for="">Item 2</label>
              <select class="form-select" aria-label="Default select example" v-model="Item2Id">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 3</label>
              <select class="form-select" aria-label="Default select example" v-model="Item3Id">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 4</label>
              <select class="form-select" aria-label="Default select example" v-model="Item4Id">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 5</label>
              <select class="form-select" aria-label="Default select example" v-model="Item5Id">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 6</label>
              <select class="form-select" aria-label="Default select example" v-model="Item6Id">
                <option selected disable>Choose Item</option>
                <option v-for="item in items" :key="item.id" :item="item" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div>
              <label for="">Item 7</label>
              <select class="form-select" aria-label="Default select example" v-model="Item7Id">
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
