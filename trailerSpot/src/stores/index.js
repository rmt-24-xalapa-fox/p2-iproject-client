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
    query: "",
    activeMovie: {},
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

    async register(query, email, password) {
      try {
        const res = await axios.post("http://localhost:3000/users/register", {
          query,
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

    async goToPage(page) {
      await this.getMovies(page, "", this.query);
    },

    async getMovies(page, CategoryId, query) {
      try {
        if (!page) {
          page = 1;
        }
        if (!query) {
          query = "";
        }
        const access_token = this.access_token;
        let response = "";
        response = await axios({
          method: "GET",
          url: `http://localhost:3000/movies?page=${page}&query=${query}`,
        });
        this.movies = response.data.results;
        this.activePage = response.data.page;
        this.pages = response.data.total_pages;
        this.query = query;
      } catch (err) {
        this.errorHandler(err);
      }
    },

    async getDetail(id) {
      try {
        const access_token = this.access_token;
        const response = await axios({
          method: "GET",
          url: `http://localhost:3000/movies/${id}`,
        });
        this.activeMovie = response.data;
      } catch (err) {
        this.errorHandler(err);
      }
    },
  },
});
