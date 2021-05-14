import Vue from 'vue';
import VueRouter from 'vue-router';
const originalPush = VueRouter.prototype.push;

// 重复路由报错问题
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () =>import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/',
        redirect: 'dashboard'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: '/*',
        name: 'error404',
        component: () => import('@/views/errorPage/notFound.vue')
      }
    ]
  },
  {
    path: '/*',
    name: 'error404',
    component: () => import('@/views/errorPage/notFound.vue')
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
