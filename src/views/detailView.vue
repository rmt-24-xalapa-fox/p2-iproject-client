<script>
import { BASE_URL } from "../base_url";
export default {
    name: "detailView",
    data() {
        return {
            reportDetail: {}
        }

    },
    methods: {
        async fetchDetail() {
            try {
                let id = this.$route.params.id
                let { data } = await axios({
                    method: `GET`,
                    headers: { access_token: localStorage.getItem(`access_token`) },
                    url: BASE_URL + `public/report/${id}`
                })
                this.reportDetail = data.data

            } catch (err) {
                console.log(err)
            }
        }
    },
    created() {
        this.fetchDetail()
    },
    computed: {
        dateFormat() {
            let date = new Date(this.reportDetail.createdAt)
            return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
        },
        // imgUrl(){
        //     return this.newsDetail.data.imgUrl
        // },
        mapLink() {
            return `https://www.google.com/maps/place/${this.reportDetail.latitude}, ${this.reportDetail.longitude}`
        }
    }
}
</script>

<template>

    <body>
        <div class="bg-gray-100 min-w-screen">
            <div class="max-w-screen-xl mx-auto">
                <main class="mt-10">
                    <div>
                        <div>
                            <div class="flex flex-col bg-gray-100 md:flex-row md:space-x-2 px-2 lg:p-0"><span
                                    class="mb-4 md:mb-0 w-full md:w-2/3 relative rounded inline-block"
                                    style="height: 30em;">
                                    <div class="absolute left-0 bottom-0 w-full h-full z-10 image-shadow"></div><img
                                        :src="reportDetail.imageUrl"
                                        class="absolute left-0 top-0 w-full h-full rounded z-0 object-cover">
                                    <div class="p-4 absolute bottom-0 left-0 z-20"><span
                                            class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">Status:
                                            {{ reportDetail.status }}</span>

                                    </div>
                                </span>
                                <div class="bg-white shadow-lg p-3 w-full">
                                    <div class="text-lg font-bold text-gray-800 mb-2"> Report Detail
                                    </div>
                                    <p class="text-gray-700">Report ID: {{ reportDetail.id }}</p>
                                    <p class="text-gray-700">Submitted by: {{ reportDetail.User.email }}</p>
                                    <p class="text-gray-700">Submitted at: {{ dateFormat }}</p>
                                    <p class="text-gray-700">Description: </p>
                                    <p class="text-gray-700">"{{ reportDetail.description }}" </p>
                                    <br>
                                    <p class="text-gray-700">Reply from admin: </p>
                                    <p class="text-gray-700">"{{ reportDetail.respMessage }}" </p>
                                    <br>
                                    <a :href="mapLink" target="_blank"
                                        class="px-4 py-1 text-sm text-white bg-blue-400 rounded">View on Google Maps</a>

                                    <div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    </body>



</template>

<style scoped>
</style>