
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../views/TaskList.vue';
import TaskForm from '../views/TaskForm.vue';

const routes = [
  { path: '/', component: TaskList },
  { path: '/add', component: TaskForm },
  { path: '/edit/:id', component: TaskForm },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
