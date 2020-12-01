/*
 * @Descripttion: 
 * @version: 
 * @Author: Empty
 * @Date: 2020-11-30 16:24:14
 * @LastEditors: Empty
 * @LastEditTime: 2020-12-01 15:21:32
 */
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
// 路由守卫
import "@/permission";
// 图片懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
    loading: require('@/assets/images/def_img.gif'),//加载中图片，一定要有，不然会一直重复加载占位图
    error: require('@/assets/images/def_bili.gif') //加载失败图片
});
// 过滤器
import * as filters from './filters';
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]); //插入过滤器名和对应方法
});

// 是否移动端
Vue.prototype.$is_mobile = function() {
    let flag =  navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    return flag;
};

createApp(App).use(store).use(router).mount('#app');
