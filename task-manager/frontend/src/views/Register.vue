<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg min-w-md">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Username -->
      <div>
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <p v-if="errors.username" class="text-sm text-red-600 mt-1">{{ errors.username }}</p>
      </div>

      <!-- Password -->
      <div>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <p v-if="errors.password" class="text-sm text-red-600 mt-1">{{ errors.password }}</p>
      </div>

      <!-- Role -->
      <div>
        <select
          v-model="role"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option disabled value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="developer">Developer</option>
          <option value="qa">QA</option>
        </select>
        <p v-if="errors.role" class="text-sm text-red-600 mt-1">{{ errors.role }}</p>
      </div>


        <button
          type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Register
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/" class="text-blue-600 hover:underline ml-1">Login here</router-link>
      </p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const role = ref('');
const router = useRouter();

// Validation error messages
const errors = ref({
  username: '',
  password: '',
  role: '',
});

const handleRegister = async () => {
  // Reset errors
  errors.value = { username: '', password: '', role: '' };

  // Inline validation
  let hasError = false;
  if (!username.value.trim()) {
    errors.value.username = 'Username is required';
    hasError = true;
  }
  if (!password.value.trim()) {
    errors.value.password = 'Password is required';
    hasError = true;
  }
  if (!role.value) {
    errors.value.role = 'Please select a role';
    hasError = true;
  }

  if (hasError) return;

  // Submit if no validation error
  try {
    await axios.post('http://localhost:3001/api/register', {
      username: username.value,
      password: password.value,
      role: role.value,
    });
    router.push('/');
  } catch (error) {
    errors.value.username = error.response?.data?.message || 'Registration failed';
  }
};

</script>
