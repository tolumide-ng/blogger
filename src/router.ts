import { createWebHistory, createRouter } from 'vue-router';
import AllPosts from './components/AllPosts/AllPosts.vue';
import EditBlog from './components/EditBlog/EditBlog.vue';
import { Page } from './utils/types';
import CreateBlog from './components/CreateBlog/CreateBlog.vue';

const routes = [
  { path: '', name: Page.Home, component: AllPosts },
  { path: '/create', name: Page.CreateBlogPost, component: CreateBlog },
  { path: '/edit/:id', name: Page.EditBlogPost, component: EditBlog },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
