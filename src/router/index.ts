import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/dashboard/index.vue";
import History from "@/pages/history/index.vue";


const routes = [
  { path: "/", component: Home },
  { path: "/history", component: History },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;