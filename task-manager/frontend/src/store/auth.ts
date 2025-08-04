import { defineStore } from 'pinia';
import { API_URL } from '../config';

interface User {
  id: number;
  username: string;
  role: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    currentUser: null as User | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.currentUser?.role || '',
    isAdmin: (state) => state.currentUser?.role === 'admin',
    userId: (state) => state.currentUser?.id
  },

  actions: {
    async login(username: string, password: string): Promise<boolean> {
      try {
        console.log('login actions called...!');
        const res = await fetch(`${API_URL}/users`);
        const users: User[] = await res.json();

        const user = users.find(
          (u: User) => u.username === username && u.password === password
        );

        if (user) {
          this.token = btoa(`${user.username}:${Date.now()}`);

          // Only store essential user info to avoid cyclic issues
          const safeUser: User = {
            id: user.id,
            username: user.username,
            role: user.role
          };

          this.currentUser = safeUser;

          localStorage.setItem(
            'auth',
            JSON.stringify({ token: this.token, currentUser: safeUser })
          );

          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      }
    },

    logout() {
      this.token = '';
      this.currentUser = null;
      localStorage.removeItem('auth');
    },

    loadFromStorage() {
      const stored = localStorage.getItem('auth');
      if (stored) {
        const data = JSON.parse(stored);
        this.token = data.token;
        this.currentUser = data.currentUser;
      }
    }
  }
});
