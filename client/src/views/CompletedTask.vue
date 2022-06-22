<template>
<div class="container">

  <table class="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">Sender</th>
    <th scope="col">Description</th>
    <th scope="col">Action</th>
  </tr>
</thead>
<tbody>
  <tr v-for="ticket in tickets" :key="ticket.id">
    <th scope="row">{{ticket.User.email}}</th>
    <td>{{ticket.description}}</td>
    <td><button @click="change(ticket.id)" >Set as in-progress</button></td>
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
            async fetchtickets(){
                try{
                    const tickets = await axios({
                        method: 'get',
                        url: 'https://iproject-herdi-server.herokuapp.com/completedtask',
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                    this.tickets = tickets.data.tickets

                }catch(err){
                    console.log(err)
                }
            },
            async change(ticketId){
                try{
                    await axios({
                        method:'patch',
                        url: `https://iproject-herdi-server.herokuapp.com/ticket/${ticketId}`,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        },
                        data: {
                            status: 'in-progress'
                        }
                    })
                    this.fetchtickets()
                }catch(err){

                }
            }
        },
        created(){
            this.fetchtickets()
        }
    }
</script>