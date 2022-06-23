<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter'

export default {
    name: "Filter",
    methods: {
        ...mapActions(useCounterStore, ["fetchRentalanById"]),
        runFilter(type) {
            this.$router.push(`?filter=${type}`)
            this.fetchRentalanById(this.$route.id, this.$route.query)
        }
    }
}
</script>

<template>
    <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
        <input @click.prevent="runFilter('PS3')" type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck1">PS 3</label>

        <input @click.prevent="runFilter('PS4')" type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck2">PS 4</label>

        <input @click.prevent="runFilter('PS5')" type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
        <label class="btn btn-outline-primary" for="btncheck3">PS 5</label>
    </div>
</template>