<template>
    <div class="container">
      <div class="border w-50 p-5 mx-auto">
          <div class="mb-3">
            <label for="course" class="form-label">Your account is inactive click <a :href="paymentlink">Here</a> to proceed to payment</label>
          </div>
      </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default{
        data(){
            return {
                paymentlink: ''
            }
        },
        async created(){
            try{

                const paymentlink = await axios({
                    method: 'get',
                    url: 'https://iproject-herdi-server.herokuapp.com/getpaymentlink',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                console.log(paymentlink)
            }catch(err){
                console.log(err)
            }
        }
    }
</script>