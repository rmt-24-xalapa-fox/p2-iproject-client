<template>
    <Kanban :stages="stages" :blocks="blocks" @update-block="updateBlock"></Kanban>
</template>

<script>
    import axios from 'axios'
    import Kanban from '../components/Kanban.vue'
    export default{
        data(){
            return {
                stages: ['on-hold', 'in-progress', 'completed'],
                blocks: [],
            }
        },
        methods: {
            async updateBlock(id, status) {
                try{
                    this.blocks.find(b => b.id === Number(id)).status = status;
                    await axios({
                        method:'patch',
                        url: `https://iproject-herdi-server.herokuapp.com/ticket/${id}`,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        },
                        data: {
                            status
                        }
                    })
                }catch(err){

                }
            },
        },
        components: {Kanban},
        async created(){
            try{

                const blocks = await axios({
                    method: 'get',
                    url: 'https://iproject-herdi-server.herokuapp.com/task',
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                this.blocks=blocks.data.tickets
                console.log(blocks)
            }catch(err){
                console.log(err)
            }
        }
    }
</script>

<style>
    @import '../assets/kanban.scss';
</style>