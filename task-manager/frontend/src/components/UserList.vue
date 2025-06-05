<template>
  <div>
    <!-- Main content -->
    <div class="p-6">
      <!-- Header & Controls -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
        <h2 class="text-2xl font-bold">User List</h2>
        <div class="flex space-x-2">
          <input v-model="searchQuery" placeholder="Search username..." class="border px-3 py-2 rounded" />
          <select v-model="filterRole" class="border px-3 py-2 rounded">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="developer">Developer</option>
            <option value="qa">QA</option>
          </select>
          <button @click="openModal()" class="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
        </div>
      </div>

      <!-- Table -->
      <table class="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="p-3 border border-gray-300">Username</th>
            <th class="p-3 border border-gray-300">Role</th>
            <th class="p-3 border border-grey-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id" class="border-t">
            <td class="p-3 border border-gray-300">{{ user.username }}</td>
            <td class="p-3 border border-gray-300 capitalize">{{ user.role }}</td>
            <td class="p-3 border border-gray-300">
              <button @click="openModal(user)" class="bg-yellow-400 px-3 py-1 rounded mr-2 !important">Edit</button>
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
        <button :disabled="currentPage === 1" @click="currentPage--" class="px-3 py-1 border rounded">Prev</button>
        <span class="px-3 py-1">Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++" class="px-3 py-1 border rounded">Next</button>
      </div>
    </div>

    <!-- Modal OUTSIDE the .p-6 div -->
    <div
      v-if="showModal"
      class="modal-overlay fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="modal-box bg-white rounded p-6 w-full max-w-md relative z-50">
        <h3 class="text-xl font-semibold mb-4">{{ form.id ? 'Edit User' : 'Add User' }}</h3>
        <input v-model="form.username" placeholder="Username" class="w-full border px-3 py-2 rounded mb-3" />
        <input v-model="form.password" placeholder="Password" type="password" class="w-full border px-3 py-2 rounded mb-3" />
        <select v-model="form.role" class="w-full border px-3 py-2 rounded mb-4">
          <option value="admin">Admin</option>
          <option value="developer">Developer</option>
          <option value="qa">QA</option>          
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
<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* grey transparent */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  width: 100%;
  max-width: 500px;
}
</style>