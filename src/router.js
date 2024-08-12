// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import About from './views/About.vue';
import Home from './views/Home.vue'; // Assume you have a Home.vue component

import ListTodos from './views/todos/ListTodos.vue'
import CreateTodo from './views/todos/CreateTodo.vue'
import EditTodo from './views/todos/EditTodo.vue'
import ViewTodo from './views/todos/ViewTodo.vue'
import Category from './views/todos/Category.vue'
import SystemPage from './views/System.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },

  { path: '/todos', name: 'ListTodos', component: ListTodos },
  { path: '/todos/create', name: 'CreateTodo', component: CreateTodo },
  { path: '/todos/categories', name: 'ManageCategories', component: Category },
  { path: '/todos/edit/:id', name: 'EditTodo', component: EditTodo, props: true },
  { path: '/todos/view/:id', name: 'ViewTodo', component: ViewTodo, props: true },
  { path: '/system', name: 'TodoSystem', component: SystemPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;