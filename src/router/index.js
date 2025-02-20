import { createRouter, createWebHistory } from 'vue-router';
import Login from '../view/login.vue';
import Index from '../view/index.vue';
import Shop from '../view/shop.vue';
import Category from '../view/category.vue';
import Spec from '../view/spec.vue';
import Slider from '../view/slider.vue';
import Order from '../view/order.vue';
import User from '../view/user.vue';
import Layout from '../view/layout.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index
      },
      {
        path: '/shop',
        name: 'shop',
        component: Shop
      },
      {
        path: '/category',
        name: 'category',
        component: Category
      },
      {
        path: '/spec',
        name: 'spec',
        component: Spec
      },
      {
        path: '/slider',
        name: 'slider',
        component: Slider
      },
      {
        path: '/order',
        name: 'order',
        component: Order
      },
      {
        path: '/user',
        name: 'user',
        component: User
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;