<script>
import CardSeasonAnime from '../components/CardSeasonAnime.vue'
import { mapState, mapActions } from 'pinia'
import { useMainStore } from '../stores/main'
export default {
    computed: {
        ...mapState(useMainStore, ["seasonAnime"])
    },
    methods: {
        ...mapActions(useMainStore, ["getSeasonAnime"])
    },
    created:function(){
        this.getSeasonAnime()
    },
    components: {
        CardSeasonAnime,
    }
}
</script>

<template>
    <div class="bg-white rounded w-full">
        <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div>
                <p class="text-5xl mb-20 text-red-900 text-center text-anime">Anime This Season (Summer-2022)</p>
            </div>
            <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <!-- CARD -->
            <CardSeasonAnime v-for="anime in seasonAnime" key="anime.id" :anime="anime" />
                
            </div>
        </div>

    </div>
</template>


<style scoped>
.text-anime{
font-family: 'Kdam Thmor Pro', sans-serif
}

</style>