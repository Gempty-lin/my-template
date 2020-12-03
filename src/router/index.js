/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-11-30 16:24:14
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-02 10:02:38
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/practice.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
