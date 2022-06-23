<script>
import { mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
import Header from "../components/Header.vue";
import Card from "../components/Card.vue";
export default {
    name: "Home",
    components: {
        Header,
        Card
    },
    computed: {
        ...mapState(useCounterStore, ['getData', 'dataProduct'])
    },
    created() {
        this.getData();
    }
};
</script>
<template>
    <div style="background-color:darkslategrey; height: 100vh;">
        <div>
            <Header />
        </div>
        <div class="container row">
            <Card v-for="data in dataProduct" :key="id" :data="data" />
        </div>
    </div>
</template>
<style>
</style>
