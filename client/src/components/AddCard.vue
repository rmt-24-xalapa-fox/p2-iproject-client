<script>
export default {
  name: "AddCard",
  methods: {
    changePage(page) {
      this.$router.push(`${page}`)
    },
  }
};
</script>
<template>
  <div class="add">
    <div class="row">
      <div class="card" style="height: 20vh; width: 100%">
        <div class="card-body">
          <h3 class="card-title mb-3 text-center">Create Your Poem</h3>
          <div>
            <button @click.prevent="changePage('/create')" class="button">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add {
  width: 25%;
  /* background-color: blue; */
  display: flex;
  justify-content: center;
  padding: 20px;
}

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
