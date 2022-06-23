<script>
import Navbar from "./components/Navbar.vue";
import { mapActions } from "pinia";
import { useMainStore } from "./stores/main";

export default {
    components: {
        Navbar
    },
    created: function () {
        if (localStorage.getItem("access_token")) {
            this.setHasLoggedIn(true)
        }
    },
    methods: {
        ...mapActions(useMainStore, ["setHasLoggedIn"])
    }
}
</script>
<template>
    <Navbar />
    <router-view />
</template>