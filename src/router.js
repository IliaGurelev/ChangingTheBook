import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import SignIn from '@/views/SignIn.vue';
import MessageView from './views/MessageView.vue';

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
  },
  {
    path: '/messages',
    name: 'messages',
    component: MessageView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;