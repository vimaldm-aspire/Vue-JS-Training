import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { createPinia } from 'pinia';

import EventHandling from '../components/practice/EventHandling.vue';
import TwoWayBinding from '../components/practice/TwoWayBinding.vue';
import ListUsers from '../components/practice/ListRendering.vue';
import LoggedInDisplay from '../components/practice/LoggedInDisplay.vue';
import SearchWatcher from '../components/practice/SearchWatcher.vue';
import ComputedVsMethod from '../components/practice/ComputedVsMethod.vue';
import ClassActive from '../components/practice/ClassActive.vue';
import ParentChildMessage from '../components/practice/ParentComponent.vue';
import ParentSlot from '../components/practice/ParentSlotFile.vue';
import ApiIntegration from '../components/practice/ApiIntegration.vue';
import RegistrationForm from '../components/practice/RegistrationForm.vue';
import ParentComponentt from '../components/practice/ParentComponentt.vue';

import ParentComp from '../components/NextPractice/ParentComponent.vue';
import IntegrateAPI from '../components/NextPractice/IntegrateAPI.vue';
import VueDirective from '../components/NextPractice/VueDirectives.vue';

const routes = [
  { path: '/', name: 'Login', component: () => import('../views/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('../views/Register.vue') },
  { path: '/dashboard', name: 'Dashboard', component: () => import('../views/Dashboard.vue'), meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/tasks', name: 'Tasks', component: () => import('../components/TasksGrid.vue'), meta: { requiresAuth: true, roles: ['admin', 'user'] } },
  { path: '/tasks/add', name: 'AddTask', component: () => import('../components/AddTask.vue'), meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/tasks/edit/:id', name: 'EditTask', component: () => import('../components/EditTask.vue'), props: true, meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/users', name: 'Users', component: () => import('../components/UserList.vue'), meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/forbidden', name: 'Forbidden', component: () => import('../views/Forbidden.vue') },
  { path: '/eventhandling', name:'EventHandling', component:EventHandling},
  { path: '/twowaybinding', name:'TwoWayBinding', component:TwoWayBinding},
  { path: '/listusers', name:"ListUsers", component:ListUsers},
  { path: '/loggedindisplay', name:"LoggedInDisplay", component:LoggedInDisplay},
  { path: '/searchwatcher', name:"SearchWatcher", component:SearchWatcher},
  { path: '/computedvsmethod', name:'ComputedVsMethod', component:ComputedVsMethod},
  { path: '/classactive', name:'ClassActive', component:ClassActive},
  { path: '/parentchildmessage', name:'ParentChildMessage', component:ParentChildMessage},
  { path: '/parentslotfile', name:"ParentSlot", component:ParentSlot},
  { path: '/apiintegration', name:"ApiIntegration", component:ApiIntegration},
  { path: '/registrationform', name:"RegistrationForm", component:RegistrationForm},
  { path: '/parentcomponentt', name:"ParentComponentt", component:ParentComponentt},
  { path: '/parentcomp', name:"ParentComp", component:ParentComp},
  { path: '/integrateapi', name:"IntegrateAPI", component:IntegrateAPI},
  { path: '/vuedirective', name:"VueDirective", component:VueDirective},
  { path: '/forbidden', name: 'Forbidden', component: () => import('../views/Forbidden.vue') }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


// Route Guard
/*router.beforeEach((to, from, next) => {
  const auth = useAuthStore(pinia); // <-- Use Pinia store instance
  console.log('befoeeach called...1')
  // Load from localStorage on first navigation
  if (!auth.token) {
    auth.loadFromStorage();
    console.log('befoeeach called...2')
  }

  if (to.meta.requiresAuth) {
    console.log('befoeeach called...3')
    if (!auth.isAuthenticated) {
      return next({ name: 'Login' });
    }

    if (to.meta.roles && !to.meta.roles.includes(auth.userRole)) {
      return next({ name: 'Forbidden' }); // Or redirect elsewhere
    }
  }

  // Prevent logged-in user from accessing Login/Register
  if ((to.name === 'Login' || to.name === 'Register') && auth.isAuthenticated) {
    return next({ name: 'Dashboard' });
  }

  next();
});*/

export default router;
