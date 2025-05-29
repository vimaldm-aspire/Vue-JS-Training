import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import TaskGrid from '../components/TasksGrid.vue';
import TaskAdd from '../components/AddTask.vue';
import TaskEdit from '../components/EditTask.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/tasks', component: TaskGrid },
  { path: '/tasks/add', component: TaskAdd },
  { path: '/tasks/edit/:id', component: TaskEdit, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
