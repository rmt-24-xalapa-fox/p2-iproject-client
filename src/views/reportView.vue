<script>
import { mapState, mapActions } from 'pinia'
import { useReportStore } from '../stores/report'
import tableRow from "../components/tableRow.vue";
// import TableRow from "../components/tableRow.vue";

// import { useNewsStore } from '../stores/news'
// import newsList from "../components/newsList.vue";
// import newsCard from "../components/newsCard.vue";
export default {
    name: "reportView",
    components: {
        tableRow
    },
    computed: {
        // ...mapState(useNewsStore, [`bookmarks`]),
        ...mapState(useReportStore, [`reportFetched`]),
        ...mapState(useReportStore, [`myReport`]),
    },
    created(){
        console.log(this.$route.name)
    }

}
</script>

<template>
<!-- <h1 v-if="$route.name==='reports'" >repo</h1>
<h1 v-if="$route.name==='myreports'" >myrepo</h1> -->

    <body>
        <div class="bg-gray-100">
            <div class="max-w-screen-xl mx-auto">
                <header data-v-ffe520fa="" class="flex items-center justify-between py-2 border-b "></header>
                <main class="mt-0 mx-auto pt-5">
                    <h1 v-if="$route.name==='reports'" class="text-4xl font-bold pb-5 text-center">Report List</h1>
                    <h1 v-if="$route.name==='myreports'" class="text-4xl font-bold pb-5 text-center">My Reports</h1>


                    <div class="container flex justify-center mx-auto">
                        <div class="flex flex-col">
                            <div class="w-full">
                                <div class="border-b border-gray-200 shadow">
                                    <table>
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th class="px-6 py-2 text-xs text-gray-500">
                                                    ID
                                                </th>
                                                <th class="px-6 py-2 text-xs text-gray-500">
                                                    Submitted By
                                                </th>
                                                <th class="px-6 py-2 text-xs text-gray-500">
                                                    Submitted At
                                                </th>
                                                <th class="px-6 py-2 text-xs text-gray-500">
                                                    Description
                                                </th>
                                                <th class="px-6 py-2 text-xs text-gray-500">
                                                    Location
                                                </th>
                                                <th class="px-6 py-2 text-xs text-gray-500">
                                                    Report Detail
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">

                                            <tableRow v-if="$route.name==='reports'" v-for="el in reportFetched" :data="el" />
                                            <tableRow v-if="$route.name==='myreports'" v-for="el in myReport" :data="el" />


                                        </tbody>
                                    </table>
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