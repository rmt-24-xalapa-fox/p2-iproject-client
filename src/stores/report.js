import { defineStore } from 'pinia'
import { BASE_URL } from "../base_url";

export const useReportStore = defineStore({
  id: 'report',
  state: () => ({
    baseUrl: BASE_URL,
    isLogin: false,
    displayEmail: "",
    reportFetched: [],
    myReport: []
  }),
  actions: {
    async login(loginData) {
      try {
        let response = await axios({
          method: `POST`,
          data: loginData,
          url: this.baseUrl + `public/login`
        })

        this.isLogin = true
        localStorage.setItem(`access_token`, response.data.data.accessToken)
        localStorage.setItem(`displayEmail`, response.data.data.displayEmail)
        this.displayEmail = localStorage.getItem(`displayEmail`)
        await this.fetchData()


        this.router.push(`/`)
        console.log(`login successz`)

      } catch (err) {
        console.log(err)
        swal({
          title: "Error " + err.response.data.statusCode,
          text: err.response.data.error.message,
        });
        localStorage.clear()

      }
    },

    async register(registerData) {
      try {

        let response = await axios({
          method: `POST`,
          data: registerData,
          url: this.baseUrl + `public/register`
        })
        this.router.push(`/login`)
        swal({
          title: "Sign Up Success!",
          text: `Please login to continue`,
        });

      } catch (err) {
        console.log(err)
        swal({
          title: "Error " + err.response.data.statusCode,
          text: err.response.data.error.message,
        });
        localStorage.clear()

      }
    },

    logOut() {
      localStorage.clear()
      this.isLogin = false
      this.displayEmail = ""
      this.router.push(`/login`)
      swal(`You are logged out`);
    },

    async fetchData() {
      try {
        // const params = {
        //   page, title, categoryId
        // }

        let response = await axios({
          method: `GET`,
          url: this.baseUrl + `public/report`
        })
        this.reportFetched = response.data.data
        // console.log(response.data.data, `<<<<<<<<<<<<<<<<`)

        if (this.isLogin) {
          let { data } = await axios({
            method: `GET`,
            url: this.baseUrl + `public/myReport`,
            headers: { access_token: localStorage.getItem(`access_token`) }
          })
          this.myReport = data.data
        }

        this.displayEmail = localStorage.getItem(`displayEmail`)

        // console.log(`done fetch`)

      } catch (err) {
        console.log(err)
        swal({
          title: "Error " + err.response.data.statusCode,
          text: err.response.data.error.message,
        });
        localStorage.clear

      }
    },

    async createHandler(data) {
      try {

        // let img = await axios({
        //   method: `POST`,
        //   data: { image: data },
        //   url: this.baseUrl +`public/upload`
        // })


        let resp = await axios.post(BASE_URL + `public/report`, data, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        await this.fetchData()
        this.router.push(`/`)

        swal("Report successfully submitted!");
      } catch (err) {
        console.log(err);
        swal({
          title: "Error " + err.response.data.statusCode,
          text: err.response.data.error.message,
        });
      }
    }
  }
})
