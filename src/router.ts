import { createWebHistory, createRouter } from 'vue-router';
import { Page } from '@/utils/types';
import AllPosts from './components/AllPosts/AllPosts.vue';

const routes = [{ path: '', name: Page.Home, component: AllPosts }];

export default createRouter({
  history: createWebHistory(),
  routes,
});
