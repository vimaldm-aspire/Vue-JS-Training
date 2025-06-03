<template>
  <div class="p-6">
    <!-- Header & Controls -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
      <h2 class="text-2xl font-bold">User List</h2>
      <div class="flex space-x-2">
        <input v-model="searchQuery" placeholder="Search username..." class="border px-3 py-2 rounded" />
        <select v-model="filterRole" class="border px-3 py-2 rounded">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button @click="openModal()" class="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
      </div>
    </div>

    <!-- Table -->
    <table class="min-w-full bg-white shadow-md rounded">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="py-2 px-4">Username</th>
          <th class="py-2 px-4">Role</th>
          <th class="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id" class="border-t">
          <td class="py-2 px-4">{{ user.username }}</td>
          <td class="py-2 px-4 capitalize">{{ user.role }}</td>
          <td class="py-2 px-4">
            <button @click="openModal(user)" class="bg-yellow-400 px-3 py-1 rounded mr-2">Edit</button>
            <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </td>
        </tr>
        <tr v-if="paginatedUsers.length === 0">
          <td colspan="3" class="text-center py-4 text-gray-500">No users found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="mt-4 flex justify-center space-x-2">
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="px-3 py-1 border rounded"
      >Prev</button>
      <span class="px-3 py-1">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        class="px-3 py-1 border rounded"
      >Next</button>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white rounded p-6 w-full max-w-md relative">
        <h3 class="text-xl font-semibold mb-4">{{ form.id ? 'Edit User' : 'Add User' }}</h3>
        <input v-model="form.username" placeholder="Username" class="w-full border px-3 py-2 rounded mb-3" />
        <input v-model="form.password" placeholder="Password" type="password" class="w-full border px-3 py-2 rounded mb-3" />
        <select v-model="form.role" class="w-full border px-3 py-2 rounded mb-4">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <div class="flex justify-end space-x-2">
          <button @click="closeModal" class="bg-gray-400 px-4 py-2 rounded">Cancel</button>
          <button @click="saveUser" class="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      showModal: false,
      form: { id: null, username: '', password: '', role: 'user' },
      searchQuery: '',
      filterRole: '',
      currentPage: 1,
      itemsPerPage: 5
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
      if (this.form.id) {
        await this.updateUser(this.form);
      } else {
        await this.addUser(this.form);
      }
      this.closeModal();
      this.currentPage = 1;
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
