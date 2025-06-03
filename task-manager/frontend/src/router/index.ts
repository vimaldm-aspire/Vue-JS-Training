import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import TaskGrid from '../components/TasksGrid.vue';
import TaskAdd from '../components/AddTask.vue';
import TaskEdit from '../components/EditTask.vue';
import UserList from '../components/UserList.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/tasks', name: 'Tasks', component: TaskGrid },
  { path: '/tasks/add', name: 'AddTask', component: TaskAdd },
  { path: '/tasks/edit/:id', name: 'EditTask', component: TaskEdit, props: true },
  { path: '/users', name: 'Users', component: UserList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
