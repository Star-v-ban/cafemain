import { createRouter, createWebHistory } from 'vue-router';
import Main from '/src/pages/Main.vue';
import AddingPeoples from '/src/pages/AddingPeoples.vue';
import AddingChecks from '/src/pages/AddingChecks.vue';
import Result from '/src/pages/Result.vue';

export const router = createRouter({
  history: createWebHistory(),
    routes: [
    {path: '/', name:'Home', component: Main},
    {path: '/addpeople', name: 'addpeople', component: AddingPeoples},
    {path: '/checks', name: 'addchecks', component: AddingChecks},
    {path: '/result', name: 'result', component: Result},
  ],
    
  });
