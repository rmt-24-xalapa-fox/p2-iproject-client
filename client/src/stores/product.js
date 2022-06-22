import { defineStore } from "pinia";
import axios from 'axios'

export const useProductStore = defineStore('product', {
    state() {
        return {
            baseUrl: `http://localhost:4000`,
            card: [],
            favorites: [],
            favTotalPrice: 0,
            shipmentPrice: 0
        }
    },
    actions: {
        async getProducts() {
            try {
                const response = await axios.get(`${this.baseUrl}/player`)
                this.card = response.data.data.rows

            } catch (err) {
                console.log(err);
            }

        },
        addToList(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await axios.post(`${this.baseUrl}/carduser/${id}`, {

                    }, {
                        headers: {
                            access_token: localStorage.access_token
                        }
                    })

                    resolve()
                }
                catch (err) {
                    reject(err)
                }
            })
        },
        getFavorites() {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await axios.get(`${this.baseUrl}/carduser`, {
                        headers: {
                            access_token: localStorage.getItem("access_token")
                        }
                    })
                    this.favorites = response.data.data
                    this.favTotalPrice = response.data.totalPrice
                    console.log(this.favTotalPrice);
                    resolve()
                }
                catch (err) {

                    reject(err)
                }
            })
        },
        deleteFavorites(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await axios.delete(`${this.baseUrl}/carduser/${id}`, {
                        headers: {
                            access_token: localStorage.getItem("access_token")
                        }
                    })
                    resolve()

                }
                catch (err) {
                    reject(err)
                }
            })
        },
        getShipPrice(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await axios.post(`${this.baseUrl}/price/${id}`, {})
                    // console.log(response);
                    this.shipmentPrice = response.data.value
                    resolve()
                }
                catch (err) {
                    reject(err)
                }
            })
        },
        async purchase() {
            try {
                const response = await axios.post(`${this.baseUrl}/payment`, {
                    totalPrice: this.shipmentPrice + this.favTotalPrice
                })

                // console.log(response.data);
                window.snap.pay(response.data.token, {
                    onSuccess: function (result) {
                        console.log(result);
                        console.log(`sukses`);
                    },
                    onPending: function (result) {
                        console.log(result);
                        console.log(`pending`);
                    },
                    onError: function (result) {
                        console.log(result);
                        console.log(`error`);
                    },
                    onClose: function (result) {
                        console.log(result);
                        console.log(`close`);
                    },
                })
            }
            catch (err) {
                console.log(err);
            }
        }
    }
})