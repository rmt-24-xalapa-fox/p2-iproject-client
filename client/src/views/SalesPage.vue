<script>
import Table from "../components/Table.vue"
import { mapState, mapActions } from "pinia";
import { useCounter } from "../stores/store";

export default {
    name: "Sales",
    components: {
        Table
    },
    methods: {
        ...mapActions(useCounter, ["fetchAllSales"])
    },
    computed: {
        ...mapState(useCounter, ['sales'])
    },
    created() {
        this.fetchAllSales()
    }
}
</script>

<template>
    <div id="page">
        <div class="container-fluid col-10 align-items-center justify-content-between">
            <Table />
        </div>
    </div>
</template>

<style scoped>

#page {
  background-color: #023047;
  width: auto;
  height: 100vh;
  padding-top: 50px;
}

</style>