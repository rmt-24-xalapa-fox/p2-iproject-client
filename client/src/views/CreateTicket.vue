<template>
    <div class="container">
      <div class="border w-50 p-5 mx-auto">
        <h2 class="text-center mb-3">Create Ticket</h2>
        <form @submit.prevent="createticket()">
          <div class="mb-3">
            <label for="course" class="form-label">Description</label>
            <div>
                <textarea style="width: 100%; height: 200px;" v-model="description"></textarea>
            </div>
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
</template>
<script>
import axios from 'axios'

    export default{
        data(){
            return{
                description: ''
            }
        },
        methods: {
            async createticket(){
                await axios({
                    method: 'post',
                    url: 'https://iproject-herdi-server.herokuapp.com/ticket',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        userId: 1,
                        description: this.description
                    }
                })
            }
        }
    }
</script>