<script>
export default {
  name: "BrowseContentCard",
};
</script>
<template>
  <div class="card text-center mb-3" style="height: 20vh; width: 100%">
    <div class="card-body" style="padding: 1rem">
      <h5 class="card-title"><i>Test Browse</i></h5>
      <p style="margin-bottom: 0">By: author</p>
    </div>
    <div class="div card-footer d-flex justify-content-end border-1 bg-footer">
      <div>
        <button class="button" style="width: 150px">Read More</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-footer {
  background-color: white;
}

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
