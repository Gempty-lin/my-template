/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-11-30 16:24:14
 * @LastEditors: Empty
 * @LastEditTime: 2021-01-08 10:12:25
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
// {
//     path: '/',
//     name: 'Home',
//     component: () => import('../views/practice.vue')
// },
{
    path: '/',
    name: 'Home',
    component: () => import('../views/testLive.vue')
}, ]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router