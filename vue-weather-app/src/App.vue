<template>
  <div class="app">
    <h1>🌤️ Simple Weather App</h1>
    <input v-model="city" @keyup.enter="fetchWeather" placeholder="Enter city name" />
    <button @click="fetchWeather">Get Weather</button>
    <WeatherCard v-if="weatherData?.main" :weather="weatherData" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WeatherCard from './components/WeatherCard.vue'

const city = ref('')
const weatherData = ref(null)

const apiKey = '09ad1fc6f0015e60375bbbf901fd8fdb'

async function fetchWeather() {
  if (!city.value) return
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`
  )
  weatherData.value = await response.json()
}
</script>

<style scoped>
.app {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  text-align: center;
}
input {
  padding: 0.5rem;
  width: 60%;
}
button {
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
}
</style>
