import { defineStore } from "pinia";
import axios from "axios";
import swal from "sweetalert";
export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    loggedIn: false,
    access_token: "",
    userData: {},
    movies: [],
    pages: 0,
    activePage: 1,
    bookmarks: [],
    activeProductData: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    errorHandler(err) {
      const error = err.response.data;
      let errorMessage = error.error;
      if (Array.isArray(error.detail)) {
        errorMessage += ":\n" + error.detail.join(`\n`);
      }
      swal("Error!", errorMessage, "error");
    },

    logout() {
      localStorage.clear();
      this.loggedIn = false;
      swal("Success!", "Sucessfully logged out", "success");
      this.$router.push("/login");
    },

    async register(name, email, password) {
      try {
        const res = await axios.post("http://localhost:3000/users/register", {
          name,
          email,
          password,
        });
        if (res.status === "success") {
          swal("Success!", res.status, "success");
        }
        this.login(email, password);
      } catch (err) {
        this.errorHandler(err);
      }
    },

    async login(email, password) {
      try {
        const res = await axios.post("http://localhost:3000/users/login", {
          email: email,
          password: password,
        });
        const { access_token } = res.data.data;
        if (access_token) {
          swal("Successfully logged in!", "", "success");

          localStorage.setItem("access_token", access_token);
          this.accessToken = access_token;

          // localStorage.setItem("user_data", JSON.stringify(userData));
          // this.userData = userData;

          this.loggedIn = true;

          this.$router.push("/");
        }
      } catch (err) {
        this.errorHandler(err);
      }
    },

    async getMovies(page, CategoryId, name) {
      try {
        if (!page) {
          page = 1;
        }
        if (!name) {
          name = "";
        }

        const access_token = this.access_token;
        let response = "";
        response = await axios({
          method: "GET",
          url: `http://localhost:3000/movies`,
        });
        this.movies = response.data.results;
        console.log(response.data);
        this.pages = Math.ceil(response.data.total_pages / 20);
      } catch (err) {
        this.errorHandler(err);
      }
    },
  },
});
