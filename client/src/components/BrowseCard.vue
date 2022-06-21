<script>
export default {
  name: "BrowseCard",
};
</script>
<template>
  <div class="browse">
    <div class="row">
      <div class="card" style="height: 24vh; width: 100%">
        <div class="card-body">
          <h3 class="card-title mb-3 text-center">Author Search</h3>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="title"
            />
          </div>
          <div>
            <button class="button">Search</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.browse {
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
