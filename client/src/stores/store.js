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
      imageURL: "",
      categories: [],
      dailySales: {
        totalSales: [],
        totalExpense: [],
        date: []
      }
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
    formDisplay() {
      if (document.getElementById("form").style.display === "block") {
          document.getElementById("form").style.display = "none"              
      } else {
          document.getElementById("form").style.display = "block"
      }
    },
    clickSales() {
      this.router.push({
        name: "Sales"
      })

      this.fetchAllSales()
    },
    async createWeek() {
      try {

          
            
      } catch (err) {
        console.log(err);
      }
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
    async deleteProduct(id) {
      try {
        await axios.delete(`${this.baseURL}/products/${id}`)

        this.clickProducts()
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
    async fetchDailySales() {
      try {
        // const response = await axios.get(`${this.baseURL}/sales`, {})

        // let days = []
    
        // response.data.forEach(el => {
        //   let date = new Date(el.createdAt)
        //   let day = date.getDay()
          
        //   switch (day) {
        //     case 0:
        //       day = "Sunday"
        //       break;
        //     case 1:
        //       day = "Monday"
        //       break;
        //     case 2:
        //       day = "Tuesday"
        //       break;
        //     case 3:
        //       day = "Wednesday"
        //       break;
        //     case 4:
        //       day = "Thursday"
        //       break;
        //     case 5:
        //       day = "Friday"
        //       break;
        //     case 6:
        //       day = "Saturday"
        //       break;
              
        //     default:
        //       break;
        //   }

        //   days.push(day)
        // });
        
        // let arranged = days.reverse()

        // let newDays = arranged.filter((element, index) => {
        //   return arranged.indexOf(element) === index;
        // });

        // this.dailySales.date = newDays
      } catch (err) {
        console.log(err);
      }
    },
    async fetchAllCategories() {
      try {
        const response = await axios.get(`${this.baseURL}/categories`, {})

        this.categories = response.data
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
              "labels": [],
              "datasets": [
                {
                  "label": "Daily Sales",
                  "data": [120, 60, 50, 180, 120]
                }
              ]
            }
          }
        }

        const sales = await axios.get(`${this.baseURL}/sales`, {})

        let daily = []
        let days = []

        sales.data.forEach(el => {
          let date = new Date(el.createdAt)
          let day = date.getDay()
          let obj = {
            dataSales: el.sales, 
            dataDate: date.getDate()
          }
          daily.push(obj)
          
          switch (day) {
            case 0:
              day = "Sunday"
              break;
            case 1:
              day = "Monday"
              break;
            case 2:
              day = "Tuesday"
              break;
            case 3:
              day = "Wednesday"
              break;
            case 4:
              day = "Thursday"
              break;
            case 5:
              day = "Friday"
              break;
            case 6:
              day = "Saturday"
              break;
              
            default:
              break;
          }

          days.push(day)
        });

        let groupBy = function(xs, key) {
          return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x.dataSales);
            return rv;
          }, {});
        };
        
        let groupedDailySales = groupBy(daily, 'dataDate');
        let chartDailySalesData = []

        for (const key in groupedDailySales) {
          if (Object.hasOwnProperty.call(groupedDailySales, key)) {
            const el = groupedDailySales[key];

            const start = 0;
            const sumWithInitial = el.reduce(
              (a, b) => a + b,
              start
            );

            chartDailySalesData.push(sumWithInitial)
          }
        }
        
        let arranged = days.reverse()
        let newDays = arranged.filter((element, index) => {
          return arranged.indexOf(element) === index;
        });
        data.chart.data.labels = newDays
        data.chart.data.datasets[0].data = chartDailySalesData

        let response = await axios.post(`https://quickchart.io/chart/create`, data)
        
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
    },
    async addProduct(obj) {
      try {
        await axios.post(`${this.baseURL}/products`, {
          name: obj.name,
          description: obj.description,
          imgUrl: this.imageURL,
          price: +obj.price,
          CategoryId: +obj.CategoryId
        })

        this.router.push({
          name: "Products"
        })

        this.formDisplay()
        this.fetchProducts()
      } catch (err) {
        console.log(err);
      }
    }
  },
});
