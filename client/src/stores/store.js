import { defineStore } from "pinia";
import axios from "axios";

export const useCounter = defineStore({
  id: "counter",
  state() {
    return {
      baseURL: `http://localhost:3000`,
      products: [],
      sales: [],
      chart: "",
      imageFile: [],
      imageURL: "",
      categories: [],
      parameter: 0,
      todaySales: 0,
      todayExpense: 0
    };
  },
  getters: {
  },
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
    clickDetail(id) {
        this.router.push({
            name: "ProductDetail",
            params: {
                id
            }
        })

        this.parameter = id
        this.fetchOneProduct(this.parameter)    
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
        const response = await axios.get(`${this.baseURL}/products/${id}`, {
          params: {
            id: +id
          }
        })

        this.products = response.data[0]
      } catch (err) {
        console.log(err);
      }
    },
    async editProduct(obj) {
      try {
        console.log(`masuk`);
        console.log(obj);

        await axios.put(`${this.baseURL}/products/${this.products.id}`, {
          name: obj.name,
          description: obj.description,
          imgUrl: this.imageURL,
          price: obj.price,
          CategoryId: obj.CategoryId
        })

        this.router.push({
          name: "Products"
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
          "width": 720,
          "height": 432,
          "devicePixelRatio": 1.0,
          "chart": {
            "type": "bar",
            "data": {
              "labels": [],
              "datasets": [
                {
                  "label": "Daily Sales",
                  "data": [120, 60, 50, 180, 120]
                },
                {
                  "label": "Daily Expense",
                  "data": [120000, 60000, 50000]
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
            dataExpense: el.cost,
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

        //Group Sales by date
        let groupBy = function(xs, key) {
          return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x.dataSales);
            return rv;
          }, {});
        };
        
        let groupedDailySales = groupBy(daily, 'dataDate');
        let chartDailySalesData = []
        let chartDailyExpenseData = []

        //Sum total Sales by date
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

        let groupCost = function(xs, key) {
          return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x.dataExpense);
            return rv;
          }, {});
        };

        let groupedDailyExpense = groupCost(daily, 'dataDate');

        for (const key in groupedDailyExpense) {
          if (Object.hasOwnProperty.call(groupedDailyExpense, key)) {
            const el = groupedDailyExpense[key];

            const start = 0;
            const sumWithInitial = el.reduce(
              (a, b) => a + b,
              start
            );

            chartDailyExpenseData.push(sumWithInitial)
          }
        }
        
        //Label of days
        let arranged = days.reverse()
        let newDays = arranged.filter((element, index) => {
          return arranged.indexOf(element) === index;
        });
        data.chart.data.labels = newDays
        data.chart.data.datasets[0].data = chartDailySalesData.reverse()
        let lastData = chartDailySalesData.reverse()
        data.chart.data.datasets[1].data = chartDailyExpenseData.reverse()
        let latestExpense = chartDailyExpenseData.reverse()

        this.todaySales = lastData[0]
        this.todayExpense = latestExpense[0]

        let response = await axios.post(`https://quickchart.io/chart/create`, data)
        
        this.chart = response.data.url
      } catch (err) {
        console.log(err)
      }
    },
    async createImgURL(file) {
      try {
        // console.log(file);
        const formData = new FormData();
        formData.append( "image", file )

        const key = `23b2a23b6becf408c71ae7d552032734`
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${key}`, formData)
        
        this.imageURL = response.data.data.display_url
        console.log(this.imageURL);
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
