<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-gray-100 p-8 rounded-2xl shadow-lg max-w-md flex flex-col items-center">
      <!-- Login heading -->
      <h1 class="text-3xl font-bold mb-6 text-gray-800 w-1/2 text-center">Login</h1>

      <!-- Form container -->
      <form @submit.prevent="handleLogin" class="space-y-5 w-1/2">
        <!-- Username input -->
        <div>
          <input
            type="text"
            v-model="username"
            placeholder="Username"
            class="w-full px-4 py-2 border border-gray-1300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="usernameError" class="text-red-500 text-sm mt-1">{{ usernameError }}</p>
        </div>

        <!-- Password input -->
        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
        </div>

        <!-- Error message -->
        <p v-if="loginError" class="text-red-600 text-sm text-center">{{ loginError }}</p>

        <!-- Submit button (normal width) -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </form>

      <!-- Register link -->
      <p class="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?
        <router-link to="/register" class="text-blue-500 hover:underline ml-1">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

const username = ref('');
const password = ref('');
const usernameError = ref('');
const passwordError = ref('');
const loginError = ref('');

const router = useRouter();
const store = useStore();

const handleLogin = async () => {
  usernameError.value = '';
  passwordError.value = '';
  loginError.value = '';

  // Basic client-side validation
  if (!username.value) usernameError.value = 'Username is required';
  if (!password.value) passwordError.value = 'Password is required';
  if (usernameError.value || passwordError.value) return;

  try {
    const response = await axios.post('http://localhost:3001/api/login', {
      username: username.value,
      password: password.value,
    });

    store.dispatch('login', response.data.user);
    router.push('/dashboard');
  } catch (error) {
    loginError.value = error.response?.data?.message || 'Login failed';
  }
};
</script>
