import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import UserDashboard from '../components/UserDashboard.vue';
import CallbackUrl from '../components/CallbackUrl.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/dashboard', // dashboard 경로 추가
    name: 'UserDashboard',
    component: UserDashboard // Dashboard 컴포넌트 연결
  },
  {
    path: '/callback', // callback 경로 추가
    name: 'CallbackUrl',
    component: CallbackUrl // Callback 컴포넌트 연결
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
