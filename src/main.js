/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-11-30 16:24:14
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-01 16:53:17
 */
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

let appVue = createApp(App);
// 路由守卫
import "@/permission";
// 图片懒加载
// vue3.0 图片懒加载需要将Vue.prototype.$Lazyload = lazy 修改成 Vue.config.globalProperties.$Lazyload = lazy
// 貌似3.0已经不适用了
import VueLazyload from 'vue-lazyload';
appVue.use(VueLazyload, {
    loading: require('@/assets/images/def_img.gif'), //加载中图片，一定要有，不然会一直重复加载占位图
    error: require('@/assets/images/def_bili.gif') //加载失败图片
});

// 是否移动端
appVue.config.globalProperties.$is_mobile = function () {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    return flag;
};

createApp(App).use(store).use(router).mount('#app');