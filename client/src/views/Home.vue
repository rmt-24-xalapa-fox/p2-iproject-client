<script>
</script>
<script setup>
import {ref, onMounted} from 'vue'
const transcript = ref('')
const isRecording = ref(false)

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()
onMounted(() => {
	sr.continuous = true
	sr.interimResults = true
	sr.onstart = () => {
		console.log('SR Started')
		isRecording.value = true
	}
	sr.onend = () => {
		console.log('SR Stopped')
		isRecording.value = false
	}
	sr.onresult = (evt) => {
		for (let i = 0; i < evt.results.length; i++) {
			const result = evt.results[i]
			if (result.isFinal) CheckForCommand(result)
		}
		const t = Array.from(evt.results)
			.map(result => result[0])
			.map(result => result.transcript)
			.join('')
		
		transcript.value = t
	}
})
const CheckForCommand = (result) => {
	const t = result[0].transcript;
	if (t.includes('stop recording')) {
		sr.stop()
	} else if (
		t.includes('what is the time') ||
		t.includes('what\'s the time')
	) {
		sr.stop()
		alert(new Date().toLocaleTimeString())
		setTimeout(() => sr.start(), 100)
	}
}
const ToggleMic = () => {
	if (isRecording.value) {
		sr.stop()
	} else {
		sr.start()
	}
}
</script>


<template>
    <main id="Home-page">

        <form>
            <input type="text" placeholder="Search for an anime..." :value='transcript'/>
            <button type="submit" class="button">Search</button>
             <a href="#" @click.prevent="ToggleMic">
                 <span class="material-icons mt-2 ml-2 ">settings_voice</span>
                 </a>
                
        </form>
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
    background-image: linear-gradient(to left, rgb(50, 221, 255) 50%, rgb(31, 40, 90) 50%);
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