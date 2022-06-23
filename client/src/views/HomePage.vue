<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    name: "HomePage",
   
    computed: {
        ...mapState(useCounterStore, ["gameNews", "rentalans"]),
        ...mapWritableState(useCounterStore, ["isLogin"])
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchGame", "fetchRentalan"]),
        toDetail(id) {
            this.$router.push(`/rentalan/${id}`)
        }
    },
    created() {
        this.fetchGame()
        this.fetchRentalan()
        if(localStorage.getItem("access_token")) {
            this.isLogin = true
        }
    }
}
</script>

<template>
    <div class="container top">
        <div class="row image">
            <div class="col-2">
                <img src="../assets/img/Aliens-vs-Predator.jpg">
            </div>
            <div class="col-2">
                <img src="../assets/img/Assassins-Creed-II.jpg">
            </div>
            <div class="col-2">
                <img src="../assets/img/fifa-ps5.jpg">
            </div>
            <div class="col-2">
                <img src="../assets/img/battle-field.jpg">
            </div>
            <div class="col-2">
                <img src="../assets/img/gta-v.jpg">
            </div>
            <div class="col-2">
                <img src="../assets/img/pes-2021-ps4.jpg">
            </div>
            <!-- <div class="col-2">
                <img src="../assets/img/uncharted.jpg">
            </div>
            <div class="col-2">
                <img src="../assets/img/watch-dogs-ps4.jpg">
            </div> -->
        </div>
    </div>

    <div class="container">
        <div class="row">

            <div class="card col-4 .bg-light.bg-gradient" style="width: 18rem;">
                <h3 class="text-center my-4">Game News</h3>
                <div v-for="news in gameNews" :key="news.id" class="card-body">
                    <h5 class="card-title">{{ news.title }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ news.source }}</h6>
                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                        card's
                        content.</p> -->
                    <a href="#" class="card-link">{{ news.url }}</a>
                </div>
            </div>
            <!-- <div>

            </div> -->
            <div class="container my-4, col-8">
                <h3 class="text-center my-4">List Rentalan</h3>
                <div class="row">
                    <!-- Card -->
                    <div v-for="rentalan in rentalans" :key="rentalan.id">
                        <div class="card mb-3" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img :src="rentalan.iconImage"
                                        alt="icon" class="img-fluid rounded-start" />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ rentalan.name }}</h5>
                                        <p class="card-text">
                                            {{ rentalan.address }}
                                        </p>
                                        <p class="card-text">
                                            <small class="text-muted">Phone: {{ rentalan.phone }}</small>
                                        </p>
                                    </div>
                                </div>
                                <p v-if="!isLogin" class="btn btn-secondary">Login to see availability Unit</p>
                                <button v-if="isLogin" @click="toDetail(rentalan.id)" class="btn btn-dark-moon">Info</button>
                                
                            </div>
                        </div>
                    </div>
                    
                    <!-- Card -->

                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
template {
    display: flex;
    flex-direction: row;
}

img {
    height: 150px;
    widows: 100px;
    margin: 10px
}
.top {
    margin-top: 80px;
}
.btn-dark-moon {
    background: #141E30;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #fff;
    border: 3px solid #eee;
}


</style>