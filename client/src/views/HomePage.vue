<script>
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    name: "HomePage",
    computed: {
        ...mapState(useCounterStore, ["gameNews", "rentalans"])
    },
    methods: {
        ...mapActions(useCounterStore, ["fetchGame", "fetchRentalan"])
    },
    created() {
        this.fetchGame()
        this.fetchRentalan()
    }
}
</script>

<template>

    <div class="container">
        <div class="row image">
            <div class="col-2">
                <img src="../assets/img/Aliens-vs-Predator.jpg">
            </div>
            <div class="col-2">
                <img src="../assets/img/Assassins-Creed-II.jpg">
            </div>
            <div class="col-2">
                <img src="../assets/img/battle field.jpg">
            </div>
            <div class="col-2">
                <img src="../assets/img/fifa ps5.jpg">
            </div>
            <div class="col-2">
                <img src="../assets/img/gta v.jpg">
            </div>
            <div class="col-2">
                <img src="../assets/img/pes 2021 ps4.jpg">
            </div>
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
                                    <img src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
                                        alt="Trendy Pants and Shoes" class="img-fluid rounded-start" />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ rentalan.name }}</h5>
                                        <p class="card-text">
                                            {{ rentalan.address }}
                                        </p>
                                        <p class="card-text">
                                            <small class="text-muted">{{ rentalan.phone }}</small>
                                        </p>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-secondary">Info</button>
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
    margin-left: 10px;
    display: flex;
    flex-direction: row;
}

img {
    height: 150px;
    widows: 100px;
    margin: 10px
}
</style>