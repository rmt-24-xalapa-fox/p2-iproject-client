<script>
export default {
  name: "Buttons",
  props: ["button-name"],
};
</script>

<template>
  <button class="btn btn-info">
    {{ buttonName }}
  </button>
</template>

<style></style>
