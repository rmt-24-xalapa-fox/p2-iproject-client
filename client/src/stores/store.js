import { defineStore } from "pinia";
import axios from "axios";

export const useCounter = defineStore({
  id: "counter",
  state() {
    return {
      baseURL: `http://localhost:3000`,
      products: [],
      productId: 0,
      sales: [],
      chart: "",
      imageFile: [],
      imageURL: ""
    };
  },
  getters: {},
  actions: {
    clickHome() {
      this.router.push({
        name: "Home"
      })
    },
    clickProducts() {
      this.router.push({
        name: "Products"
      })
      this.fetchProducts()
    },
    clickSales() {
      this.router.push({
        name: "Sales"
      })

      this.fetchAllSales()
    },
    async fetchProducts() {
      try {
        const response = await axios.get(`${this.baseURL}/products`, {});

        this.products = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async fetchOneProduct(id) {
      try {
        console.log(id);
        const response = await axios.get(`${this.baseURL}/products/${id}`, {
          params: {
            id: +id
          }
        })

        this.productId = +id
        this.products = response.data[0]
        this.router.push({
          path: `/products/${id}`
        })
      } catch (err) {
        console.log(err);
      }
    },
    async fetchAllSales() {
      try {
        const response = await axios.get(`${this.baseURL}/sales`, {})

        this.sales = response.data
      } catch (err) {
        console.log(err);
      }
    },
    async createChart() {
      try {
        let data  = {
          "backgroundColor": "#fff",
          "width": 500,
          "height": 300,
          "devicePixelRatio": 1.0,
          "chart": {
            "type": "line",
            "data": {
              "labels": [2012, 2013, 2014, 2015, 2016],
              "datasets": [
                {
                  "label": "Users",
                  "data": [120, 60, 50, 180, 120]
                }
              ]
            }
          }
        }

        let response = await axios.post(`https://quickchart.io/chart/create`, data)
        
        console.log(response.data.url)

        this.chart = response.data.url
      } catch (err) {
        console.log(err)
      }
    },
    async createImgURL(file) {
      try {
        const formData = new FormData();
        formData.append( "image", file )

        const key = `23b2a23b6becf408c71ae7d552032734`
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${key}`, formData)
        
        console.log(response.data.data);
        this.imageURL = response.data.data.display_url
        console.log(this.imageURL)
      } catch (err) {
        console.log(err)
      }
    },
    async addSales(obj) {
      try {
        await axios.post(`${this.baseURL}/sales`, {
          ProductId: obj.ProductId,
          qty: +obj.qty
        })

        this.fetchAllSales()
      } catch (err) {
        console.log(err);
      }
    }
  },
});
