import { defineStore } from "pinia";
import axios from 'axios'

export const useProductStore = defineStore('product', {
    state() {
        return {
            baseUrl: `http://localhost:4000`,
            card: []
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
        }
    }
})