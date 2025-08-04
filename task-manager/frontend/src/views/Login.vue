<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>

      <Form @submit="handleLogin" class="space-y-5 w-full">
        <!-- Username -->
        <div>
          <Field
            name="username"
            type="text"
            placeholder="Username"
            rules="required"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <ErrorMessage name="username" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Password -->
        <div>
          <Field
            name="password"
            type="password"
            rules="required"
            placeholder="Password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
        </div>

        <!-- Login error -->
        <p v-if="loginError" class="text-red-600 text-sm text-center">{{ loginError }}</p>

        <!-- Submit -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </Form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?
        <router-link to="/register" class="text-blue-500 hover:underline ml-1">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { ref } from 'vue';

// Setup rules
defineRule('required', required);
configure({
  generateMessage: (context) => {
    const messages: Record<string, string> = {
      required: `${context.field} is required`,
    };
    return messages[context.rule?.name!] || 'Invalid field';
  },
  validateOnInput: true,
});

const loginError = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async (values: { username: string; password: string }) => {
  loginError.value = '';

  const success = await authStore.login(values.username, values.password);
  if (success) {
    router.push('/dashboard');
  } else {
    loginError.value = 'Invalid username or password';
  }
};
</script>
