<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/main'
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()
export default {
    methods: {
        ...mapActions(useMainStore, ["getSeasonAnime"]),
        CheckForCommand(result) {
            const t = result[0].transcript;
            if (t.includes('stop recording')) {
                sr.stop();
            } else if (t.includes('what is the time') ||
                t.includes('what\'s the time')) {
                sr.stop();
                alert(new Date().toLocaleTimeString());
                setTimeout(() => sr.start(), 100);
            }
        },
        ToggleMic() {
            if (this.isRecording) {
                sr.stop();
            } else {
                sr.start();
            }
        }

    },
    created: function () {
        this.getSeasonAnime()
    },
    data() {
        return {
            query: "",
            isRecording: false
        }
    },
    mounted: function () {
        sr.continuous = true
        sr.interimResults = true
        sr.onstart = () => {
            console.log('SR Started')
            this.isRecording = true
        }
        sr.onend = () => {
            console.log('SR Stopped')
            this.isRecording = false
        }
        sr.onresult = (evt) => {
            for (let i = 0; i < evt.results.length; i++) {
                const result = evt.results[i]
                if (result.isFinal) this.CheckForCommand(result)
            }
            const t = Array.from(evt.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')

            this.query = t
        }
    }
}
</script>


<template>
    <main id="Home-page">

        <form>
            <input type="text" placeholder="Search for an anime..." v-model="query" />
            <button type="submit" class="button">Search</button>
            <a href="#" @click.prevent="ToggleMic">
                <span class="material-icons mt-2 ml-2 ">settings_voice</span>
            </a>

        </form>

        <div class="bg-white rounded">
            <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

                <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <!-- CARD -->
                    <div class="rounded-xl shadow-lg">
                        <div class="p-5 flex flex-col">
                            <div class="rounded-xl overflow-hidden">
                                <img src="https://cdn.myanimelist.net/images/anime/1502/124354.jpg" alt="" />
                            </div>
                            <h5 class="text-2xl md:text-3xl font-medium mt-3">Hataraku Maou-sama!!</h5>
                            <p class="text-slate-500 text-lg mt-3 mb-2">Second season of Hataraku Maou-sama!</p>
                            <p class="text-slate-500 text-sm mt-3 mb-2">Score: 8.0</p>
                            <a href="https://www.youtube.com/embed/LxpTh8GKAL4?enablejsapi=1&wmode=opaque&autoplay=1"
                                alt="#" class="text-center bg-red-400 text-red-800 rounded h-7 align-middle">Watch
                                Trailer</a>
                        </div>
                    </div>
                    <div class="rounded-xl shadow-lg">
                        <div class="p-5 flex flex-col">
                            <div class="rounded-xl overflow-hidden">
                                <img src="https://cdn.myanimelist.net/images/anime/1502/124354.jpg" alt="" />
                            </div>
                            <h5 class="text-2xl md:text-3xl font-medium mt-3">Hataraku Maou-sama!!</h5>
                            <p class="text-slate-500 text-lg mt-3 mb-2">Second season of Hataraku Maou-sama!</p>
                            <p class="text-slate-500 text-sm mt-3 mb-2">Score: 8.0</p>
                            <a href="https://www.youtube.com/embed/LxpTh8GKAL4?enablejsapi=1&wmode=opaque&autoplay=1"
                                class="text-center bg-red-400 text-red-800 rounded h-7 align-middle">Watch Trailer</a>
                        </div>
                    </div>
                    <div class="rounded-xl shadow-lg">
                        <div class="p-5 flex flex-col">
                            <div class="rounded-xl overflow-hidden">
                                <img src="https://cdn.myanimelist.net/images/anime/1502/124354.jpg" alt="" />
                            </div>
                            <h5 class="text-2xl md:text-3xl font-medium mt-3">Hataraku Maou-sama!!</h5>
                            <p class="text-slate-500 text-lg mt-3 mb-2">Second season of Hataraku Maou-sama!</p>
                            <p class="text-slate-500 text-sm mt-3 mb-2">Score: 8.0</p>
                            <a href="https://www.youtube.com/embed/LxpTh8GKAL4?enablejsapi=1&wmode=opaque&autoplay=1"
                                class="text-center bg-red-400 text-red-800 rounded h-7 align-middle">Watch Trailer</a>
                        </div>
                    </div>
                    <div class="rounded-xl shadow-lg">
                        <div class="p-5 flex flex-col">
                            <div class="rounded-xl overflow-hidden">
                                <img src="https://cdn.myanimelist.net/images/anime/1502/124354.jpg" alt="" />
                            </div>
                            <h5 class="text-2xl md:text-3xl font-medium mt-3">Hataraku Maou-sama!!</h5>
                            <p class="text-slate-500 text-lg mt-3 mb-2">Second season of Hataraku Maou-sama!</p>
                            <p class="text-slate-500 text-sm mt-3 mb-2">Score: 8.0</p>
                            <a href="https://www.youtube.com/embed/LxpTh8GKAL4?enablejsapi=1&wmode=opaque&autoplay=1"
                                class="text-center bg-red-400 text-red-800 rounded h-7 align-middle">Watch Trailer</a>
                        </div>
                    </div>
                    <div class="rounded-xl shadow-lg">
                        <div class="p-5 flex flex-col">
                            <div class="rounded-xl overflow-hidden">
                                <img src="https://cdn.myanimelist.net/images/anime/1502/124354.jpg" alt="" />
                            </div>
                            <h5 class="text-2xl md:text-3xl font-medium mt-3">Hataraku Maou-sama!!</h5>
                            <p class="text-slate-500 text-lg mt-3 mb-2">Second season of Hataraku Maou-sama!</p>
                            <p class="text-slate-500 text-sm mt-3 mb-2">Score: 8.0</p>
                            <a href="https://www.youtube.com/embed/LxpTh8GKAL4?enablejsapi=1&wmode=opaque&autoplay=1"
                                class="text-center bg-red-400 text-red-800 rounded h-7 align-middle">Watch Trailer</a>
                        </div>
                    </div>
                    <div class="rounded-xl shadow-lg">
                        <div class="p-5 flex flex-col">
                            <div class="rounded-xl overflow-hidden">
                                <img src="https://cdn.myanimelist.net/images/anime/1502/124354.jpg" alt="" />
                            </div>
                            <h5 class="text-2xl md:text-3xl font-medium mt-3">Hataraku Maou-sama!!</h5>
                            <p class="text-slate-500 text-lg mt-3 mb-2">Second season of Hataraku Maou-sama!</p>
                            <p class="text-slate-500 text-sm mt-3 mb-2">Score: 8.0</p>
                            <a href="https://www.youtube.com/embed/LxpTh8GKAL4?enablejsapi=1&wmode=opaque&autoplay=1"
                                class="text-center bg-red-400 text-red-800 rounded h-7 align-middle">Watch Trailer</a>
                        </div>
                    </div>
                    <div class="rounded-xl shadow-lg">
                        <div class="p-5 flex flex-col">
                            <div class="rounded-xl overflow-hidden">
                                <img src="https://cdn.myanimelist.net/images/anime/1502/124354.jpg" alt="" />
                            </div>
                            <h5 class="text-2xl md:text-3xl font-medium mt-3">Hataraku Maou-sama!!</h5>
                            <p class="text-slate-500 text-lg mt-3 mb-2">Second season of Hataraku Maou-sama!</p>
                            <p class="text-slate-500 text-sm mt-3 mb-2">Score: 8.0</p>
                            <a href="https://www.youtube.com/embed/LxpTh8GKAL4?enablejsapi=1&wmode=opaque&autoplay=1"
                                class="text-center bg-red-400 text-red-800 rounded h-7 align-middle">Watch Trailer</a>
                        </div>
                    </div>
                    <div class="rounded-xl shadow-lg">
                        <div class="p-5 flex flex-col">
                            <div class="rounded-xl overflow-hidden">
                                <img src="https://cdn.myanimelist.net/images/anime/1502/124354.jpg" alt="" />
                            </div>
                            <h5 class="text-2xl md:text-3xl font-medium mt-3">Hataraku Maou-sama!!</h5>
                            <p class="text-slate-500 text-lg mt-3 mb-2">Second season of Hataraku Maou-sama!</p>
                            <p class="text-slate-500 text-sm mt-3 mb-2">Score: 8.0</p>
                            <a href="https://www.youtube.com/embed/LxpTh8GKAL4?enablejsapi=1&wmode=opaque&autoplay=1"
                                class="text-center bg-red-400 text-red-800 rounded h-7 align-middle">Watch Trailer</a>
                        </div>
                    </div>
                    <div class="rounded-xl shadow-lg">
                        <div class="p-5 flex flex-col">
                            <div class="rounded-xl overflow-hidden">
                                <img src="https://cdn.myanimelist.net/images/anime/1502/124354.jpg" alt="" />
                            </div>
                            <h5 class="text-2xl md:text-3xl font-medium mt-3">Hataraku Maou-sama!!</h5>
                            <p class="text-slate-500 text-lg mt-3 mb-2">Second season of Hataraku Maou-sama!</p>
                            <p class="text-slate-500 text-sm mt-3 mb-2">Score: 8.0</p>
                            <a href="https://www.youtube.com/embed/LxpTh8GKAL4?enablejsapi=1&wmode=opaque&autoplay=1"
                                class="text-center bg-red-400 text-red-800 rounded h-7 align-middle">Watch Trailer</a>
                        </div>
                    </div>
                    <div class="rounded-xl shadow-lg">
                        <div class="p-5 flex flex-col">
                            <div class="rounded-xl overflow-hidden">
                                <img src="https://cdn.myanimelist.net/images/anime/1502/124354.jpg" alt="" />
                            </div>
                            <h5 class="text-2xl md:text-3xl font-medium mt-3">Hataraku Maou-sama!!</h5>
                            <p class="text-slate-500 text-lg mt-3 mb-2">Second season of Hataraku Maou-sama!</p>
                            <p class="text-slate-500 text-sm mt-3 mb-2">Score: 8.0</p>
                            <a href="https://www.youtube.com/embed/LxpTh8GKAL4?enablejsapi=1&wmode=opaque&autoplay=1"
                                class="text-center bg-red-400 text-red-800 rounded h-7 align-middle">Watch Trailer</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>


<style scoped>
form {
    display: flex;
    max-width: 480px;
    margin: 0 auto 1.5rem;
}

form input {
    appearance: none;
    outline: none;
    border: none;
    background: white;

    display: block;
    color: #888;
    font-size: 1.125rem;
    padding: 0.5rem 1rem;
    width: 100%;
}

.button {
    appearance: none;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;

    display: block;
    padding: 0.5rem 1rem;
    background-image: linear-gradient(to left, rgb(165, 4, 42) 50%, rgb(90, 31, 31) 50%);
    background-size: 200%;
    color: white;
    font-size: 1.125rem;
    font-weight: bold;
    text-transform: uppercase;
    transition: 0.4s;
    border-radius: 10px;
}

.button:hover {
    background-position: right;
}
</style>