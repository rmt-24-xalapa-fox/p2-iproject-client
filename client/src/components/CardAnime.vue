<template>
    <div class="rounded-xl shadow-lg">
        <div class="p-5 flex flex-col">
            <div class="rounded-xl overflow-hidden h-80">
                <a :href="anime.url">
                    <img :src="anime.imageUrl" alt="" class="h-full w-full" />
                </a>

            </div>
            <div class="h-20 items-center align-middle">
                <h5 class="text-xl md:text-2xl font-medium mt-3 h-full items-center text-anime">{{ anime.title }}</h5>

            </div>
            <div class="h-32 items-center">
                <p class="text-slate-500 text-lg mt-3 mb-1 ">{{ anime.synopsis }}</p>

            </div>
            <div class="h-5 items-center text-center">
                <p class="text-slate-700 text-sm mt-3 mb-5 bg-emerald-400 rounded h-5">Status : {{ anime.status }}</p>

            </div>
            <div class="h-10 items-center mt-2 text-center">
                <p class="text-blue-500 text-sm mt-3 mb-2 ">Score : {{ anime.score }}</p>

            </div>

            <div class="text-center bg-red-400 text-red-800 rounded h-7 align-middle ">

                <a :href="anime.trailer" alt="#" class="text-anime">Watch Trailer</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["anime"]
}
</script>

<style>
.text-anime {
    font-family: 'Kdam Thmor Pro', sans-serif
}
</style>