<script>
import axios from 'axios'

export default {
    name: "Currency Changer",
    data() {
        return {
            result: 0,
            to: "",
            from: "",
            amount: ""
        }
    },
    methods: {

        fetchCurrency() {
            var myHeaders = new Headers();
            myHeaders.append("apikey", "OHdma3CJSIGpnL6Ky7xOwG75jvQ5TWF0");

            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders
            };

            fetch(`https://api.apilayer.com/fixer/convert?to=${this.to}&from=${this.from}&amount=${this.amount}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.result = result[result];
                    console.log(result)
                })
                .catch(error => console.log('error', error));
        }
    }

}
</script>

<template>
    <form action="#">
        <label for="">From</label>
        <input v-model="from" type="text">
        <label for="">To</label>
        <input v-model="to" type="text">
        <label for="">Amount</label>
        <input v-model="amount" type="number">
        <button @click.prevent="fetchCurrency">Submit</button>
    </form>
</template>