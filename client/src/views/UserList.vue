<template>
<div class="container">

  <table class="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">Email</th>
    <th scope="col">Role</th>
    <th scope="col">Action</th>
  </tr>
</thead>
<tbody>
  <tr v-for="user in users" :key="user.id">
    <th scope="row">{{user.email}}</th>
    <td>{{user.role}}</td>
    <td><button @click="asignadmin(user.id)" v-if="user.role!=='admin'">Asign Admin</button></td>
  </tr>
</tbody>
</table>
</div>
</template>

<script>
import axios from 'axios'

    export default {
      data(){
        return {
          users: []
        }
      },
      methods: {
        async asignadmin(userId){
          try{
            await axios({
              method: 'patch',
              url: `https://iproject-herdi-server.herokuapp.com/users/${userId}`,
              headers: {
                access_token: localStorage.getItem('access_token')
              }
            })
            this.fetchuser()
          }catch(err){
            console.log(err)
          }
        },
        async fetchuser(){
          try{

            console.log('tes')
            const users = await axios({
              method: 'get',
              url: 'https://iproject-herdi-server.herokuapp.com/users',
              headers: {
                access_token: localStorage.getItem('access_token')
              }
            })
            this.users = users.data
          }catch(err){
            console.log(err)
          }
        }
      },
      created(){
        this.fetchuser()
      }
    }
</script>