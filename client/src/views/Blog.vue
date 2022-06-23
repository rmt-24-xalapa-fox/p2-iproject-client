

<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useIndexStore } from '../stores'
export default {
    methods: {
        ...mapActions(useIndexStore, ["fetchBlog"]),
    },
    computed: {
        ...mapState(useIndexStore, ["blogs"]),
    },
    created() {
        this.fetchBlog()
    }
}
</script>

<template>
    <div class="row" style="margin-bottom: 100px; margin-top:100px; margin-left:140px">
        <div class="blog-page">
            <div class="col-xs-12 col-sm-9 col-md-9 rht-col" >
                <div class="blog-post  wow fadeInUp" v-for="(blog, i) in blogs" :key="i">
                    <a href="blog-details.html"><img class="img-responsive" :src="blog.urlToImage" alt=""></a>
                    <h1><a href="blog-details.html">{{blog.title}}</a>
                    </h1>
                    <span class="author">{{ blog.author }}</span>
                    <span class="date-time">{{ blog.publishedAt.substring(0, 10) }}</span>
                    <p>{{blog.description}}</p>
                    <a href="#" class="btn btn-upper btn-primary read-more">read more</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>