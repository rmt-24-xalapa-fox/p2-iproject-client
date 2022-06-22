import { defineStore } from "pinia";
import axios from "axios";
import router from "../router/index.js";
import swal from "sweetalert";

export const useMusicYuhu = defineStore({
  id: "counter",
  state: () => ({
    counter: 0,
    userloged: {},
    url: "http://localhost:3000/"
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    async signupprocess() {
      try {
        const newUser = await axios.post(this.url + "register", {
          email: this.userloged.email,
          password: this.userloged.password,
          name: this.userloged.name,
        });
        router.push("/login");
        swal({
          title: "Success",
          text: `Thank You for Register ${this.userloged.name}, please check your email`,
          icon: "success",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
