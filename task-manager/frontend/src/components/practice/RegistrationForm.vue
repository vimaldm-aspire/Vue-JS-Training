<template>
  <div class="p-4 max-w-md mx-auto border rounded-lg">
    <h2 class="text-xl font-bold mb-4">Registration Form</h2>

    <form @submit.prevent="validateForm">
      <!-- Name -->
      <div class="mb-4">
        <label>Name:</label>
        <input 
          type="text" 
          v-model="name" 
          class="border p-2 w-full mt-1"
        />
        <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
      </div>

      <!-- Email -->
      <div class="mb-4">
        <label>Email:</label>
        <input 
          type="text" 
          v-model="email" 
          class="border p-2 w-full mt-1"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <!-- Password -->
      <div class="mb-4">
        <label>Password:</label>
        <input 
          type="password" 
          v-model="password" 
          class="border p-2 w-full mt-1"
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </form>

    <!-- Success Message -->
    <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Form fields
const name = ref('')
const email = ref('')
const password = ref('')

// Errors object (reactive)
const errors = reactive({
  name: '',
  email: '',
  password: ''
})

const successMessage = ref('')

function validateForm() {
  // Reset previous errors
  errors.name = ''
  errors.email = ''
  errors.password = ''
  successMessage.value = ''

  let isValid = true

  // Name validation
  if (!name.value) {
    errors.name = 'Name is required.'
    isValid = false
  }

  // Email validation
  if (!email.value) {
    errors.email = 'Email is required.'
    isValid = false
  } else if (!isValidEmail(email.value)) {
    errors.email = 'Please enter a valid email address.'
    isValid = false
  }

  // Password validation
  if (!password.value) {
    errors.password = 'Password is required.'
    isValid = false
  }

  if (isValid) {
    successMessage.value = 'Registration successful!'
    console.log('Form Data:', {
      name: name.value,
      email: email.value,
      password: password.value
    })
  }
}

// Helper: Email validation function
function isValidEmail(emailStr) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(emailStr)
}
</script>

<style scoped>
/* Optional styling */
</style>
