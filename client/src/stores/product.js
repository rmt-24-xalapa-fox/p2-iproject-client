import { defineStore } from "pinia";
import axios from 'axios'
import Swal from 'sweetalert2'

export const useProductStore = defineStore('product', {
    state() {
        return {
            baseUrl: `http://localhost:4000`,
            baseUrl: `https://cardbas.herokuapp.com`,
            card: [],
            favorites: [],
            history: [],
            favTotalPrice: 0,
            shipmentPrice: 0,
            detailCard: {},
            searchName: ''
        }
    },
    actions: {
        async getProducts() {
            try {
                let url = this.baseUrl
                url += `/player`
                if (this.searchName) {
                    url += `?searchName=${this.searchName}`
                }
                console.log(this.searchName);
                console.log(url);
                const response = await axios.get(`${url}`)
                this.card = response.data.data.rows

            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: `Error - ${err.response.data.statusCode}`,
                    text: err.response.data.error.message
                });
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
        getHistory() {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await axios.get(`${this.baseUrl}/history`, {
                        headers: {
                            access_token: localStorage.getItem("access_token")
                        }
                    })
                    this.history = response.data.data
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
        async getProductId(id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await axios.get(`${this.baseUrl}/player/${id}`)
                    this.detailCard = response.data.data
                    // console.log(this.detailCard);
                    resolve()
                }
                catch (err) {
                    reject(err)
                }
            })
        },
        async updateStatus() {
            try {
                const response = await axios.patch(`${this.baseUrl}/update`, {}, {
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })
            }
            catch (err) {
                Swal.fire({
                    icon: "error",
                    title: `Error - ${err.response.data.statusCode}`,
                    text: err.response.data.error.message,
                });
            }
        },
        async purchase() {
            try {
                const response = await axios.post(`${this.baseUrl}/payment`, {
                    totalPrice: this.shipmentPrice + this.favTotalPrice
                })

                // console.log(response.data);
                window.snap.pay(response.data.token, {
                    onSuccess: async (result) => {
                        await axios.patch(`${this.baseUrl}/update`, {}, {
                            headers: {
                                access_token: localStorage.getItem("access_token")
                            }
                        })
                        console.log(result);
                        this.router.push('/collection')
                        console.log(`sukses`);
                        Swal.fire({
                            icon: "success",
                            title: `Success`,
                            text: `Success buy a card`,
                        });
                    },
                    onPending: async (result) => {
                        console.log(result);
                        await axios.patch(`${this.baseUrl}/update`, {}, {
                            headers: {
                                access_token: localStorage.getItem("access_token")
                            }
                        })
                        this.router.push('/collection')
                        console.log(`anggap masuk`);
                        this.updateStatus()
                        Swal.fire({
                            icon: "success",
                            title: `Success`,
                            text: `Success buy a card`,
                        });
                    },
                    onError: function (result) {
                        Swal.fire({
                            icon: "error",
                            title: `Error - Transaction`,
                            text: `please check the transaction`,
                        });
                    },
                    onClose: function (result) {
                        console.log(result);
                        console.log(`close`);
                        wal.fire({
                            icon: "error",
                            title: `Error - Transaction`,
                            text: `please check the transaction`,
                        });
                    },
                })
            }
            catch (err) {
                console.log(err);
            }
        }
    }
})