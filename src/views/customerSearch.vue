<script>
import navbar from '../components/navbar.vue'
import {useMainStore} from '../stores'
import {mapActions, mapState} from 'pinia'
export default {
    components: {navbar},
    data() {
        return {
            terms: '',
        }
    },
    methods: {
        ...mapActions(useMainStore, ['searchWiki']),
        initialsearch() {
            this.searchWiki('hair')
        },
        search() {
            if (!this.terms) {
                this.searchWiki('hair')
            } else {
                this.searchWiki(this.terms)
            }
        }
    },
    computed: {
        ...mapState(useMainStore, ['datas'])
    },
    created() {
        this.initialsearch()
    }
}
</script>
<template>
    <navbar/>
    <div style="text-align:center; margin-top:20px;">
        <input type="text" v-model="terms" placeholder="Search" style="margin-right: 20px">
        <button @click="search" class="btn btn-secondary">Search Hairstyle</button>
    </div> <br><br>
    <div v-if="datas.length === 0" style="text-align:center; margin-top: 50px">
        <p>Image not found</p>
    </div>

    <p v-for="data in datas" :key="data.id" style="text-align:center">
        <img :src='data.webformatURL'>
    </p>
</template>
<style>
</style>