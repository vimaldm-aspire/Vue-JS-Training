<!-- src/components/WeatherCard.vue -->
<template>
  <div class="weather-card" v-if="weather && weather.main && weather.weather">
    <h2>{{ weather.name }}</h2>
    <p>🌡️ {{ weather.main.temp }}°C</p>
    <p>☁️ {{ weather.weather[0].description }}</p>
  </div>
</template>

<script setup>
defineProps(['weather'])
</script>

<style scoped>
.weather-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  background: #e0f7fa;
}
</style>
