<script>
import { mapState, mapActions } from 'pinia'
import { useReportStore } from '../stores/report'
import tableRow from "../components/tableRow.vue";
import { BASE_URL } from '../base_url';
// import TableRow from "../components/tableRow.vue";

// import { useNewsStore } from '../stores/news'
// import newsList from "../components/newsList.vue";
// import newsCard from "../components/newsCard.vue";
export default {
    name: "reportFormView",
    components: {
        tableRow
    },
    data() {
        return {
            latitude: "",
            longitude: "",
            description: "",
            file: null,
            theFile: null
        }
    }
    ,
    computed: {
        // ...mapState(useNewsStore, [`bookmarks`]),
        ...mapState(useReportStore, [`reportFetched`])
    },
    mounted() {
        const success = (position) => {
            this.longitude = +position.coords.longitude
            this.latitude = +position.coords.latitude
            // console.log(typeof lang)
        }
        const error = () => {
            console.log(`error`)
        }
        navigator.geolocation.getCurrentPosition(success, error);

    },
    methods: {
        selectedFile(event) {
            // console.log(event)
            this.file = event.target.files[0]
            console.log(this.file)
        },
        ...mapActions(useReportStore, [`createHandler`]),
        async createHandler1() {

            const formData = new FormData();
            formData.append("image", this.file);


            let img = await axios.post(BASE_URL + 'public/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(img.data.imageUrl)

            this.createHandler({
                latitude: this.latitude,
                longitude: this.longitude,
                description: this.description,
                imageUrl: img.data.imageUrl
            })

        },

    }

}
</script>

<template>



    <body>
        <div class="bg-gray-100">
            <div class="max-w-screen-xl mx-auto">
                <header data-v-ffe520fa="" class="flex items-center justify-between py-2 border-b "></header>
                <main class="mt-0 mx-auto pt-5">
                    <h1 class="text-4xl font-bold pb-5 text-center">Create a New Report</h1>

                    <div class="flex items-center justify-center p-12">
                        <div class="mx-auto w-full max-w-[550px]">
                            <form action="https://formbold.com/s/FORM_ID" method="POST">
                                <div class="mb-5">
                                    <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                                        Location (the initial value is your current location)
                                    </label>
                                    <input v-model="latitude" type="text" placeholder="Latitude"
                                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    <input v-model="longitude" type="text" placeholder="Langitude"
                                        class=" w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                                <div class="mb-5">
                                    <label class="mb-3 block text-base font-medium text-[#07074D]">
                                        Image
                                    </label>
                                    <input @change="selectedFile" type="file" name="avatar"
                                        class=" text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />


                                </div>

                                <div class="mb-5">
                                    <label for="message" class="mb-3 block text-base font-medium text-[#07074D]">
                                        Description
                                    </label>
                                    <textarea v-model="description" rows="4"
                                        placeholder="Write a brief description regarding the condition"
                                        class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"></textarea>
                                </div>
                                <div>
                                    <button @click.prevent="createHandler1()"
                                        class="hover:shadow-form rounded-md bg-blue-400 py-3 px-8 text-base font-semibold text-white outline-none">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>



                </main>
            </div>
        </div>
    </body>





</template>

<style scoped>
</style>