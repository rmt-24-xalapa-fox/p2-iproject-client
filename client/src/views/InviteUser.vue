<template>
    <div class="container">
      <div class="border w-50 p-5 mx-auto">
        <h2 class="text-center mb-3">Invite User</h2>
        <form @submit.prevent="inviteuser()">
          <div class="mb-3">
            <label for="course" class="form-label">Recipient</label>
            <div>
                <input type="text" style="width: 100%;" v-model="email" />
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
            return {
                email: ''
            }
        },
        methods: {
            async inviteuser(){
                try{
                    await axios({
                        method: 'post',
                        url: 'https://iproject-herdi-server.herokuapp.com/sendinvite',
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        },
                        data: {
                            email: this.email
                        }
                    })
                    this.$router.push('/users')
                }catch(err){
                    console.log(err)
                }
            }
        }
    }
</script>