<template>
<div class="container">

  <table class="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">Sender</th>
    <th scope="col">Description</th>
  </tr>
</thead>
<tbody>
  <tr v-for="ticket in tickets" :key="ticket.id">
    <th scope="row">{{ticket.User.email}}</th>
    <td>{{ticket.description}}</td>
  </tr>
</tbody>
</table>
</div>
</template>
<script>
import axios from 'axios'

    export default{
        data(){
            return {
                tickets: []
            }
        },
        methods: {
            async fetchticketlist(){
                try{
                    const tickets = await axios({
                        method: 'get',
                        url: 'https://iproject-herdi-server.herokuapp.com/ticket',
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                    this.tickets = tickets.data
                    console.log(this.tickets[0])
                }catch(err){
                    console.log(err)
                }
            }
        },
        created(){
            this.fetchticketlist()
        }
    }
</script>