<template>
  <footer
    class="text-center text-lg-start bg-light border border-white mt-xl-5 pt-4"
  >
    <!-- Grid container -->
    <div class="container p-4">
      <!--Grid row-->
      <div class="row">
        <!--Grid column-->
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <h5 class="text-uppercase mb-4">OUR WORLD</h5>

          <ul class="list mb-4">
            <li>
              <a href="#!" style="text-decoration: none" class="text-black"
                >About us</a
              >
            </li>
            <li>
              <a href="#!" style="text-decoration: none" class="text-black"
                >Collections</a
              >
            </li>
            <li>
              <a href="#!" style="text-decoration: none" class="text-black"
                >News</a
              >
            </li>
            <li>
              <a href="#!" style="text-decoration: none" class="text-black"
                >Trade Info</a
              >
            </li>
          </ul>
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <h5 class="text-uppercase mb-4">Assistance</h5>

          <ul class="">
            <li>
              <a href="#!" style="text-decoration: none" class="text-black"
                >Contact us</a
              >
            </li>
            <li>
              <a href="#!" style="text-decoration: none" class="text-black"
                >Card Guide</a
              >
            </li>
            <li>
              <a href="#!" style="text-decoration: none" class="text-black"
                >Shipping Information</a
              >
            </li>
            <li>
              <a href="#!" style="text-decoration: none" class="text-black"
                >Payment Info</a
              >
            </li>
          </ul>
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
          <h5 class="text-uppercase mb-4">Sign up to our newsletter</h5>

          <div class="form-outline form-white mb-4">
            <input
              type="email"
              id="form5Example2"
              placeholder="Email Address"
              class="form-control"
            />
          </div>

          <button
            type="submit"
            @click.prevent="successSubscribe"
            class="btn btn-outline-dark"
          >
            Subscribe
          </button>
        </div>
        <!--Grid column-->
      </div>
      <!--Grid row-->
    </div>
    <!-- Grid container -->

    <!-- Copyright -->
    <div class="text-center p-3 border-top border-white">
      © 2020 Copyright:
      <a class="text-black" href="https://www.hacktiv8.com/">Cardbas</a>
    </div>
    <!-- Copyright -->
  </footer>
</template>

<script>
export default {
  name: `FooterComponent`,
  methods: {
    successSubscribe() {
      this.$swal.fire({
        icon: "success",
        title: `Success - 200`,
        text: `Success Subscribing`,
        timer: 1000,
      });
    },
  },
};
</script>
