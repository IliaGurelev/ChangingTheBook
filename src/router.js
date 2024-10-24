import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import SignIn from '@/views/SignIn.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/login',
    name: 'login',
    component: SignIn
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;