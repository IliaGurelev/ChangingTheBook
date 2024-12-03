import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import SignIn from '@/views/SignIn.vue';
import MessageView from '@/views/MessageView.vue';
import UserView from '@/views/UserView.vue';
import SignUp from '@/views/SignUp.vue';

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
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;