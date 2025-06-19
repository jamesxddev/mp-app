import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/dashboard/index.vue";
import Login from "@/pages/auth/login.vue";
import Payroll from "@/pages/admin/payroll/index.vue";

import AuthLayout from "@/layouts/AuthLayout.vue";
import AppLayout from "@/layouts/AppLayout.vue";

import { useAuthStore } from '@/store/auth';

const routes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [{ path: '', component: Login }],
  },
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: Home },
      { path: '/payroll', name: 'Payroll', component: Payroll },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global route guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else {
    next()
  }
})

export default router;