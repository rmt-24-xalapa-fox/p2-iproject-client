<script>
import CardCoin from '@/components/CardCoin.vue'
import { mapActions,mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import axios from 'axios';

export default {
  props:{
    msg:String
  },
  data(){
    
    return{
    }
  },
  components: {
    CardCoin
  },
  computed: {
    ...mapWritableState(useCounterStore, ['coins','baseUrl','currentPages','totalPages'])
  },
  created(){
    this.populateCoin();
  },
  mounted(){
    
  },
  methods:{
    ...mapActions(useCounterStore, ['populateCoin','setError']),
    
  }

}
</script>

<template>

  <div class="container">
      
      <div class="row justify-content-start">
        <h1 v-if="coins.length==0">No Coin Price Yet</h1>
        <CardCoin v-for="coin in coins" :key="coin.id" :coin="coin"/>
      </div>
    </div>
</template>
