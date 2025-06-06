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
      backgroundColor: ['#facc15', '#3b82f6', '#10b981'],
      borderRadius: 12, // Rounded bars
      borderSkipped: false
    }
  ]
}));

// Chart options with tooltip and animation
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    title: { display: false },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw;
          const total = Object.values(statusCounts.value).reduce((a, b) => a + b, 0);
          const percent = ((value / total) * 100).toFixed(1);
          return `${context.label}: ${value} tasks (${percent}%)`;
        }
      }
    }
  },
  animation: {
    duration: 1000,
    easing: 'easeOutBounce'
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 }
    }
  },
  elements: {
    bar: {
      borderRadius: 12,
      borderSkipped: false
    }
  }
};
</script>
