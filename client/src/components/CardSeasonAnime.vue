<template>
    <div class="rounded-xl shadow-lg">
        <div class="p-5 flex flex-col">
            <div class="rounded-xl overflow-hidden h-96">
                <a :href="anime.url">
                    <img :src="anime.imageUrl" alt="" class="h-full" />
                </a>

            </div>
            <div class="h-20 items-center align-middle">
                <h5 class="text-2xl md:text-3xl font-medium mt-3 h-full items-center">{{ anime.title }}</h5>
                
            </div>
            <div class="h-30 items-center">
                <p class="text-slate-500 text-lg mt-3 mb-2">{{anime.synopsis}}</p>

            </div>

            <div class="text-center bg-red-400 text-red-800 rounded h-7 align-middle">
                
                <a :href="anime.trailer" alt="#" >Watch Trailer</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["anime"]
}
</script>