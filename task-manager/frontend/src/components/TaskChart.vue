<template>
  <div class="p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-2">Task Status Overview</h2>
    <p class="text-gray-600 mb-4">Total Tasks: <span class="font-semibold">{{ totalTasks }}</span></p>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
});

// Grouped status counts
const statusCounts = computed(() => {
  const counts = {
    Todo: 0,
    'In Progress': 0,
    Done: 0
  };

  props.tasks.forEach(task => {
    if (counts[task.status] !== undefined) {
      counts[task.status]++;
    }
  });

  return counts;
});

// Total task count
const totalTasks = computed(() => props.tasks.length);

// Chart data
const chartData = computed(() => ({
  labels: Object.keys(statusCounts.value),
  datasets: [
    {
      label: 'Number of Tasks',
      data: Object.values(statusCounts.value),
      backgroundColor: ['#facc15', '#3b82f6', '#10b981']
    }
  ]
}));

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    title: { display: false }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 }
    }
  }
};
</script>
