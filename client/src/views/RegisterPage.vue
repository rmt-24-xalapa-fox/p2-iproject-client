<template>
  <div class="form my-4 mx-5 register-pagec">
    <div class="container">
      <div class="row row1 no-guttersrc">
        <div class="col-lg-5">
          <img
            id="imgidr"
            src="https://i.pinimg.com/564x/1a/9d/45/1a9d45a153c157fc1327c54e8258c910.jpg"
            class=""
            alt="gambar"
          />
        </div>
        <div class="col-lg-7 kanan1r">
          <div class="px-5 pt-2 mt-5">
            <form id="form-registerc">
              <div class="form-row">
                <h3>Register your account</h3>
                <div class="col-lg-8 mt-4">
                  <input
                    v-model="dataReg.email"
                    type="email"
                    id="emailrc"
                    class="form-control"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-8 mt-3">
                  <input
                    v-model="dataReg.password"
                    type="password"
                    id="passwordrc"
                    class="form-control"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="col-lg-8 mt-3">
                  <input
                    v-model="dataReg.username"
                    type="text"
                    id="customerrc"
                    class="form-control"
                    placeholder="Username"
                  />
                </div>
                <div class="col-lg-8 mt-3">
                  <input
                    v-model="dataReg.phoneNumber"
                    type="number"
                    id="phonenumberrc"
                    class="form-control"
                    placeholder="Phone Number"
                  />
                </div>
                <div class="col-md-8 mt-3">
                  <div class="row">
                    <div class="col-6">
                      <select
                        @change="triggerCity($event)"
                        v-model="dataReg.provinceId"
                        class="form-select form-select mb-3"
                        aria-label=".form-select-lg example"
                      >
                        <option selected disabled value="0">
                          Select Province
                        </option>
                        <option
                          v-for="dat in province"
                          :key="dat.province_id"
                          :value="dat.province_id"
                        >
                          {{ dat.province }}
                        </option>
                      </select>
                    </div>
                    <div class="col-6">
                      <select
                        v-if="dataReg.provinceId > 0"
                        class="form-select form-select mb-3"
                        aria-label=".form-select-lg example"
                        v-model="dataReg.cityId"
                      >
                        <option selected disabled>Select City</option>
                        <option
                          v-for="dat in city"
                          :key="dat.city_id"
                          :value="dat.city_id"
                        >
                          {{ dat.city_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-8 mt-3">
                  <textarea
                    v-model="dataReg.address"
                    type="text"
                    id="addressrc"
                    class="form-control"
                    placeholder="Address"
                  ></textarea>
                </div>
              </div>
              <div class="form-row">
                <div class="mt-3">
                  <button
                    type="submit"
                    @click.prevent="postRegister"
                    class="btn btn-dark"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default {
  name: `RegisterPage`,
  methods: {
    ...mapActions(useUserStore, ["getProvince", "getCity", "registerUser"]),
    async dataProvince() {
      try {
        await this.getProvince();
      } catch (err) {
        console.log(err);
      }
    },
    async dataCity(id) {
      try {
        await this.getCity(id);
      } catch (err) {}
    },
    triggerCity(event) {
      this.dataCity(event.target.value);
    },

    async postRegister() {
      try {
        await this.registerUser(this.dataReg);
        this.$swal.fire({
          icon: "success",
          title: `Success - 200`,
          text: `Success Register`,
          timer: 1000,
        });
        this.$router.pusth("/login");
      } catch (err) {
        this.$swal.fire({
          icon: "error",
          title: `Error - ${err.response.data.statusCode}`,
          text: err.response.data.error.message,
          timer: 1000,
        });
      } finally {
        (this.dataReg.email = ""),
          (this.dataReg.password = ""),
          (this.dataReg.username = ""),
          (this.dataReg.phoneNumber = ""),
          (this.dataReg.provinceId = 0),
          (this.dataReg.cityId = 0),
          (this.dataReg.address = "");
      }
    },
  },
  data() {
    return {
      dataReg: {
        email: "",
        password: "",
        username: "",
        phoneNumber: "",
        provinceId: 0,
        cityId: 0,
        address: "",
      },
    };
  },
  computed: {
    ...mapState(useUserStore, ["province", "city"]),
  },
  created() {
    this.dataProvince();
    // console.log(this.province);
  },
};
</script>

<style>
.kanan1r {
  box-shadow: 12px 8px 15px grey;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #f7faff;
}
#imgidr {
  box-shadow: 2px 5px 5px grey;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
</style>
