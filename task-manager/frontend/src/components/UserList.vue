<template>
  <div>
    <!-- Main content -->
    <div class="p-6">
      <!-- Header & Controls -->
      <div class="flex justify-between items-center mb-4">
        <!-- User List Title (left-aligned) -->
        <h2 class="text-2xl font-bold">User List</h2>

        <!-- Controls Section (Add User, Go to Dashboard, and Login aligned to the center and right) -->
        <div class="flex space-x-4 items-center">
          <!-- Add User Button -->
          <button
            @click="openModal()"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add User
          </button>

          <!-- Go to Dashboard Link -->
          <router-link
            to="/dashboard"
            class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Go to Dashboard
          </router-link>
          <Navbar />
        </div>
      </div>

      <!-- Filters Section (below the main header) -->
      <Accordion title="Filter Options">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <input
            v-model="searchQuery"
            placeholder="Search username..."
            class="border px-3 py-2 rounded w-1/3"
          />
          <select v-model="filterRole" class="border px-3 py-2 rounded w-1/3">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="developer">Developer</option>
            <option value="qa">QA</option>
          </select>
        </div>
      </Accordion>

      <!-- Table -->
      <table class="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="p-1 border border-gray-300">Username</th>
            <th class="p-1 border border-gray-300">Role</th>
            <th class="p-1 border border-grey-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" class="border-t">
            <td class="p-1 border border-gray-300">{{ user.username }}</td>
            <td class="p-1 border border-gray-300 capitalize">
              {{ user.role }}
            </td>
            <td class="p-1 border border-gray-300">
              <button
                @click="openModal(user)"
                class="bg-yellow-400 px-3 py-1 rounded mr-2 !important"
              >
                Edit
              </button>
              <button
                @click="deleteUser(user.id)"
                class="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="paginatedUsers.length === 0">
            <td colspan="3" class="text-center py-4 text-gray-500">
              No users found.
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="mt-4 flex justify-center space-x-2">
        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
          class="px-3 py-1 border rounded"
        >
          Prev
        </button>
        <span class="px-3 py-1"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
        <button
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          class="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal OUTSIDE the .p-6 div -->
    <div
      v-if="showModal"
      class="modal-overlay fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="modal-box bg-white rounded p-6 w-full max-w-md relative z-50">
        <h3 class="text-xl font-semibold mb-4">
          {{ form.id ? 'Edit User' : 'Add User' }}
        </h3>
        <input
          v-model="form.username"
          placeholder="Username"
          class="w-full border px-3 py-2 rounded mb-1"
        />
        <p v-if="formErrors.username" class="text-red-500 text-sm mb-2">
          {{ formErrors.username }}
        </p>

        <input
          v-model="form.password"
          placeholder="Password"
          type="password"
          class="w-full border px-3 py-2 rounded mb-1"
        />
        <p v-if="formErrors.password" class="text-red-500 text-sm mb-2">
          {{ formErrors.password }}
        </p>

        <select
          v-model="form.role"
          class="w-full border px-3 py-2 rounded mb-1"
        >
          <option disabled value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="developer">Developer</option>
          <option value="qa">QA</option>
        </select>
        <p v-if="formErrors.role" class="text-red-500 text-sm mb-2">
          {{ formErrors.role }}
        </p>

        <div class="flex justify-end space-x-2">
          <button @click="closeModal" class="bg-gray-400 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            @click="saveUser"
            class="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import Navbar from '@/components/Navbar.vue';
    import Accordion from '@/components/Accordion.vue';

    export default {
    components: {
    Navbar,
    Accordion
    },

    data() {
    return {
        showModal: false,
        form: { id: null, username: '', password: '', role: '' },
        formErrors: {},
        searchQuery: '',
        filterRole: '',
        currentPage: 1,
        itemsPerPage: 10
    };
    },

  computed: {
    ...mapState(['users']),
    filteredUsers() {
      return this.users
        .filter(user => user.username.toLowerCase().includes(this.searchQuery.toLowerCase()))
        .filter(user => this.filterRole ? user.role === this.filterRole : true);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredUsers.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage) || 1;
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'addUser', 'updateUser', 'deleteUser']),
    openModal(user = { id: null, username: '', password: '', role: 'user' }) {
      this.form = { ...user };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
async saveUser() {
  this.formErrors = {};

  if (!this.form.username.trim()) {
    this.formErrors.username = 'Username is required.';
  }
  if (!this.form.password.trim()) {
    this.formErrors.password = 'Password is required.';
  }
  if (!this.form.role) {
    this.formErrors.role = 'Role is required.';
  }

  if (Object.keys(this.formErrors).length > 0) {
    return; // Don't proceed if there are errors
  }

  if (this.form.id) {
    await this.updateUser(this.form);
  } else {
    await this.addUser(this.form);
  }

  this.closeModal();
  this.currentPage = 1;
},

    async deleteUser(userId) {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (confirmed) {
        await this.$store.dispatch('deleteUser', userId);
        }
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    filterRole() {
      this.currentPage = 1;
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
