<script>
import axios from 'axios'

export default {
    name: "CurrencyChanger",
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
                    this.result = result.result;
                    console.log(result)
                })
                .catch(error => console.log('error', error));
        }
    }

}
</script>

<template>

    <form class="top">
        <h3>Currency Changer if you need</h3>
        <div class="form-row">
            <div class="col">
                <label for="">From</label>
                <select v-model="from" id="inputState" class="form-control">
                    <option selected>Choose...</option>
                    <option value="USD">USD</option>
                    <option value="IDR">IDR</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>
            </div>
            <div class="col">
                <label for="">To</label>
                <select v-model="to" id="inputState" class="form-control">
                    <option selected>Choose...</option>
                    <option value="USD">USD</option>
                    <option value="IDR">IDR</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>
            </div>
            <div class="col">
                 <label for="">Amount</label>
                 <input v-model="amount" type="number" id="inputState" class="form-control">
            </div><br>
            <button class="btn btn-primary" @click.prevent="fetchCurrency">Submit</button>
        </div><br>
        <div>
            Result: <strong style="color:tomato">{{this.result}}</strong> 
        </div>
    </form>

    <table class="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">PS Type</th>
                    <th scope="col">Price per Hour</th>
                    <th scope="col">Price per Day</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>PS2</td>
                    <td>Rp 2000</td>
                    <td>Rp 20000</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>PS3</td>
                    <td>Rp 5000</td>
                    <td>Rp 50000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>PS4</td>
                    <td>Rp 8000</td>
                    <td>Rp 80000</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>PS5</td>
                    <td>Rp 15000</td>
                    <td>Rp 200000</td>
                </tr>

            </tbody>
        </table>
</template>

<style scoped>
.top {
    margin-top: 5rem;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
table {
    margin-top: 20px;
}

th, td {
  text-align: center;
}
</style>