/*
 * @Descripttion:路由守卫；监听是否有登陆，权限同时可做在这个地方
 * @version:1.0
 * @Author: Empty
 * @Date: 2020-11-09 14:14:38
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-01 16:49:45
 */
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from './store'

import {getToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
    showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // 如果本地存在token
    const hasToken = getToken() || true;
    // 如果有token则跳过登陆界面，没有则进入登陆界面
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({
                path: '/'
            })
            NProgress.done()
        } else {
            const hasGetUserInfo = store.getters.name
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    // get user info
                    //   await store.dispatch('user/getInfo')
                    next()
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})