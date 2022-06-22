<script>
import { mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useCounterStore } from "../stores/counter";

export default {
  name: "RegisterView",
  data() {
    return {
      dataRegister: {
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      },
    };
  },
  components: {
    RouterLink,
  },
  methods: {
    ...mapActions(useCounterStore, ["registerHandler"]),
    async register() {
      let res = await this.registerHandler(this.dataRegister);
      if (res) {
        this.$router.push("/login");
        this.$swal({
          icon: "success",
          text: "success register",
        });
      } else {
        this.$swal({
          icon: "error",
          text: "something wrong",
        });
      }
    },
  },
};
</script>

<template>
  <div
    class="shadow rounded"
    style="width: 50%; margin: auto; padding: 3%; background-color: #b7e5dd"
  >
    <RouterLink to="/login" href="">
      <img src="../assets/back(2).png" alt="" />
    </RouterLink>
    <div style="width: 100px; margin: auto">
      <img
        src="../assets/TRAVEL_TOURISM_LOGO-02-removebg-preview.png"
        alt=""
        style="width: 100px; height: 100px"
      />
    </div>
    <div style="margin: auto">
      <div>
        <h3 style="text-align: center">Sign-Up</h3>
      </div>
      <form action="" @submit.prevent="register">
        <div>
          <div class="form-group mt-3">
            <label class="form-control-placeholder" for="email">Username</label>
            <input
              type="text"
              class="form-control"
              required
              v-model="dataRegister.username"
              placeholder="input username"
            />
          </div>
          <div class="form-group">
            <label class="form-control-placeholder" for="email">Email</label>
            <input
              type="text"
              class="form-control"
              required
              v-model="dataRegister.email"
              placeholder="input email"
            />
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
              v-model="dataRegister.password"
              placeholder="input password"
            />
          </div>
          <div class="form-group">
            <label class="form-control-placeholder" for="email"
              >Phone number</label
            >
            <input
              type="text"
              class="form-control"
              required
              v-model="dataRegister.phoneNumber"
              placeholder="input phone number"
            />
          </div>
          <label class="form-control-placeholder" for="email">Address</label>
          <div class="form-group">
            <textarea
              name=""
              id=""
              rows="5"
              v-model="dataRegister.address"
              class="form-control"
              placeholder="input address"
            ></textarea>
          </div>
          <div style="margin-top: 2%">
            <button class="btn btn-primary" style="width: 100%">
              register
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
