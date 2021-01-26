/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-11-30 16:24:14
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-24 16:52:16
 */
import { createRouter, createWebHistory } from 'vue-router'


const route_base = [
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: () => import('../views/Login.vue'),
    //     meta: {
    //         title: "登陆",
    //         icon: 'el-icon-s-home'
    //     }
    // },
]
const routes = [
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true,
        meta: {
            title: "找不到页面",
            icon: 'el-icon-s-home'
        },
    },
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: "首页",
            icon: 'el-icon-s-home'
        },
        children: [
            { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/404.vue'), },
        ]
    },
    ...route_base,

    // { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/404.vue'), },
]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export function resetRouter() {
    const newRouter = createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes
    })
    router.matcher = newRouter.matcher // reset router
}


export default router