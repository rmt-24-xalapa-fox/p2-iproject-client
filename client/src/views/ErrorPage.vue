<script>
import { RouterLink } from "vue-router";
export default {
  name: "Error",
  components: {
    RouterLink,
  },
};
</script>
<template>
  <section class="py-5" style="background-color: rgb(192, 131, 130)">
    <div class="container">
      <div class="justify-content-center">
        <div>
          <div class="py-5">
            <div class="py-5">
              <div class="py-5">
                <h1>404</h1>
              </div>
              <div class="">
                <h3>Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?</h3>
                <h4>Let's go <RouterLink to="/" href="">home</RouterLink> and try from there.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer-->
  <footer class="py-5 bg-dark">
    <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Be Pro 2022</p></div>
  </footer>
</template>
