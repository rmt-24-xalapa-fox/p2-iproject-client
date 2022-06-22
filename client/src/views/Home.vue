<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMainStore } from '../stores/main'
import CardAnime from '../components/CardAnime.vue'
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()
export default {
    components: {
        CardAnime
    },
    computed: {
        ...mapState(useMainStore, ["animes"]),
        ...mapWritableState(useMainStore, ["currentPage", "sizePage"])
    },
    methods: {
        ...mapActions(useMainStore, ["getSeasonAnime", "getAnime"]),
        CheckForCommand(result) {
            const t = result[0].transcript;
            if (t.includes('looking for ')) {
                this.getAnime(this.query.slice(12))
                sr.stop()
            }
        },
        ToggleMic() {
            if (this.isRecording) {
                sr.stop();
            } else {
                sr.start();
            }
        },
        searchAnime: function () {
            this.getAnime(this.query)
            this.sizePage = 16
        }

    },
    created: function () {
        this.getSeasonAnime()
        this.getAnime(this.query)
        this.sizePage = 16
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
        },
            this.getAnime(this.query)
        window.addEventListener("scroll", () => {

            let scrollTop = document.documentElement.scrollTop;
            let scrollHeight = document.documentElement.scrollHeight;
            let clientHeight = document.documentElement.clientHeight;
            if (scrollTop + clientHeight >= scrollHeight - 20) {
                this.sizePage += 16
                this.getAnime(this.query)
            }
        })

    }
}
</script>


<template>
    <main id="Home-page">

        <form @submit.prevent="searchAnime">
            <input type="text" placeholder="Search for an anime..." v-model="query" />
            <button type="submit" class="button">Search</button>
            <a href="#" @click.prevent="ToggleMic">
                <span class="material-icons mt-2 ml-2 ">settings_voice</span>
            </a>

        </form>

        <div class="bg-white rounded">
   
            <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div>
                    <p class="text-5xl mb-10 text-red-900 text-center text-anime">Anime Database</p>
                </div>
                <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <CardAnime v-for="(anime, i) in animes" key="i" :anime="anime" />
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

.text-anime{
font-family: 'Kdam Thmor Pro', sans-serif
}
</style>