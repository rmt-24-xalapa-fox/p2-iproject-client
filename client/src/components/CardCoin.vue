<script>
import axios from 'axios';

import { mapActions,mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  props: {
    coin:Object,
    msg:String
  },
  data(){
    return{
      text:"Favourite",
      coindata:{},
      hovered:false,
    }
  },
  computed: {
    ...mapWritableState(useCounterStore, ['baseUrl','basegetLink','buyCoin'])
  },
  mounted(){
    
  },
  methods:{
    ...mapActions(useCounterStore, ['doBuyCoin','setError']),
    getLinkForCoin(){
      console.log("Coin price id " + this.coin.id);
      this.doBuyCoin(this.coin.id)
    }
  }
}
</script>

<template>
        <div class="col-12 col-md-4">
          <div class="card mb-3">
            <div class="card-body card-body">
              <h5 class="card-title">{{coin.coinAmmount}} Coin</h5>
              <label ><small class="text-muted">Price:</small></label><p class="card-text">Rp.{{coin.price}},-</p>
      
              
              <!-- <label><small class="text-muted">Genre:</small></label>
                <button class="btn btn-secondary" v-for="genre in movie.MovieGenres" :key="genre.GenreId">{{genre.Genre.name}}</button> -->
              </div>
              <button @click="getLinkForCoin">Buy Coin</button>
            </div>
            
          </div>
</template>
