<script>
// import { mapState, mapActions } from 'pinia'
// import { useNewsStore } from '../stores/news'
// import newsList from "../components/newsList.vue";

import { mapActions, mapState } from 'pinia'
import { useReportStore } from '../stores/report'

// import newsCard from "../components/newsCard.vue";
export default {
    name: "HomeView",
    data() {
        return {
            lang: Number,
            lat: Number

        }
    },
    components: {
        // newsList,
        // newsCard
    },
    computed: {
        // ...mapState(useNewsStore, [`bookmarks`]),
        ...mapState(useReportStore, [`reportFetched`])
    },
    methods: {
        ...mapActions(useReportStore, [`fetchData`]),
        fetchData1() {
            this.fetchData()

        },
        getPosition() {
            const success = (position) => {
                this.lang = +position.coords.longitude
                this.lat = +position.coords.latitude
                // console.log(typeof lang)
            }
            const error = () => {
                console.log(`error`)
            }
            navigator.geolocation.getCurrentPosition(success, error);

        }
    },
    async created() {


    },
    async mounted() {

        await this.fetchData()


        // if (navigator.geolocation) {
        //     let latlang = navigator.geolocation.getCurrentPosition();
        //     console.log(latlang)
        // } else {
        //     console.log("Geolocation is not supported by this browser.")
        // }
        let lang
        let lat

        // const success = (position) => {
        //     this.lang = +position.coords.longitude
        //     this.lat = +position.coords.latitude
        //     // console.log(typeof lang)
        // }
        // const error = () => {
        //     console.log(`error`)
        // }
        // navigator.geolocation.getCurrentPosition(success, error);


        // console.log(`ini di mounted`)
        await this.getPosition()


        let array = this.reportFetched.map(el => [el.longitude, el.latitude]);
        console.log(array)




        // let array = [
        //     [106.829518, -6.191861],
        //     [106.833332, -6.360749],
        //     [106.849567, -6.256975]
        // ]



        const urlParams = new URLSearchParams(window.location.search);
        const key = urlParams.get('key') || 'nfGZDd5YC7wANKt6hZ0J';

        const map = new maplibregl.Map({
            container: 'map', // container id
            style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`, // style URL
            center: [106.844598, -6.268134], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

        array.forEach(el => {
            const marker = new maplibregl.Marker()
                .setLngLat(el)
                .addTo(map);
        });

        // const marker = new maplibregl.Marker()
        //     .setLngLat([106.829518, -6.191861])
        //     .addTo(map);

        // const marker2 = new maplibregl.Marker()
        //     .setLngLat([106.833332, -6.360749])
        //     .addTo(map);


        map.on('error', function (err) {
            throw new Error("To load the map, you must replace YOUR_MAPTILER_API_KEY_HERE first");
        });
    }

}



</script>

<template>

    <body class="items-center text-center">
        <!-- <h1 class="text-2xl font-bold pt-10">Received Reports in Jabodetabek Area</h1> -->

        <h1 class="text-4xl font-bold pb-5 pt-10">Received Reports in Jabodetabek Area</h1>
        <div id="mapDiv">
            <div style="width: 870px; height: 400px;margin-left: 25%;margin-top: 10%; width: 50%;" id="map"></div>
        </div>
    </body>

    <!-- <body>
        <div class="bg-gray-100">
            <div class="max-w-screen-xl mx-auto text-center">
                <header data-v-ffe520fa="" class="flex items-center justify-between py-2 border-b "></header>
                <main class="mt-0 mx-auto pt-5">
                    <h1 class="text-4xl font-bold pb-5 ">Bookmarks</h1>
                    <div class="flex flex-col justify-center">

                        <h1>test</h1>

                        <div id="mapDiv">
                            <div width="870" height="400" style="width: 870px; height: 400px;" id="map"></div>
                        </div>


                    </div>
                </main>
            </div>
        </div>
    </body> -->
</template>

<style scoped>
#mapDiv {
    margin: 0;
    padding: 0;
}

#map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
}
</style>