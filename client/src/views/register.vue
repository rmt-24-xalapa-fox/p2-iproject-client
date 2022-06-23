<script>
export default {
  name: "registerView",
};
</script>

<template>
  <form>
    <div>
      <label for="username">Username</label>
      <input type="text" name="username" id="username" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="text" name="password" id="password" />
    </div>
    <div>
      <button type="submit">Register</button>
    </div>
  </form>
</template>
