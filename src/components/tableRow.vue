<script>
// import { mapState, mapActions } from 'pinia'
// import { useNewsStore } from '../stores/news'

export default {
    name: "tableRow",
    props: {
        data: Object
    },
    computed: {
        // ...mapState(useNewsStore, [`addBookmark`]),
        dateFormat() {
            let date
            date = new Date(this.data.createdAt)
            return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());
        },
        mapLink(){
            return `https://www.google.com/maps/place/${this.data.latitude}, ${this.data.longitude}`
        }
    },
    methods: {
        toDetail() {
            this.$router.push(`/reports/${this.data.id}`)
        }
    }
}
</script>

<template>
    <tr class="whitespace-nowrap">
        <td class="px-6 py-4 text-sm text-gray-500">
            {{data.id}}
        </td>
        <td class="px-6 py-4">
            <div class="text-sm text-gray-900">
                {{data.User.email}}
            </div>
        </td>
        <td class="px-6 py-4">
            <div class="text-sm text-gray-500">{{ dateFormat }}</div>
        </td>
        <td class="px-6 py-4 text-sm text-gray-500">
            {{data.status}}
        </td>
        <td class="px-6 py-4">
            <a :href="mapLink" target="_blank" class="px-4 py-1 text-sm text-white bg-blue-400 rounded">View on Maps</a>
        </td>
        <td class="px-6 py-4">
            <a @click.prevent="toDetail()" href="#" class="px-4 py-1 text-sm text-white bg-blue-400 rounded">View Detail</a>
        </td>
    </tr>


</template>

<style scoped>
</style>