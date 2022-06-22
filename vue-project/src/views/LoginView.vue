<script></script>

<template>
  <div class="d-flex" style="align-items: center">
    <img
      src="../assets/mohd-nasiruddin-mohd-nasir-OYKbD7Jw3AU-unsplash.jpg"
      alt=""
      style="
        position: absolute;
        z-index: -9999;
        background-size: cover;
        width: 197vh;
        height: 130vh;
      "
    />
    <div style="margin: auto; margin-top: 15%">
      <div id="form-login" style="text-align: center">
        <form action="#" class="signin-form" style="">
          <div class="form-group mt-3">
            <label class="form-control-placeholder" for="username"
              >Username</label
            >
            <input type="text" class="form-control" required />
          </div>
          <div class="form-group">
            <label class="form-control-placeholder" for="password"
              >Password</label
            >
            <input
              id="password-field"
              type="password"
              class="form-control"
              required
            />
            <span
              toggle="#password-field"
              class="fa fa-fw fa-eye field-icon toggle-password"
            ></span>
          </div>
          <div class="form-group mt-2">
            <button
              type="submit"
              class="form-control btn btn-primary rounded submit px-3"
            >
              Sign In
            </button>
          </div>
          <div class="form-group d-md-flex">
            <p>Don't have account yet ?</p>
            <a href="" style="color: white"> Sign-up here</a>
          </div>
          <!-- <div class="form-group d-md-flex">
            <div class="w-50 text-left">
              <label class="checkbox-wrap checkbox-primary mb-0"
                >Remember Me
                <input type="checkbox" checked />
                <span class="checkmark"></span>
              </label>
            </div>
            <div class="w-50 text-md-right">
              <a href="#" style="color: white">Forgot Password</a>
            </div>
          </div> -->
        </form>
        <div style="text-align: center">
          <p>or sign up using</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
