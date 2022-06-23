<script>
import { mapState, mapActions } from 'pinia'
import { useReportStore } from '../stores/report'

export default {
    name: "navbar",
    computed: {
        ...mapState(useReportStore, [`isLogin`]),
        ...mapState(useReportStore, [`displayEmail`]),
    },
    methods: {
        ...mapActions(useReportStore, [`logOut`]),
    },
}
</script>

<template>
    <header data-v-ffe520fa="" class="flex items-center justify-between py-2 border-b bg-white">
        <span class="text-xl uppercase font-bold text-black-800 pl-3">Lapor Pave</span>
        <ul v-if="!isLogin" class="inline-flex items-center">
            <li class="px-2 md:px-4">
                <router-link to="/" class="cursor-pointer font-semibold hover:text-indigo-700 text-black-700">
                    Home
                </router-link>
            </li>
            <li class="px-2 md:px-4">
                <router-link to="/login" class="cursor-pointer font-semibold hover:text-indigo-700 text-black-700">
                    Sign In
                </router-link>
            </li>
            <li class="px-2 md:px-4">
                <router-link to="/register" class="cursor-pointer font-semibold hover:text-indigo-700 text-black-700">
                    Sign Up
                </router-link>
            </li>
        </ul>

        <ul v-if="isLogin" class="inline-flex items-center">
            <li class="px-2 py-0.5 md:px-4 bg-slate-200 rounded">
                <P to="/" class=" text-black-700">
                    {{this.displayEmail}}
                </P>
            </li>
            <li class="px-2 md:px-4">
                <router-link to="/" class="cursor-pointer font-semibold hover:text-indigo-700 text-black-700">
                    Home
                </router-link>
            </li>
            <li class="px-2 md:px-4">
                <router-link to="/reports" class="cursor-pointer font-semibold hover:text-indigo-700 text-black-700">
                    View Reports
                </router-link>
            </li>
            <li class="px-2 md:px-4">
                <router-link to="/myreports" class="cursor-pointer font-semibold hover:text-indigo-700 text-black-700">
                    My Reports
                </router-link>
            </li>
            <li class="px-2 md:px-4">
                <router-link to="/createReport" class="cursor-pointer font-semibold hover:text-indigo-700 text-black-700">
                    Submit Report
                </router-link>
            </li>
            <li class="px-2 md:px-4">
                <router-link @click="logOut()" to="/" class="cursor-pointer font-semibold hover:text-indigo-700 text-black-700">
                    Sign Out
                </router-link>
            </li>
        </ul>
    </header>


</template>

<style scoped>
</style>