<script>
import CardWishlist from "../components/CardWishlist.vue";
import { mapState, mapActions } from "pinia";
import { useMainStore } from "../stores/main";
export default {
    components: {
        CardWishlist
    },
    methods: {
        ...mapActions(useMainStore, ['getAllWishlists']),
        fetchWishlists: function () {
            this.getAllWishlists()
        }
    },
    created: function () {
        this.fetchWishlists()
    },
    computed: {
        ...mapState(useMainStore, ['wishlists'])
    }
}
</script>
<template>
    <nav>
        <div class="container mt-5 rounded">
            <div class="row text-center" style="background-color: transparent; margin: 0px">
                <h2 class="navbar-text text-center" style="font-family: 'Montserrat Alternates', sans-serif;">
                    WISHLIST
                </h2>
            </div>
        </div>
    </nav>
    <div class="container mt-5">
        <div class="row">
            <div class="col">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <CardWishlist v-for="wishlist in wishlists" :key="wishlist.id" :wishlist="wishlist" />
                </div>
            </div>
        </div>
    </div>
</template>